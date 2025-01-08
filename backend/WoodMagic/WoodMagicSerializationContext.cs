using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Serialization;
using WoodMagic.Endpoints;
using WoodMagic.Model;
using WoodMagic.Models;

[JsonSourceGenerationOptions(
    PreferredObjectCreationHandling = JsonObjectCreationHandling.Populate,
    WriteIndented = true)]
[JsonSerializable(typeof(Guid))]
[JsonSerializable(typeof(List<Guid>))]
[JsonSerializable(typeof(User))]
[JsonSerializable(typeof(ProductList))]
[JsonSerializable(typeof(Product))]
[JsonSerializable(typeof(ProductInfo))]
[JsonSerializable(typeof(List<ProductInfo>))]
[JsonSerializable(typeof(UserInfo))]
[JsonSerializable(typeof(HttpValidationProblemDetails))]
[JsonSerializable(typeof(ProblemDetails))]
public partial class WoodMagicSerializationContext : JsonSerializerContext
{
}
