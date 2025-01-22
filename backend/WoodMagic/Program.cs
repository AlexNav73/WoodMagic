using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;
using WoodMagic;
using WoodMagic.Endpoints;
using WoodMagic.Mutations;
using WoodMagic.Persistence;
using WoodMagic.Persistence.Entities;
using WoodMagic.Queries;
using WoodMagic.Services;

var AllowFrontendOriginPolicy = "_allowFrontendOriginPolicy";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddProblemDetails();
builder.Services.AddGraphQLServer()
    .AddWoodMagicTypes()
    .AddAuthorization()
    .AddFiltering()
    .AddProjections();

builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.TypeInfoResolver = WoodMagicSerializationContext.Default;
});
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: AllowFrontendOriginPolicy,
                      policy => policy.WithOrigins("http://localhost:4200", "https://localhost:44370")
                                      .AllowAnyHeader()
                                      .AllowAnyMethod()
                                      .AllowCredentials());
});

builder.Services.AddApplicationDbContext(
    options => options.UseSqlite(builder.Configuration.GetConnectionString("Default"),
    x => x.MigrationsAssembly("WoodMagic.Persistence")));

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy(Constants.AdminAccessPolicy, policy => policy.RequireRole(Constants.Roles.Admin));
});
builder.Services.AddIdentityApiEndpoints<User>()
    .AddRoles<Role>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders()
    .AddUserManager<UserManager<User>>()
    .AddUserStore<UserStore<User, Role, ApplicationDbContext, Guid>>()
    .AddRoleStore<RoleStore<Role, ApplicationDbContext, Guid>>();

builder.Services.AddPersistenceServices();
builder.Services.AddTransient<IAuthorizationService, AuthorizationService>();

builder.Logging.ClearProviders();
builder.Logging.AddConsole();

var app = builder.Build();

app.UseExceptionHandler();
app.UseStatusCodePages();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
    app.UseDeveloperExceptionPage();
}

//if (app.Environment.IsProduction())
//{
//    app.UseHttpsRedirection();
//    app.UseHsts();
//}

app.UseCors(AllowFrontendOriginPolicy);

app.MapIdentityApi<User>();

app.MapAuthorizationEndpoints();
app.MapProductsEndpoints();
app.MapBasketEndpoints();

app.MapGraphQL();

await app.RunWithGraphQLCommandsAsync(args);
