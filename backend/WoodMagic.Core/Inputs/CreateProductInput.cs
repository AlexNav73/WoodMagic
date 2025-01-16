namespace WoodMagic.Core.Inputs;

public sealed class CreateProductInput
{
    public required string Name { get; set; }

    public string? ImageUrl { get; set; }

    public double Price { get; set; }
}
