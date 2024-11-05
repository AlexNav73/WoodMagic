
namespace WoodMagic.Services;

public interface IAuthorizationService
{
    Task<bool> AssignRoleToUser(Guid userId, string role);
}
