using WoodMagic.Core.Inputs;
using WoodMagic.Core.Model;

namespace WoodMagic.Core.Services;

public interface IProductService
{
    Task<Guid> CreateAsync(CreateProductInput product);

    Task<int> UpdateAsync(UpdateProductInput product);

    Task<int> DeleteAsync(Guid id);

    Task<Product?> GetProductByIdAsync(Guid id);

    Task<int> GetProductCountAsync();

    Task<List<Product>> LoadAsync(int page, int count);
}
