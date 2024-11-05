namespace WoodMagic.Persistence.Entities;

public sealed class Basket
{
    public Guid Id { get; set; }

    public Guid UserId { get; set; }

    public required User User { get; set; }

    public List<Product> Products { get; set; } = new();
}
