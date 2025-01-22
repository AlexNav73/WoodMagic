namespace WoodMagic.Core.Services;

public interface IBasketService
{
    Task<bool> AddToBasket(Guid userId, Guid productId);
    
    Task<bool> RemoveFromBasket(Guid userId, Guid productId);

    Task<int> Clear(Guid userId);
}
