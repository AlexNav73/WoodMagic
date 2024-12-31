using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using WoodMagic.Core.Services;

namespace WoodMagic.Endpoints;

public static class BasketEndpoints
{
    public static void MapBasketEndpoints(this IEndpointRouteBuilder endpoints)
    {
        var app = endpoints.MapGroup("basket");

        app.MapPost("/add/{productId}", AddProduct)
           .WithOpenApi()
           .RequireAuthorization();

        app.MapPost("/remove/{productId}", Remove)
           .WithOpenApi()
           .RequireAuthorization();

        app.MapGet("/get-all", GetProductsFromBasket)
           .WithOpenApi()
           .RequireAuthorization();

        app.MapPost("/clear", Clear)
           .WithOpenApi()
           .RequireAuthorization();
    }

    private static async Task<Results<Ok<bool>, UnauthorizedHttpResult>> Remove(
        [FromServices] IBasketService basketService,
        ClaimsPrincipal user,
        [FromRoute] Guid productId)
    {
        var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId is null)
        {
            return TypedResults.Unauthorized();
        }

        var result = await basketService.RemoveFromBasket(Guid.Parse(userId), productId);

        return TypedResults.Ok(result);
    }

    private static async Task<Results<Ok, UnauthorizedHttpResult>> Clear([FromServices] IBasketService basketService, ClaimsPrincipal user)
    {
        var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId is null)
        {
            return TypedResults.Unauthorized();
        }

        await basketService.Clear(Guid.Parse(userId));

        return TypedResults.Ok();
    }

    private static async Task<Results<Ok<List<Guid>>, UnauthorizedHttpResult>> GetProductsFromBasket(
        [FromServices] IBasketService basketService,
        ClaimsPrincipal user)
    {
        var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId is null)
        {
            return TypedResults.Unauthorized();
        }

        var products = await basketService.GetProductsFromBusket(Guid.Parse(userId));

        return TypedResults.Ok(products);
    }

    private static async Task<Results<Ok<bool>, UnauthorizedHttpResult>> AddProduct(
        [FromServices] IBasketService basketService,
        [FromRoute] Guid productId,
        ClaimsPrincipal user)
    {
        var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId is null)
        {
            return TypedResults.Unauthorized();
        }

        var result = await basketService.AddToBasket(Guid.Parse(userId), productId);

        return TypedResults.Ok(result);
    }
}
