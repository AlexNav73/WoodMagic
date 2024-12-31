using System.Text.Json.Serialization;

namespace WoodMagic.Model;

[JsonConverter(typeof(JsonStringEnumConverter<State>))]
public enum State { Started, Finished }
