using Crm.Api.Models;
using Crm.Domain.Entities;
using Crm.Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Crm.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class CustomerController : ControllerBase
    {
        private readonly CrmDbContext _db;
        private readonly ILogger<CustomerController> _logger;

        public CustomerController(CrmDbContext db, ILogger<CustomerController> logger)
        {
            _db = db;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll(
            
            [FromQuery] string? name,
            [FromQuery] string? email,
            [FromQuery] string? region,
            [FromQuery] DateTime? startDate,
            [FromQuery] DateTime? endDate)
        {
            var query = _db.Customers.AsQueryable();

            if (!string.IsNullOrWhiteSpace(name))
            {
                query = query.Where(c =>
                    EF.Functions.ILike(c.FirstName, $"%{name}%") ||
                    EF.Functions.ILike(c.LastName, $"%{name}%"));
            }

            if (!string.IsNullOrWhiteSpace(email))
            {
                query = query.Where(c => EF.Functions.ILike(c.Email, $"%{email}%"));
            }

            if (!string.IsNullOrWhiteSpace(region))
            {
                query = query.Where(c => c.Region.ToLower() == region.ToLower());
            }

            if (startDate.HasValue)
            {
                query = query.Where(c => c.RegistrationDate >= startDate.Value);
            }

            if (endDate.HasValue)
            {
                query = query.Where(c => c.RegistrationDate <= endDate.Value);
            }
            
            var customers = await query.ToListAsync();
            _logger.LogInformation("Customer list requested with filters - Name: {name}, Region: {region}, StartDate: {startDate}, EndDate: {endDate}",
                name, region, startDate, endDate);
            return Ok(customers);
        }


        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CustomerDto dto)
        {
            var customer = new Customer
            {
                Id = Guid.NewGuid(),
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
                Region = dto.Region,
                RegistrationDate = dto.RegistrationDate
            };

            _db.Customers.Add(customer);
            await _db.SaveChangesAsync();
            _logger.LogInformation("New customer created: {Email}", customer.Email);
            return CreatedAtAction(nameof(GetAll), new { id = customer.Id }, customer);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] CustomerDto dto)
        {
            var customer = await _db.Customers.FindAsync(id);
            if (customer is null) return NotFound();

            customer.FirstName = dto.FirstName;
            customer.LastName = dto.LastName;
            customer.Email = dto.Email;
            customer.Region = dto.Region;
            customer.RegistrationDate = dto.RegistrationDate;

            await _db.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var customer = await _db.Customers.FindAsync(id);
            if (customer is null) return NotFound();

            _db.Customers.Remove(customer);
            await _db.SaveChangesAsync();
            _logger.LogWarning("Customer deleted: {Id}", id);
            return NoContent();
        }
    }
}
