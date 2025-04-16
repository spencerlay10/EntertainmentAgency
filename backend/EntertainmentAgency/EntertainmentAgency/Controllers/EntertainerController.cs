using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EntertainmentAgency.Data;
using System.Linq;

namespace EntertainmentAgency.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EntertainerController : ControllerBase
    {
        private readonly EntertainmentDbContext _context;

        public EntertainerController(EntertainmentDbContext context)
        {
            _context = context;
        }

        // GET: Entertainer/AllEntertainers
        [HttpGet("AllEntertainers")]
        public IActionResult GetEntertainers()
        {
            // Fetch all entertainers and include the number of times booked and last booked date
            var entertainers = _context.Entertainers
                .Select(ent => new
                {
                    Entertainer = ent,
                    TimesBooked = _context.Engagements.Count(e => e.EntertainerId == ent.EntertainerId),
                    LastBookedDate = _context.Engagements
                        .Where(e => e.EntertainerId == ent.EntertainerId)
                        .OrderByDescending(e => e.StartDate) // Assuming StartDate is the booking date
                        .Select(e => e.StartDate)
                        .FirstOrDefault()
                })
                .ToList();

            return Ok(new
            {
                Entertainers = entertainers
            });
        }

        // POST: Entertainer/AddEntertainer
        [HttpPost("AddEntertainer")]
        public IActionResult AddEntertainer([FromBody] Entertainer newEntertainer)
        {
            _context.Entertainers.Add(newEntertainer);
            _context.SaveChanges();
            return Ok(newEntertainer);
        }

        // PUT: Entertainer/UpdateEntertainer/{entertainerID}
        [HttpPut("UpdateEntertainer/{entertainerId}")]
        public IActionResult UpdateEntertainer(int entertainerId, [FromBody] Entertainer updatedEntertainer)
        {
            var existingEntertainer = _context.Entertainers.Find(entertainerId);

            if (existingEntertainer == null)
            {
                return NotFound(new { message = "Entertainer not found" });
            }

            existingEntertainer.EntStageName = updatedEntertainer.EntStageName;
            existingEntertainer.EntSsn = updatedEntertainer.EntSsn;
            existingEntertainer.EntStreetAddress = updatedEntertainer.EntStreetAddress;
            existingEntertainer.EntCity = updatedEntertainer.EntCity;
            existingEntertainer.EntState = updatedEntertainer.EntState;
            existingEntertainer.EntZipCode = updatedEntertainer.EntZipCode;
            existingEntertainer.EntPhoneNumber = updatedEntertainer.EntPhoneNumber;
            existingEntertainer.EntWebPage = updatedEntertainer.EntWebPage;
            existingEntertainer.EntEmailAddress = updatedEntertainer.EntEmailAddress;
            existingEntertainer.DateEntered = updatedEntertainer.DateEntered;

            _context.Entertainers.Update(existingEntertainer);
            _context.SaveChanges();

            return Ok(existingEntertainer);
        }

        // DELETE: Entertainer/DeleteEntertainer/{entertainerID}
        [HttpDelete("DeleteEntertainer/{entertainerId}")]
        public IActionResult DeleteEntertainer(int entertainerId)
        {
            var entertainer = _context.Entertainers.Find(entertainerId);

            if (entertainer == null)
            {
                return NotFound(new { message = "Entertainer not found" });
            }

            _context.Entertainers.Remove(entertainer);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
