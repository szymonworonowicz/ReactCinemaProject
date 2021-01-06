using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using NetCoreAPI.DAL;
using NetCoreAPI.Models;

namespace NetCoreAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();

            CreateDb(host);

            host.Run();
        }

        private static async Task CreateDb(IHost host)
        {
            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;

                try
                {
                    var context = services.GetRequiredService<DataContext>();

                    context.Database.EnsureCreated();

                    if (await context.Halls.AnyAsync() == false)
                    {
                        List<Hall> halls = new List<Hall>();
                        Random rand = new Random();
                        for (int i = 0; i < 10; i++)
                        {
                            halls.Add(new Hall { Capacity = rand.Next(50, 90) });
                        }

                        await context.Halls.AddRangeAsync(halls);
                        await context.SaveChangesAsync();

                        List<Film> films = new List<Film>();

                        string json = "";
                        using (StreamReader str = new StreamReader("Films.json"))
                        {
                            json = str.ReadToEnd();
                        }

                        films = JsonSerializer.Deserialize<List<Film>>(json);

                        await context.Films.AddRangeAsync(films);
                        await context.SaveChangesAsync();

                        List<Screening> screenings = new List<Screening>();
                        // generowanie seansow
                        for (int i = 0; i < 10; i++)
                        {
                            var StartTime = new DateTime(2021,rand.Next(1,12),rand.Next(1,28),rand.Next(8,22),rand.Next(1,6)*10,0);
                            screenings.Add( new Screening { FilmId = rand.Next(0, 20), HallId = rand.Next(0, 10), StartTime = StartTime});
                        }

                        await context.Screenings.AddRangeAsync(screenings);
                        await context.SaveChangesAsync();

                    }
                }
                catch (InvalidOperationException e)
                {
                    Console.WriteLine(e.StackTrace);
                }
            }
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
