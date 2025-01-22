using HotChocolate.Authorization;
using System.Security.Claims;
using WoodMagic.Core.Services;

namespace WoodMagic.Mutations;

[MutationType]
public static class BasketMutations
{
    [Authorize]
    public static Task<bool> AddToBasket(IBasketService basketService, ClaimsPrincipal user, Guid id)
    {
        var userId = Guid.Parse(user.FindFirstValue(ClaimTypes.NameIdentifier)!);

        return basketService.AddToBasket(userId, id);
    }

    [Authorize]
    public static Task<bool> RemoveFromBasket(IBasketService basketService, ClaimsPrincipal user, Guid id)
    {
        var userId = Guid.Parse(user.FindFirstValue(ClaimTypes.NameIdentifier)!);

        return basketService.RemoveFromBasket(userId, id);
    }

    [Authorize]
    public static Task<int> ClearBasket(IBasketService basketService, ClaimsPrincipal user)
    {
        var userId = Guid.Parse(user.FindFirstValue(ClaimTypes.NameIdentifier)!);

        return basketService.Clear(userId);
    }
}
