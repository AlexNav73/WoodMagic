namespace WoodMagic.Core.Services;

public interface IBasketService
{
    Task<List<Guid>> GetProductsFromBusket(Guid userId);

    Task<bool> AddToBasket(Guid userId, Guid productId);
    
    Task<bool> RemoveFromBasket(Guid userId, Guid productId);

    Task Clear(Guid userId);
}
