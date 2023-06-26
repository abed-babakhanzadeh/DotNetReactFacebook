using System.Runtime.InteropServices.JavaScript;
using Domain;
using Microsoft.EntityFrameworkCore;
using Persistant.Common;
using Persistant.Interface;

namespace Application
{
    public class ActivitiesService : IActivitiesService
    {
        private readonly IDataContext _context;

        public ActivitiesService(IDataContext context)
        {
            _context = context;
        }
        public async Task<List<Activity>> GetActivities()
        {
            return await _context.Activities.OrderBy(x=>x.Title).ToListAsync();
        }

        public async Task<Activity> GetActivity(Guid id)
        {
            return await _context.Activities.FindAsync(id);
        }

        public static Guid GetGuid()
        {
            return new Guid();
        }

        public int AddActivity()
        {
            List<Activity> activities = new List<Activity>()
            {
                new Activity()
                {
                    Id = Guid.NewGuid(),
                    Category = "گردشگری",
                    City="اصفهان",
                    Description="این پست برای تست ایجاد شده است",
                    MiladyDate = DateTime.Now,
                    PersianDate= PersianCal.PersianNow(),
                    Title="پست 3",
                    Venue="کوه صحفه"
                },
                new Activity()
                {
                    Id = Guid.NewGuid(),
                    Category = "مذهبی",
                    City="قم",
                    Description="این پست برای تست ایجاد شده است",
                    MiladyDate = DateTime.Now,
                    PersianDate= PersianCal.PersianNow(),
                    Title="پست 4",
                    Venue="حرم حضرت معصومه"
                }
            };

            _context.Activities.AddRange(activities);
            _context.SaveChanges();


            return 1;
        }

    }
}
