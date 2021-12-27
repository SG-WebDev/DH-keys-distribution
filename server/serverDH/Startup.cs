using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SecretChat.Entities;
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
            services.AddDbContext<AppDbContext>(x =>
                x.UseSqlServer(Configuration.GetConnectionString("Default")));

            services.AddCors(options =>
            {
                options.AddPolicy("FrontendClient", builder =>
                  builder.AllowAnyMethod()
                  .AllowAnyHeader()
                  .AllowCredentials()
               .WithOrigins(Configuration["AllowedOrigins"]));
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
