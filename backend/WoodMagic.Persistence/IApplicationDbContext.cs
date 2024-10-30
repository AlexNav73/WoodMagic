using Microsoft.EntityFrameworkCore;
using WoodMagic.Persistence.Entities;

namespace WoodMagic.Persistence;

public interface IApplicationDbContext
{
    public DbSet<Product> Products { get; }

    Task<int> SaveChangesAsync(CancellationToken token = default);
}
