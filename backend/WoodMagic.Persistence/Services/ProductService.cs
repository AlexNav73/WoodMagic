using Microsoft.EntityFrameworkCore;
using WoodMagic.Core.Inputs;
using WoodMagic.Core.Services;

namespace WoodMagic.Persistence.Services;

internal sealed class ProductService : IProductService
{
    private readonly IApplicationDbContext _dbContext;

    public ProductService(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
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
