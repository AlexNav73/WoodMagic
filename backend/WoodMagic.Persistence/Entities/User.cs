using Microsoft.AspNetCore.Identity;

namespace WoodMagic.Persistence.Entities;

public sealed class User : IdentityUser<Guid>
{
    public Basket? Basket { get; set; }
}
