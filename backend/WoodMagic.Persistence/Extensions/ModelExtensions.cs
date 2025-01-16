namespace WoodMagic.Persistence.Extensions;

public static class ModelExtensions
{
    public static Core.Model.Product Map(this Entities.Product product)
    {
        return new Core.Model.Product()
        {
            Id = product.Id,
            Name = product.Name,
            ImageUrl = product.ImageUrl,
            Price = product.Price,
            Rate = product.Rate,
            State = product.State.Map()
        };
    }

    public static Entities.Product Map(this Core.Model.Product product)
    {
        return new Entities.Product()
        {
            Id = product.Id,
            Name = product.Name,
            ImageUrl = product.ImageUrl,
            Price = product.Price,
            Rate = product.Rate,
            State = product.State.Map()
        };
    }

    public static Core.Model.State Map(this Entities.State state)
    {
        return state switch
        {
            Entities.State.Started => Core.Model.State.Started,
            Entities.State.Finished => Core.Model.State.Finished,
            _ => throw new NotSupportedException(),
        };
    }

    public static Entities.State Map(this Core.Model.State state)
    {
        return state switch
        {
            Core.Model.State.Started => Entities.State.Started,
            Core.Model.State.Finished => Entities.State.Finished,
            _ => throw new NotSupportedException(),
        };
    }
}
