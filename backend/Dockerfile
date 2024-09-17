FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["WoodMagic/WoodMagic.csproj", "WoodMagic/"]
RUN dotnet restore "WoodMagic/WoodMagic.csproj"
COPY . .
WORKDIR "/src/WoodMagic"
RUN dotnet build "WoodMagic.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "WoodMagic.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "WoodMagic.dll"]