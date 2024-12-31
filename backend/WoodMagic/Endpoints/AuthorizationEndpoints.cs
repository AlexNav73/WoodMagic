using Microsoft.AspNetCore.Http.HttpResults;
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

        app.MapPost("/logout", Logout)
           .WithOpenApi()
           .RequireAuthorization();

        app.MapGet("/", GetUserInfo)
           .WithOpenApi()
           .RequireAuthorization();

        app.MapPost("/{userId:required}/role/{role:required}", AssignRoleToUser)
           .WithOpenApi()
           .RequireAuthorization(Constants.AdminAccessPolicy);
    }

    private static async Task<Results<Ok, UnauthorizedHttpResult>> AssignRoleToUser(
        [FromServices] IAuthorizationService authorizationService,
        Guid userId,
        string role)
    {
        if (await authorizationService.AssignRoleToUser(userId, role))
        {
            return TypedResults.Ok();
        }

        return TypedResults.Unauthorized();
    }

    private static async Task<Results<Ok<UserInfo>, UnauthorizedHttpResult>> GetUserInfo(
        [FromServices] UserManager<Persistence.Entities.User> userManger,
        ClaimsPrincipal identity)
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

        return TypedResults.Ok(new UserInfo(userId, email, isAdmin));
    }

    private static async Task<Results<Ok, ProblemHttpResult>> Logout(
        SignInManager<Persistence.Entities.User> signInManager,
        ClaimsPrincipal user,
        [FromBody] object? empty)
    {
        if (empty != null)
        {
            await signInManager.SignOutAsync();
            if (!signInManager.IsSignedIn(user))
            {
                return TypedResults.Problem("The user is still signed in.");
            }

            return TypedResults.Ok();
        }

        return TypedResults.Problem("The body should be an empty object");
    }
}
