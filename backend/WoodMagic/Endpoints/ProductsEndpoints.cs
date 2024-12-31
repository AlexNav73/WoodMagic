using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using WoodMagic.Core.Services;
using WoodMagic.Extensions;
using WoodMagic.Model;

namespace WoodMagic.Endpoints;

public sealed record ProductList(List<Product> Products, int Count);

public static class ProductsEndpoints
{
    public static void MapProductsEndpoints(this IEndpointRouteBuilder endpoints)
    {
        var app = endpoints.MapGroup("products");

        app.MapGet("/load", Load)
           .WithOpenApi();

        app.MapGet("/{id}", GetProductInfo)
           .WithOpenApi();

        app.MapPost("/add", Create)
           .WithOpenApi()
           .RequireAuthorization(Constants.AdminAccessPolicy);

        app.MapPost("/update", Update)
           .WithOpenApi()
           .RequireAuthorization(Constants.AdminAccessPolicy);

        app.MapPost("/delete", Delete)
           .WithOpenApi()
           .RequireAuthorization(Constants.AdminAccessPolicy);
    }

    private static async Task<Results<Ok, NotFound<Guid>>> Delete(
        [FromServices] IProductService productService,
        [FromQuery] Guid id)
    {
        var linesChanged = await productService.DeleteAsync(id);
        if (linesChanged == 0)
        {
            return TypedResults.NotFound(id);
        }

        return TypedResults.Ok();
    }

    [ProducesResponseType<ProblemDetails>(StatusCodes.Status400BadRequest, "application/problem+json")]
    private static async Task<Results<Ok, NotFound<Guid>, ProblemHttpResult, BadRequest<ProblemDetails>>> Update(
        [FromServices] IProductService productService,
        [FromBody] Product product)
    {
        if (product.Id is null || !Guid.TryParse(product.Id, out var id))
        {
            return TypedResults.Problem("Invalid product Id");
        }

        var linesCount = await productService.UpdateAsync(product.MapWith(id));
        if (linesCount == 0)
        {
            return TypedResults.NotFound(id);
        }

        return TypedResults.Ok();
    }

    [ProducesResponseType<ProblemDetails>(StatusCodes.Status400BadRequest, "application/problem+json")]
    private static async Task<Results<Ok, BadRequest<ProblemDetails>>> Create(
        [FromServices] IProductService productService,
        [FromBody] Product product)
    {
        await productService.CreateAsync(product.MapWith(Guid.NewGuid()));

        return TypedResults.Ok();
    }

    private static async Task<Results<Ok<Product>, NotFound<Guid>>> GetProductInfo(
        [FromServices] IProductService productService,
        [FromRoute] Guid id)
    {
        var product = await productService.GetProductByIdAsync(id);
        if (product is null)
        {
            return TypedResults.NotFound(id);
        }

        return TypedResults.Ok(product.Map());
    }

    private static async Task<Ok<ProductList>> Load(
        [FromServices] IProductService productService,
        [FromQuery(Name = "page")] int page = 0,
        [FromQuery(Name = "count")] int count = 10)
    {
        var entities = await productService.LoadAsync(page, count);

        var products = new ProductList(
            entities.Select(x => x.Map()).ToList(),
            await productService.GetProductCountAsync());

        return TypedResults.Ok(products);
    }
}
