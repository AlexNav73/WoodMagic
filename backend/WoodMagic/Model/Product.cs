namespace WoodMagic.Model;

public sealed class Product
{
    public string? Id { get; set; }

    public required string Name { get; set; }

    public required string ImageUrl { get; set; }

    public double Price { get; set; }

    public int Rate { get; set; }

    public State State { get; set; }
}
