namespace WoodMagic.Extensions;

public static class ModelExtensions
{
    public static Core.Model.Product MapWith(this Model.Product product, Guid id)
    {
        return new Core.Model.Product()
        {
            Id = id,
            Name = product.Name,
            ImageUrl = product.ImageUrl,
            Price = product.Price,
            Rate = product.Rate,
            State = product.State.Map()
        };
    }

    public static Model.Product Map(this Core.Model.Product product)
    {
        return new Model.Product()
        {
            Id = product.Id.ToString(),
            Name = product.Name,
            ImageUrl = product.ImageUrl,
            Price = product.Price,
            Rate = product.Rate,
            State = product.State.Map()
        };
    }

    public static Core.Model.State Map(this Model.State state)
    {
        return state switch
        {
            Model.State.Started => Core.Model.State.Started,
            Model.State.Finished => Core.Model.State.Finished,
            _ => throw new NotSupportedException(),
        };
    }

    public static Model.State Map(this Core.Model.State state)
    {
        return state switch
        {
            Core.Model.State.Started => Model.State.Started,
            Core.Model.State.Finished => Model.State.Finished,
            _ => throw new NotSupportedException(),
        };
    }
}
