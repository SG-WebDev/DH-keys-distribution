using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SecretChat.Entities;
using serverDH.Entities;
using System;

namespace serverDH
{
    public class Startup
    {

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSignalR();
            services.AddAutoMapper(this.GetType().Assembly);
            var version = new MySqlServerVersion(new Version(5, 5, 5));
            services.AddDbContext<AppDbContext>(x =>
               x.UseMySql(Configuration.GetConnectionString("Default"), version)
               .EnableSensitiveDataLogging()
               .EnableDetailedErrors());

            services.AddIdentity<User, IdentityRole>(config =>
            {
                config.SignIn.RequireConfirmedEmail = false;
                config.User.RequireUniqueEmail = false;
            }).AddEntityFrameworkStores<AppDbContext>()
               .AddDefaultTokenProviders();


            services.AddCors(options =>
            {
                options.AddPolicy("FrontendClient", builder =>
                  builder.AllowAnyMethod()
                  .AllowAnyHeader()
                  .SetIsOriginAllowed(origin => true)
                  .AllowCredentials());
            });

            
            services.AddControllers();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IServiceProvider serviceProvider)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors("FrontendClient");
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
                endpoints.MapHub<MessageHubClient>("/message");
            });
            serviceProvider.GetRequiredService<AppDbContext>().Database.EnsureCreated();
        }
         
    }
}
