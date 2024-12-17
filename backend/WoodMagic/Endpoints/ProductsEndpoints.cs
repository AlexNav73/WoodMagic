using Microsoft.AspNetCore.Mvc;
using WoodMagic.Core.Model;
using WoodMagic.Core.Services;

namespace WoodMagic.Endpoints;

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
        }).WithOpenApi();

        app.MapGet("/{id}", async ([FromServices] IProductService productService, [FromRoute] Guid id) =>
        {
            return await productService.GetProductByIdAsync(id);
        }).WithOpenApi();

        app.MapPost("/add", async ([FromServices] IProductService productService, [FromBody] Product product) =>
        {
            await productService.CreateAsync(product);
        }).WithOpenApi().RequireAuthorization(Constants.AdminAccessPolicy);

        app.MapPost("/update", async ([FromServices] IProductService productService, [FromBody] Product product) =>
        {
            await productService.UpdateAsync(product);
        }).WithOpenApi().RequireAuthorization(Constants.AdminAccessPolicy);

        app.MapPost("/delete", async ([FromServices] IProductService productService, [FromQuery] Guid id) =>
        {
            await productService.DeleteAsync(id);
        }).WithOpenApi().RequireAuthorization(Constants.AdminAccessPolicy);
    }
}
