using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using WoodMagic.Core.Services;

namespace WoodMagic.Endpoints;

public static class BasketEndpoints
{
    public static void MapBasketEndpoints(this IEndpointRouteBuilder endpoints)
    {
        var app = endpoints.MapGroup("basket");

        app.MapPost("/add/{productId}", async ([FromServices] IBasketService basketService, [FromRoute] Guid productId, ClaimsPrincipal user) =>
        {
            var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId is null)
            {
                return Results.Unauthorized();
            }

            await basketService.AddToBasket(Guid.Parse(userId), productId);

            return Results.Ok();
        }).WithOpenApi().RequireAuthorization();

        app.MapGet("/get-all", async ([FromServices] IBasketService basketService, ClaimsPrincipal user) =>
        {
            var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId is null)
            {
                return Results.Unauthorized();
            }

            return Results.Ok(await basketService.GetProductsFromBusket(Guid.Parse(userId)));
        }).WithOpenApi().RequireAuthorization();
    }
}
