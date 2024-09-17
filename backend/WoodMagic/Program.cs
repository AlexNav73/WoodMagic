using System.Text.Json;
using System.Text.Json.Serialization;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.TypeInfoResolver = WoodMagicSerializationContext.Default;
});

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy => policy.WithOrigins("http://localhost:4200"));
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();
app.UseCors(MyAllowSpecificOrigins);

app.MapGet("/", GenValues).WithName("GetProducts").WithOpenApi();

app.Run();

async IAsyncEnumerable<Product> GenValues(ILogger<Product> logger)
{
    for (var i = 0; i < 5; i++)
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

[JsonConverter(typeof(JsonStringEnumConverter<State>))]
public enum State { Started, Finished }

public record Product(string Name, string ImageUrl, double Price, int Rate, State State)
{
}

[JsonSourceGenerationOptions(
    PreferredObjectCreationHandling = JsonObjectCreationHandling.Populate,
    WriteIndented = true)]
[JsonSerializable(typeof(IAsyncEnumerable<Product>))]
public partial class WoodMagicSerializationContext : JsonSerializerContext
{
}

public static partial class Log
{
    [LoggerMessage(
        EventId = 0,
        Level = LogLevel.Information,
        Message = "Starting product generation. {product}")]
    public static partial void ProductInfoSent(this ILogger logger, Product product);
}
