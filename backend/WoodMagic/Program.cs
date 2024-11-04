using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using WoodMagic;
using WoodMagic.Endpoints;
using WoodMagic.Persistence;
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
                                      .AllowAnyMethod()
                                      .AllowCredentials());
});

builder.Services.AddApplicationDbContext(
    options => options.UseSqlite(builder.Configuration.GetConnectionString("Default"),
    x => x.MigrationsAssembly("WoodMagic.Persistence")));
builder.Services.AddDbContext<IIdentityDbContext, IdentityDbContext>(
    options => options.UseSqlite(builder.Configuration.GetConnectionString("Default"),
    x => x.MigrationsAssembly("WoodMagic.Persistence")));
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy(Constants.AdminAccessPolicy, policy => policy.RequireRole(Constants.Roles.Admin));
});
builder.Services.AddIdentityApiEndpoints<IdentityUser>()
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<IdentityDbContext>();

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
