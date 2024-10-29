using Microsoft.AspNetCore.Mvc;
using WoodMagic.Model;
using WoodMagic.Services;

namespace WoodMagic.Endpoints;

public static partial class Log
{
    [LoggerMessage(
        EventId = 0,
        Level = LogLevel.Information,
        Message = "Starting product generation. {product}")]
    public static partial void ProductInfoSent(this ILogger logger, Product product);
}

public sealed record ProductList(List<Product> Products, int Count)
{
}

public static class ProductsEndpoints
{
    public static void MapProductsEndpoints(this IEndpointRouteBuilder endpoints)
    {
        var app = endpoints.MapGroup("products");
        app.MapGet("/load", async ([FromServices] IProductService productService, [FromQuery] int page = 0, [FromQuery] int count = 10) =>
        {
            return new ProductList(
                await productService.LoadAsync(page, count),
                await productService.GetProductCountAsync());
        }).WithName("GetProducts").WithOpenApi();

        app.MapGet("/{id}", async ([FromServices] IProductService productService, [FromRoute] Guid id) =>
        {
            return await productService.GetProductByIdAsync(id);
        }).WithName("GetProductById").WithOpenApi();

        app.MapPost("/add", async ([FromServices] IProductService productService, [FromBody] Product product) =>
        {
            await productService.CreateAsync(product);
        }).WithName("CreateProduct").WithOpenApi().RequireAuthorization();

        app.MapPost("/update", async ([FromServices] IProductService productService, [FromBody] Product product) =>
        {
            await productService.UpdateAsync(product);
        }).WithName("UpdateProduct").WithOpenApi().RequireAuthorization();
    }
}
