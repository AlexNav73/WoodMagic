namespace WoodMagic.Core.Model;

public sealed class ProductInfo
{
    public Guid Id { get; set; }

    public required string Name { get; set; }

    public double Price { get; set; }
}
