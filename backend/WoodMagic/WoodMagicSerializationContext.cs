using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Serialization;

[JsonSourceGenerationOptions(
    PreferredObjectCreationHandling = JsonObjectCreationHandling.Populate,
    WriteIndented = true)]
[JsonSerializable(typeof(HttpValidationProblemDetails))]
[JsonSerializable(typeof(ProblemDetails))]
public partial class WoodMagicSerializationContext : JsonSerializerContext
{
}
