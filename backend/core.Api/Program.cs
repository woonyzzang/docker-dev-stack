var builder = WebApplication.CreateBuilder(args);
//var appconfig = builder.Configuration.GetSection("AppConfig").Get<AppConfig>(); // appsettings.json

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// App Config
//builder.Services.AddSingleton(appconfig);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// CORS
//builder.Services.AddCors(options =>
//{
////    var corsDomainsList = appconfig.EnableCors?.Replace(" ", "").Split(",");
//    options.AddDefaultPolicy(policy =>
//    {
//        policy
//        .AllowAnyMethod()
//        .AllowAnyHeader()
//        //.AllowCredentials()
//        .SetIsOriginAllowedToAllowWildcardSubdomains()
//        .WithOrigins(
////            corsDomainsList
////            "*"
//            "http://localhost",
//            "http://localhost:3000",
//            "http://*.zempotdocker.com",
//            "http://*.zempotdocker.com:3000"
//        );
//    });
//});

//app.UseCors();
//app.UseAuthorization();
app.MapControllers();
app.Run();

