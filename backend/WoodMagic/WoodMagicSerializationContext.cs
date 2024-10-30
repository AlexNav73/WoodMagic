using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Serialization;
using WoodMagic.Core.Model;
using WoodMagic.Endpoints;

[JsonSourceGenerationOptions(
    PreferredObjectCreationHandling = JsonObjectCreationHandling.Populate,
    WriteIndented = true)]
[JsonSerializable(typeof(ProductList))]
[JsonSerializable(typeof(Product))]
[JsonSerializable(typeof(HttpValidationProblemDetails))]
[JsonSerializable(typeof(ProblemDetails))]
public partial class WoodMagicSerializationContext : JsonSerializerContext
{
}
