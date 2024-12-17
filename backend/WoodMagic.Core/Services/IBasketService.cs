namespace WoodMagic.Core.Services;

public interface IBasketService
{
    Task<List<Guid>> GetProductsFromBusket(Guid userId);

    Task AddToBasket(Guid userId, Guid productId);
}
