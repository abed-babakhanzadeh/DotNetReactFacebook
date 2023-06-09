using Domain;

namespace Application
{
    public interface IActivitiesService
    {
        Task<Activity> GetActivity(Guid id);
        Task<List<Activity>> GetActivities();
        public int AddActivity();

    }
}
