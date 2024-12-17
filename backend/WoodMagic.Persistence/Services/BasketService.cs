using Microsoft.EntityFrameworkCore;
using WoodMagic.Core.Services;

namespace WoodMagic.Persistence.Services;

internal sealed class BasketService : IBasketService
{
    private readonly IApplicationDbContext _dbContext;

    public BasketService(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public Task<List<Guid>> GetProductsFromBusket(Guid userId)
    {
        return _dbContext.Users
            .Where(x => x.Id == userId && x.Basket != null)
            .SelectMany(x => x.Basket!.Products.Select(y => y.Id))
            .ToListAsync();
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
}
