using System.Diagnostics.CodeAnalysis;
using System.IO;
using Microsoft.EntityFrameworkCore;
using NetCoreAPI.Models;

namespace NetCoreAPI.DAL
{
    public class DataContext : DbContext
    {
        public DbSet<Film> Films { get; set; }
        public DbSet<Hall> Halls { get; set; }
        public DbSet<Screening> Screenings { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public  DataContext()
        {
        }

        public DataContext([NotNullAttribute] DbContextOptions options) : base(options)
        {
        }
        

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

           
        }
    }
}