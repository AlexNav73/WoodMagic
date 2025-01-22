using WoodMagic.Core.Inputs;

namespace WoodMagic.Core.Services;

public interface IProductService
{
    Task<Guid> CreateAsync(CreateProductInput product);

    Task<int> UpdateAsync(UpdateProductInput product);

    Task<int> DeleteAsync(Guid id);
}
