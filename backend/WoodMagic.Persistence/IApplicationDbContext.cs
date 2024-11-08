﻿using Microsoft.EntityFrameworkCore;
using WoodMagic.Persistence.Entities;

namespace WoodMagic.Persistence;

public interface IApplicationDbContext
{
    DbSet<Product> Products { get; }

    DbSet<User> Users { get; }

    Task<int> SaveChangesAsync(CancellationToken token = default);
}
