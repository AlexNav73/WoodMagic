using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Text.Json.Serialization;
using WoodMagic;

var AllowFrontendOriginPolicy = "_allowFrontendOriginPolicy";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddProblemDetails();

builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.TypeInfoResolver = WoodMagicSerializationContext.Default;
});
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: AllowFrontendOriginPolicy,
                      policy => policy.WithOrigins("http://localhost:4200")
                                      .AllowAnyHeader()
                                      .AllowAnyMethod());
});

builder.Services.AddDbContext<ApplicationDbContext>(
    options => options.UseInMemoryDatabase("AppDb"));
builder.Services.AddAuthorization();
builder.Services.AddIdentityApiEndpoints<IdentityUser>()
    .AddEntityFrameworkStores<ApplicationDbContext>();

builder.Logging.ClearProviders();
builder.Logging.AddConsole();

var app = builder.Build();

app.UseExceptionHandler();
app.UseStatusCodePages();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseDeveloperExceptionPage();
}

//if (app.Environment.IsProduction())
//{
//    app.UseHttpsRedirection();
//    app.UseHsts();
//}

app.UseCors(AllowFrontendOriginPolicy);

app.MapIdentityApi<IdentityUser>();

app.MapGet("/", GenValues).WithName("GetProducts").WithOpenApi();
app.MapPost("/logout", async (SignInManager<IdentityUser> signInManager, ClaimsPrincipal user, [FromBody] object empty) =>
{
    if (empty != null && user.Identity is { IsAuthenticated: true })
    {
        await signInManager.SignOutAsync();
        if (user.Identity.IsAuthenticated)
        {
            return Results.Problem("User is still authenticated");
        }

        return Results.Ok();
    }
    return Results.Unauthorized();
})
.WithOpenApi()
.RequireAuthorization();

app.Run();

static async IAsyncEnumerable<Product> GenValues(ILogger<Product> logger)
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
[JsonSerializable(typeof(HttpValidationProblemDetails))]
[JsonSerializable(typeof(ProblemDetails))]
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
