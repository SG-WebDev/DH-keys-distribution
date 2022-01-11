using Microsoft.EntityFrameworkCore;

namespace serverDH.Entities
{
    public class AppDbContext : DbContext
    {
        public DbSet<Message> message { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        

    }
}
