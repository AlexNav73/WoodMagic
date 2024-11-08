using Microsoft.EntityFrameworkCore;
using WoodMagic.Core.Model;
using WoodMagic.Core.Services;

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
                Id = p.Id.ToString(),
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
                Id = p.Id.ToString(),
                Name = p.Name,
                ImageUrl = p.ImageUrl,
                Price = p.Price,
                Rate = p.Rate
            })
            .FirstOrDefaultAsync();
    }

    public async Task AddToBasket(Guid userId, Guid productId)
    {
        var isAlreadyAdded = await _dbContext.Products
            .Where(x => x.Id == productId && x.Baskets.Any(b => b.UserId == userId))
            .AnyAsync();

        if (isAlreadyAdded)
        {
            return;
        }

        var user = await _dbContext.Users
            .Include(x => x.Basket)
            .Where(x => x.Id == userId)
            .SingleOrDefaultAsync();
        var product = await _dbContext.Products
            .AsNoTracking()
            .Where(x => x.Id == productId)
            .SingleOrDefaultAsync();

        if (user is not null && product is not null)
        {
            if (user.Basket is null)
            {
                user.Basket = new Entities.Basket() { User = user };
            }

            user.Basket.Products.Add(product);
            
            await _dbContext.SaveChangesAsync();
        }
    }

    public async Task CreateAsync(Product product)
    {
        await _dbContext.Products.AddAsync(new Entities.Product()
        {
            Id = Guid.TryParse(product.Id ?? string.Empty, out var guid) ? guid : Guid.NewGuid(),
            Name = product.Name ?? string.Empty,
            ImageUrl = product.ImageUrl,
            Price = product.Price,
            Rate = product.Rate
        });
        await _dbContext.SaveChangesAsync();
    }

    public Task<int> UpdateAsync(Product product)
    {
        if (!Guid.TryParse(product.Id ?? string.Empty, out var productId))
        {
            return Task.FromResult(0);
        }

        return _dbContext.Products
            .Where(x => x.Id == productId)
            .ExecuteUpdateAsync(p => p
                .SetProperty(x => x.Name, product.Name)
                .SetProperty(x => x.Price, product.Price));
    }

    public Task<int> DeleteAsync(Guid id)
    {
        return _dbContext.Products
            .Where(x => x.Id == id)
            .ExecuteDeleteAsync();
    }
}
