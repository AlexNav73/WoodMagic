using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using WoodMagic.Models;
using WoodMagic.Persistence.Entities;
using WoodMagic.Services;

namespace WoodMagic.Endpoints;

public static class AuthorizationEndpoints
{
    public static void MapAuthorizationEndpoints(this IEndpointRouteBuilder endpoints)
    {
        var app = endpoints.MapGroup("user");

        app.MapPost("/logout", async (SignInManager<Persistence.Entities.User> signInManager, ClaimsPrincipal user, [FromBody] object? empty) =>
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

        app.MapGet("/", async ([FromServices] UserManager<Persistence.Entities.User> userManger, ClaimsPrincipal identity) =>
        {
            var email = identity.FindFirstValue(ClaimTypes.Email);
            var userId = identity.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId is null || email is null)
            {
                return TypedResults.Unauthorized();
            }

            var user = await userManger.FindByIdAsync(userId);
            if (user is null)
            {
                return TypedResults.Unauthorized();
            }

            var isAdmin = await userManger.IsInRoleAsync(user, Constants.Roles.Admin);

            return Results.Ok(new UserInfo(userId, email, isAdmin));
        })
        .WithName("GetUser")
        .WithOpenApi()
        .RequireAuthorization();

        app.MapPost("/{userId:required}/role/{role:required}", async ([FromServices] IAuthorizationService authorizationService, Guid userId, string role) =>
        {
            if (await authorizationService.AssignRoleToUser(userId, role))
            {
                return Results.Ok();
            }

            return Results.Unauthorized();
        })
        .WithOpenApi()
        .RequireAuthorization(Constants.AdminAccessPolicy);
    }
}
