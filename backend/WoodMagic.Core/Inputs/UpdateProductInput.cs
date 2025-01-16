namespace WoodMagic.Core.Inputs;

public sealed class UpdateProductInput
{
    public Guid Id { get; set; }

    public required string Name { get; set; }

    public double Price { get; set; }
}
