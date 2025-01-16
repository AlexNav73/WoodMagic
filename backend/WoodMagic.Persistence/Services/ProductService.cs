using Microsoft.EntityFrameworkCore;
using WoodMagic.Core.Inputs;
using WoodMagic.Core.Model;
using WoodMagic.Core.Services;
using WoodMagic.Persistence.Extensions;

namespace WoodMagic.Persistence.Services;

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
            .OrderBy(p => p.Name)
            .Skip(page * count)
            .Take(count)
            .Select(p => new Product()
            {
                Id = p.Id,
                Name = p.Name,
                ImageUrl = p.ImageUrl,
                Price = p.Price,
                Rate = p.Rate
            })
            .ToListAsync();
    }

    public Task<int> GetProductCountAsync()
    {
        return _dbContext.Products.CountAsync();
    }

    public Task<Product?> GetProductByIdAsync(Guid id)
    {
        return _dbContext.Products
            .Where(p => p.Id == id)
            .Select(p => new Product()
            {
                Id = p.Id,
                Name = p.Name,
                ImageUrl = p.ImageUrl,
                Price = p.Price,
                Rate = p.Rate
            })
            .FirstOrDefaultAsync();
    }

    public async Task<Guid> CreateAsync(CreateProductInput product)
    {
        var entry = await _dbContext.Products.AddAsync(new Entities.Product()
        {
            Id = Guid.NewGuid(),
            Name = product.Name,
            ImageUrl = product.ImageUrl ?? string.Empty,
            Price = product.Price,
            Rate = 0,
            State = Entities.State.Started
        });

        await _dbContext.SaveChangesAsync();

        return entry.Entity.Id;
    }

    public Task<int> UpdateAsync(UpdateProductInput input)
    {
        return _dbContext.Products
            .Where(x => x.Id == input.Id)
            .ExecuteUpdateAsync(p => p
                .SetProperty(x => x.Name, input.Name)
                .SetProperty(x => x.Price, input.Price));
    }

    public Task<int> DeleteAsync(Guid id)
    {
        return _dbContext.Products
            .Where(x => x.Id == id)
            .ExecuteDeleteAsync();
    }
}
