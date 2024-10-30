using System.Text.Json.Serialization;

namespace WoodMagic.Core.Model
{
    [JsonConverter(typeof(JsonStringEnumConverter<State>))]
    public enum State { Started, Finished }
}
