
namespace WoodMagic.Services;

public interface IAuthorizationService
{
    Task<bool> AssignRoleToUser(string email, string role);
}
