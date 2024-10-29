using Microsoft.EntityFrameworkCore;
using WoodMagic.Model;

namespace WoodMagic.Services;

internal sealed class ProductService : IProductService
{
    private readonly IApplicationDbContext _dbContext;

    public ProductService(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public Task<List<Product>> LoadAsync(int page, int count)
    {
        return _dbContext.Products
            .AsNoTracking()
            .Skip(page * count)
            .Take(count)
            .ToListAsync();
    }

    public Task<int> GetProductCountAsync()
    {
        return _dbContext.Products.CountAsync();
    }

    public Task<Product?> GetProductByIdAsync(Guid id)
    {
        return _dbContext.Products.FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task CreateAsync(Product product)
    {
        await _dbContext.Products.AddAsync(product);
        await _dbContext.SaveChangesAsync();
    }

    public Task<int> UpdateAsync(Product product)
    {
        return _dbContext.Products
            .Where(x => x.Id == product.Id)
            .ExecuteUpdateAsync(p => p
                .SetProperty(x => x.Name, product.Name)
                .SetProperty(x => x.Price, product.Price));
    }
}
