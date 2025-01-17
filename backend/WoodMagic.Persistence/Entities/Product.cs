﻿namespace WoodMagic.Persistence.Entities;

public sealed class Product
{
    public Guid Id { get; set; }

    public required string Name { get; set; }

    public required string ImageUrl { get; set; }

    public double Price { get; set; }

    public int Rate { get; set; }

    public State State { get; set; }

    public List<Basket> Baskets { get; set; } = new();
}
