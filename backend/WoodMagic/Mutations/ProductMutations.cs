using WoodMagic.Core.Inputs;
using WoodMagic.Core.Services;

namespace WoodMagic.Mutations;

[MutationType]
public static class ProductMutations
{
    public static Task<Guid> CreateProduct(IProductService productService, CreateProductInput input)
        => productService.CreateAsync(input);

    public static Task<int> DeleteProduct(IProductService productService, Guid id)
        => productService.DeleteAsync(id);

    public static Task<int> UpdateProduct(IProductService productService, UpdateProductInput input)
        => productService.UpdateAsync(input);
}
