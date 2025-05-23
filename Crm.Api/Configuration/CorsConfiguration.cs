namespace Crm.Api.Configurations;

public static class CorsConfiguration
{
    public const string FrontendPolicyName = "AllowFrontend";

    public static void AddCorsPolicy(this IServiceCollection services)
    {
        services.AddCors(options =>
        {
            options.AddPolicy(FrontendPolicyName, policy =>
            {
                policy.WithOrigins("http://localhost:5173")
                      .AllowAnyHeader()
                      .AllowAnyMethod();
            });
        });
    }
}
