FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base

LABEL maintainer="woonyzzang <seungwoonjjang@gmail.com>"
LABEL version="1.0.0"
LABEL description="Docker Dev Backend"

WORKDIR /app
#EXPOSE 80
#EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["core.Api/core.Api.csproj", "core.Api/"]
#COPY ["core.Data/core.Data.csproj", "core.Data/"]
#COPY ["core.Domain/core.Domain.csproj", "core.Domain/"]
#COPY ["core.Services/core.Services.csproj", "core.Services/"]
RUN dotnet restore "core.Api/core.Api.csproj"
COPY . .
WORKDIR /src/core.Api
#RUN dotnet build "core.Api.csproj" -c Debug -o /app/build
RUN dotnet build "core.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "core.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "core.Api.dll"]

## TODO: Hot Reload (docker-compose.yml > backend > volumes 주석 해제 사용)
#FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
#WORKDIR /app
#
#COPY . .
#
## Use native linux file polling for better performance
#ENV DOTNET_USE_POLLING_FILE_WATCHER=1
#ENV ASPNETCORE_ENVIRONMENT=Development
#ENV ASPNETCORE_URLS=http://*:8080
#
#WORKDIR /app/core.Api
#
#ENTRYPOINT ["dotnet", "watch", "run", "--urls=https://+:5001 --no-restore"]
