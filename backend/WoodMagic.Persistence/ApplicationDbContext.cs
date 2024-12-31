using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using WoodMagic.Persistence.Entities;

namespace WoodMagic.Persistence;

public sealed class ApplicationDbContext : IdentityDbContext<User, Role, Guid>, IApplicationDbContext
{
    public required DbSet<Product> Products { get; set; }

    public required DbSet<Basket> Baskets { get; set; }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) :
        base(options)
    { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>().ToTable("Users").Property(p => p.Id);
        modelBuilder.Entity<Role>().ToTable("Roles").Property(p => p.Id);
        modelBuilder.Entity<IdentityUserClaim<Guid>>().ToTable("UserClaims");
        modelBuilder.Entity<IdentityRoleClaim<Guid>>().ToTable("RoleClaims");
        modelBuilder.Entity<IdentityUserLogin<Guid>>().ToTable("UserLogins");
        modelBuilder.Entity<IdentityUserRole<Guid>>().ToTable("UserRoles");
        modelBuilder.Entity<IdentityUserToken<Guid>>().ToTable("UserTokens");

        modelBuilder.Entity<Product>().HasKey(p => p.Id);

        modelBuilder.Entity<Basket>().HasKey(p => p.Id);
        modelBuilder.Entity<Basket>().Property(p => p.Id);
        modelBuilder.Entity<User>()
            .HasOne(p => p.Basket)
            .WithOne(p => p.User)
            .HasForeignKey<Basket>(p => p.UserId)
            .IsRequired();
        modelBuilder.Entity<Product>()
            .HasMany(p => p.Baskets)
            .WithMany(p => p.Products)
            .UsingEntity(
                "Baskets2Products",
                l => l.HasOne(typeof(Basket)).WithMany().HasForeignKey("BasketId").HasPrincipalKey(nameof(Basket.Id)),
                r => r.HasOne(typeof(Product)).WithMany().HasForeignKey("ProductId").HasPrincipalKey(nameof(Product.Id)),
                j => j.HasKey("BasketId", "ProductId"));
    }
}
