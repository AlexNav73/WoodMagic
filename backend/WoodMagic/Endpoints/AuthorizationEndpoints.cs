using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace WoodMagic.Endpoints;

public static class AuthorizationEndpoints
{
    public static void MapAuthorizationEndpoints(this IEndpointRouteBuilder endpoints)
    {
        var app = endpoints.MapGroup("");

        app.MapPost("/logout", async (SignInManager<IdentityUser> signInManager, ClaimsPrincipal user, [FromBody] object? empty) =>
        {
            if (empty != null && signInManager.IsSignedIn(user))
            {
                await signInManager.SignOutAsync();
                if (!signInManager.IsSignedIn(user))
                {
                    return Results.Problem("The user is still signed in.");
                }

                return Results.Ok();
            }

            return Results.Unauthorized();
        })
        .WithOpenApi()
        .RequireAuthorization();

        app.MapPost("/isInRole", async ([FromServices] RoleManager<IdentityUser> roleManager, ClaimsPrincipal user, [FromBody] string role) =>
        {
            if (role != null && await roleManager.RoleExistsAsync(role))
            {
                return Results.Ok(user.IsInRole(role));
            }

            return Results.Unauthorized();
        })
        .WithOpenApi()
        .RequireAuthorization();
    }
}
