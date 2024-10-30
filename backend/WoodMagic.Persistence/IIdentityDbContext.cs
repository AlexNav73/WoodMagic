namespace WoodMagic.Persistence;

public interface IIdentityDbContext
{
    Task<int> SaveChangesAsync(CancellationToken token = default);
}
