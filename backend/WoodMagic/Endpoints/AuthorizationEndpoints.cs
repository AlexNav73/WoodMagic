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
        var app = endpoints.MapGroup("user");

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

        app.MapGet("/", async (
            [FromServices] RoleManager<IdentityRole> roleManager,
            ClaimsPrincipal user) =>
        {
            var email = user.FindFirstValue(ClaimTypes.Email);
            var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);
            var roleExists = await roleManager.RoleExistsAsync(Constants.Roles.Admin);
            if (userId is not null && email is not null && roleExists)
            {
                var isAdmin = user.IsInRole(Constants.Roles.Admin);

                return Results.Ok(new UserInfo(userId, email, isAdmin));
            }

            return Results.Problem();
        })
        .WithName("GetUser")
        .WithOpenApi()
        .RequireAuthorization();

        app.MapPost("/{email:required}/role/{role:required}", async ([FromServices] IAuthorizationService authorizationService, [FromQuery] string email, [FromQuery] string role) =>
        {
            if (await authorizationService.AssignRoleToUser(email, role))
            {
                return Results.Ok();
            }

            return Results.Unauthorized();
        })
        .WithOpenApi()
        .RequireAuthorization(Constants.AdminAccessPolicy);
    }
}
