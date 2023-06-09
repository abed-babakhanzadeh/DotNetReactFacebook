using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Persistant.Interface;
using System.Configuration;

namespace Persistant
{
    public class DataContext : DbContext, IDataContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<Activity> Activities { get; set; }

        //public Task<int> SaveChangesAsync()
        //{
        //    throw new NotImplementedException();
        //}

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    IConfigurationRoot configuration = new ConfigurationBuilder()
        //        .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
        //        .AddJsonFile("appsettings.json")
        //        .Build();
        //    // تنظیم اتصال به پایگاه داده با استفاده از اطلاعات اتصال از فایل appsettings.json
        //    optionsBuilder.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
        //}
    }
}
