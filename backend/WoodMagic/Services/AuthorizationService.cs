using Microsoft.AspNetCore.Identity;

namespace WoodMagic.Services;

internal sealed class AuthorizationService : IAuthorizationService
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;

    public AuthorizationService(
        UserManager<IdentityUser> userManager,
        RoleManager<IdentityRole> roleManager)
    {
        _userManager = userManager;
        _roleManager = roleManager;
    }

    public async Task<bool> AssignRoleToUser(string email, string role)
    {
        IdentityResult? identityResult = null;
        var isRoleExists = await _roleManager.RoleExistsAsync(role);
        if (!isRoleExists)
        {
            var identityRole = new IdentityRole
            {
                Name = role
            };
            await _roleManager.CreateAsync(identityRole);
            var user = await _userManager.FindByEmailAsync(email);
            if (user is not null)
            {
                identityResult = await _userManager.AddToRoleAsync(user, role);
            }
        }

        return identityResult?.Succeeded ?? false;
    }
}
