using Microsoft.EntityFrameworkCore;
using WoodMagic.Core.Model;
using WoodMagic.Core.Services;

namespace WoodMagic.Persistence.Services;

internal sealed class BasketService : IBasketService
{
    private readonly IApplicationDbContext _dbContext;

    public BasketService(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public Task<List<ProductInfo>> GetProductsFromBusket(Guid userId)
    {
        return _dbContext.Users
            .Where(x => x.Id == userId && x.Basket != null)
            .SelectMany(x => x.Basket!.Products)
            .Select(x => new ProductInfo()
            {
                Id = x.Id,
                Name = x.Name,
                Price = x.Price,
            })
            .ToListAsync();
    }

    public async Task<bool> AddToBasket(Guid userId, Guid productId)
    {
        var itemWasAdded = false;
        var isAlreadyAdded = await _dbContext.Products
            .Where(x => x.Id == productId && x.Baskets.Any(b => b.UserId == userId))
            .AnyAsync();

        if (isAlreadyAdded)
        {
            return itemWasAdded;
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

            itemWasAdded = true;
        }

        return itemWasAdded;
    }

    public async Task<bool> RemoveFromBasket(Guid userId, Guid productId)
    {
        var itemWasRemoved = false;
        var product = await _dbContext.Products
            .Where(x => x.Id == productId && x.Baskets.Any(b => b.UserId == userId))
            .SingleOrDefaultAsync();

        if (product is null)
        {
            return itemWasRemoved;
        }

        var user = await _dbContext.Users
            .Include(x => x.Basket)
                .ThenInclude(x => x!.Products)
            .Where(x => x.Id == userId)
            .SingleOrDefaultAsync();

        if (user is { Basket: not null })
        {
            user.Basket.Products.Remove(product);

            await _dbContext.SaveChangesAsync();

            itemWasRemoved = true;
        }

        return itemWasRemoved;
    }

    public async Task Clear(Guid userId)
    {
        var basket = await _dbContext.Baskets
            .Where(x => x.UserId == userId)
            .FirstOrDefaultAsync();
        if (basket is not null)
        {
            _dbContext.Baskets.Remove(basket);
            await _dbContext.SaveChangesAsync();
        }
    }
}
