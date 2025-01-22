using HotChocolate.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using WoodMagic.Persistence;
using WoodMagic.Persistence.Entities;

namespace WoodMagic.Queries;

[QueryType]
public class UserQuery
{
    [Authorize]
    [UseProjection]
    public IQueryable<User> GetUser(IApplicationDbContext context, ClaimsPrincipal user)
    {
        var userId = Guid.Parse(user.FindFirstValue(ClaimTypes.NameIdentifier)!);

        return context.Users.Where(x => x.Id == userId);
    }

    [Authorize]
    public async Task<bool> GetIsAdmin(
        [FromServices] UserManager<User> userManger,
        ClaimsPrincipal userIdentity)
    {
        var userId = userIdentity.FindFirstValue(ClaimTypes.NameIdentifier);
        var user = await userManger.FindByIdAsync(userId!);

        return await userManger.IsInRoleAsync(user!, Constants.Roles.Admin);
    }
}
