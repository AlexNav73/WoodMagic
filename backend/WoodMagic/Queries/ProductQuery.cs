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
}
