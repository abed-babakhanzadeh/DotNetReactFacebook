using Domain;
using Persistant.Common;

namespace Persistant
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (!context.Activities.Any())
            {

                var activities = new List<Activity>
                {
                    new Activity
                    {
                        Title = "پست 1",
                        //Date = PersianCal.PersianNow(),
                        Description = "این پست برای تست ایجاد شده است",
                        Category = "نوشیدنی",
                        City = "شیراز",
                        Venue = "پل معالی آباد"
                    },
                    new Activity
                    {
                        Title = "پست 2",
                        //Date = PersianCal.AddMonth(-1),
                        Description = "این پست برای تست ایجاد شده است",
                        Category = "فرهنگی",
                        City = "تبریز",
                        Venue = "مسجد کبود"
                    },
                    new Activity
                    {
                        Title = "پست 3",
                        //Date = PersianCal.AddMonth(1),
                       Description = "این پست برای تست ایجاد شده است",
                        Category = "موسیقی",
                        City = "اصفهان",
                        Venue = "پل سی و سه پل"
                    },
                    new Activity
                    {
                        Title = "پست 4",
                        //Date = PersianCal.AddMonth(2),
                        Description = "این پست برای تست ایجاد شده است",
                        Category = "غذا",
                        City = "اصفهان",
                        Venue = "پل خاجو"
                    },
                    new Activity
                    {
                        Title = "پست 5",
                        //Date = PersianCal.AddMonth(3),
                        Description = "این پست برای تست ایجاد شده است",
                        Category = "نوشیدنی",
                        City = "شیراز",
                        Venue = "حافظیه"
                    },
                    new Activity
                    {
                        Title = "پست 6",
                        //Date = PersianCal.AddMonth(4),
                        Description = "این پست برای تست ایجاد شده است",
                        Category = "فرهنگی",
                        City = "شیراز",
                        Venue = "سعدیه"
                    },
                    new Activity
                    {
                       Title = "پست 7",
                        //Date = PersianCal.AddMonth(5),
                        Description = "این پست برای تست ایجاد شده است",
                        Category = "نوشیدنی",
                        City = "شیراز",
                        Venue = "زند"
                    },
                    new Activity
                    {
                       Title = "پست 8",
                        //Date = PersianCal.AddMonth(6),
                        Description = "این پست برای تست ایجاد شده است",
                        Category = "موسیقی",
                        City = "شیراز",
                        Venue = "ملاصدرا"
                    },
                    new Activity
                    {
                       Title = "پست 9",
                        //Date = PersianCal.AddMonth(7),
                        Description = "این پست برای تست ایجاد شده است",
                        Category = "سفر",
                        City = "تهران",
                        Venue = "تجریش"
                    },
                    new Activity
                    {
                        Title = "پست 10",
                        //Date = PersianCal.AddMonth(8),
                       Description = "این پست برای تست ایجاد شده است",
                        Category = "نوشیدنی",
                        City = "شیراز",
                        Venue = "باغ ارم"
                    }
                };

                await context.Activities.AddRangeAsync(activities);
                await context.SaveChangesAsync();
            }
        }

    }
}
