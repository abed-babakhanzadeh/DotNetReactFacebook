using System.Globalization;

namespace Persistant.Common
{
    public static class PersianCal
    {
        public static string PersianNow()
        {
            PersianCalendar cal = new PersianCalendar();
            return cal.GetYear(DateTime.Now).ToString() + "/" + cal.GetMonth(DateTime.Now).ToString() + "/" + cal.GetDayOfMonth(DateTime.Now).ToString();
        }

        public static string AddMonth(int month)
        {
            PersianCalendar cal = new PersianCalendar();
            return cal.GetYear(DateTime.Now).ToString() + "/" + cal.GetMonth(DateTime.Now.AddMonths(month)).ToString() + "/" + cal.GetDayOfMonth(DateTime.Now).ToString();
        }

        public static string ToPersianCal(DateTime miladiDate)
        {
            PersianCalendar cal = new PersianCalendar();
            return cal.GetYear(miladiDate).ToString() + "/" + cal.GetMonth(miladiDate).ToString() + "/" + cal.GetDayOfMonth(miladiDate).ToString();
        }
    }
}
