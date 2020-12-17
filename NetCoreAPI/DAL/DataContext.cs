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

            modelBuilder.Entity<Screening>(entity => {

                entity.HasOne(x => x.Film)
                .WithMany(x => x.Screenings)
                .HasForeignKey(x => x.FilmId)
                .OnDelete(DeleteBehavior.NoAction);

                entity.HasOne(x =>x.Hall)
                .WithMany(x => x.Screenings)
                .HasForeignKey(x => x.HallId)
                .OnDelete(DeleteBehavior.NoAction);

                entity.HasMany(x => x.Tickets)
                .WithOne(x => x.Screening)
                .HasForeignKey(x =>x.ScreeningID)
                .OnDelete(DeleteBehavior.Cascade);
                

            });


        }
    }
}