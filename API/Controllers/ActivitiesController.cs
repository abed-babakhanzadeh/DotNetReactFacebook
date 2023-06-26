using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class ActivitiesController : BaseApiController
    {
        //private readonly IMediator _mediator;

        //public ActivitiesController(IMediator mediator)
        //{
        //    _mediator = mediator;
        //}


        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities(CancellationToken ct)
        {

            return await Mediator.Send(new List.Query(), ct);
        }



        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            return await Mediator.Send(new Details.Query {Id = id });
        }


        [HttpPost]
        public async Task<IActionResult> CreateActivity([FromBody]Activity activity)
        {
            activity.MiladyDate = DateTime.Now;
            return Ok(await Mediator.Send(new Create.Command { Activity = activity }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id;
            return Ok(await Mediator.Send(new Edit.Command { Activity = activity }));
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command { Id = id }));
        }

        //[HttpPost]
        //public ActionResult AddActivity()
        //{
        //     _activiti.AddActivity();
        //    if (result == 1)
        //    {
        //        return Ok("Activity added successfully");
        //    }
        //    else
        //    {
        //        return BadRequest("Something went wrong");

        //    }
        //}
    }
}
