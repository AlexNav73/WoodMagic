using Microsoft.AspNetCore.Mvc;
using WoodMagic.Model;

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
        var app = endpoints.MapGroup("");
        app.MapGet("/", async (ILogger<Product> logger, [FromQuery] int page = 0, [FromQuery] int count = 10) =>
        {
            var products = new List<Product>();

            await foreach (var product in GenValues(logger, page, count))
            {
                products.Add(product);
            }

            return new ProductList(products, 200);
        }).WithName("GetProducts").WithOpenApi();
    }

    private static async IAsyncEnumerable<Product> GenValues(ILogger<Product> logger, [FromQuery] int page = 0, [FromQuery] int count = 10)
    {
        for (var i = page * count; i < (page * count) + count; i++)
        {
            var product = new Product(
                $"Product {i}",
                $"image-url-{i}",
                Random.Shared.Next(5, 55),
                Random.Shared.Next(0, 5),
                State.Started);

            logger.ProductInfoSent(product);

            yield return product;

            await Task.Delay(100);
        }
    }
}
