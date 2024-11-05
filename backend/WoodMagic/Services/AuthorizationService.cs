using Microsoft.AspNetCore.Identity;
using WoodMagic.Persistence.Entities;

namespace WoodMagic.Services;

internal sealed class AuthorizationService : IAuthorizationService
{
    private readonly UserManager<User> _userManager;
    private readonly RoleManager<Role> _roleManager;

    public AuthorizationService(
        UserManager<User> userManager,
        RoleManager<Role> roleManager)
    {
        _userManager = userManager;
        _roleManager = roleManager;
    }

    public async Task<bool> AssignRoleToUser(Guid userId, string role)
    {
        IdentityResult? identityResult = null;
        var isRoleExists = await _roleManager.RoleExistsAsync(role);
        if (!isRoleExists)
        {
            await _roleManager.CreateAsync(new Role { Name = role });
        }

        var user = await _userManager.FindByIdAsync(userId.ToString());
        if (user is not null)
        {
            identityResult = await _userManager.AddToRoleAsync(user, role);
        }

        return identityResult?.Succeeded ?? false;
    }
}
