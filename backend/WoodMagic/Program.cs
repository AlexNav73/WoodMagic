using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using WoodMagic;
using WoodMagic.Endpoints;
using WoodMagic.Model;
using WoodMagic.Services;

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

builder.Services.AddDbContext<IApplicationDbContext, ApplicationDbContext>(
    options => options.UseSqlite("Data Source=database.db"));
builder.Services.AddAuthorization();
builder.Services.AddIdentityApiEndpoints<IdentityUser>()
    .AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services.AddTransient<IProductService, ProductService>();

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
app.MapAuthorizationEndpoints();
app.MapProductsEndpoints();

app.Run();

[JsonSourceGenerationOptions(
    PreferredObjectCreationHandling = JsonObjectCreationHandling.Populate,
    WriteIndented = true)]
[JsonSerializable(typeof(ProductList))]
[JsonSerializable(typeof(Product))]
[JsonSerializable(typeof(HttpValidationProblemDetails))]
[JsonSerializable(typeof(ProblemDetails))]
public partial class WoodMagicSerializationContext : JsonSerializerContext
{
}
