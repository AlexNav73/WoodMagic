using Microsoft.EntityFrameworkCore;
using WoodMagic.Persistence;
using WoodMagic.Persistence.Entities;

namespace WoodMagic.Queries;

[QueryType]
public class ProductQuery
{
    [UsePaging]
    [UseProjection]
    [UseFiltering]
    public IQueryable<Product> GetProducts(IApplicationDbContext context)
        => context.Products;

    public Task<Product?> GetProductById(IProductByIdDataLoader dataLoader, Guid id)
        => dataLoader.LoadAsync(id);

    public Task<int> GetProductCount(IApplicationDbContext context)
        => context.Products.CountAsync();

    [DataLoader]
    internal static async Task<IReadOnlyDictionary<Guid, Product>> GetProductByIdAsync(
        IReadOnlyList<Guid> ids,
        IApplicationDbContext dbContext,
        CancellationToken token)
        => await dbContext.Products
            .Where(x => ids.Contains(x.Id))
            .ToDictionaryAsync(k => k.Id, token);
}
