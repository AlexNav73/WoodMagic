using Microsoft.EntityFrameworkCore;
using WoodMagic.Model;

namespace WoodMagic;

public interface IApplicationDbContext
{
    public DbSet<Product> Products { get; }

    Task<int> SaveChangesAsync(CancellationToken token = default);
}
