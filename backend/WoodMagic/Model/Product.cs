﻿namespace WoodMagic.Model;

public sealed class Product
{
    public Guid Id { get; set; }

    public string? Name { get; set; }

    public string? ImageUrl { get; set; }

    public double Price { get; set; }

    public int Rate { get; set; }

    public State State { get; set; }
}
