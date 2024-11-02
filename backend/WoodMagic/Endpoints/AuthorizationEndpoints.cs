using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using WoodMagic.Models;
using WoodMagic.Services;

namespace WoodMagic.Endpoints;

public static class AuthorizationEndpoints
{
    public static void MapAuthorizationEndpoints(this IEndpointRouteBuilder endpoints)
    {
        var app = endpoints.MapGroup("");

        app.MapPost("/logout", async (SignInManager<IdentityUser> signInManager, ClaimsPrincipal user, [FromBody] object? empty) =>
        {
            if (empty != null)
            {
                await signInManager.SignOutAsync();
                if (!signInManager.IsSignedIn(user))
                {
                    return Results.Problem("The user is still signed in.");
                }

                return Results.Ok();
            }

            return Results.Problem("The body should be an empty object");
        })
        .WithName("Logout")
        .WithOpenApi()
        .RequireAuthorization();

        app.MapGet("/user", async (
            [FromServices] RoleManager<IdentityRole> roleManager,
            ClaimsPrincipal user) =>
        {
            var email = user.FindFirstValue(ClaimTypes.Email);
            var roleExists = await roleManager.RoleExistsAsync("admin");
            if (email is not null && roleExists)
            {
                var isAdmin = user.IsInRole("admin");

                return Results.Ok(new UserInfo(email, isAdmin));
            }

            return Results.Problem();
        })
        .WithName("GetUser")
        .WithOpenApi()
        .RequireAuthorization();

        app.MapPost("/addRole", async ([FromServices] IAuthorizationService authorizationService, [FromBody] AssignRoleRequest request) =>
        {
            if (await authorizationService.AssignRoleToUser(request.Email, request.RoleName))
            {
                return Results.Ok();
            }

            return Results.Unauthorized();
        })
        .WithOpenApi()
        .RequireAuthorization(Constants.AdminAccessPolicy);
    }
}
