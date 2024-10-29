using WoodMagic.Model;

namespace WoodMagic.Services;

public interface IProductService
{
    Task CreateAsync(Product product);

    Task<int> UpdateAsync(Product product);

    Task<Product?> GetProductByIdAsync(Guid id);

    Task<int> GetProductCountAsync();

    Task<List<Product>> LoadAsync(int page, int count);
}
