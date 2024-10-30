using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using WoodMagic.Core.Services;
using WoodMagic.Persistence.Services;

namespace WoodMagic.Persistence;

public static class ServiceCollectionExtensions
{
    public static void AddApplicationDbContext(this IServiceCollection serviceCollection, Action<DbContextOptionsBuilder> builder)
    {
        serviceCollection.AddDbContext<IApplicationDbContext, ApplicationDbContext>(builder);
    }

    public static void AddPersistenceServices(this IServiceCollection serviceCollection)
    {
        serviceCollection.AddTransient<IProductService, ProductService>();
    }
}
