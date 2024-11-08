using WoodMagic.Core.Model;

namespace WoodMagic.Core.Services;

public interface IProductService
{
    Task CreateAsync(Product product);

    Task<int> UpdateAsync(Product product);

    Task<Product?> GetProductByIdAsync(Guid id);

    Task<int> GetProductCountAsync();

    Task<List<Product>> LoadAsync(int page, int count);

    Task<int> DeleteAsync(Guid id);

    Task AddToBasket(Guid userId, Guid productId);
}
