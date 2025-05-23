using Crm.Api.Models;
using Crm.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Crm.Api.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly JwtService _jwtService;
        private readonly UserService _userService;

        public AuthController(JwtService jwtService, UserService userService)
        {
            _jwtService = jwtService;
            _userService = userService;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] UserLoginRequest request)
        {
            var user = _userService.ValidateUser(request.Username, request.Password);
            if (user is null)
                return Unauthorized(new { message = "Invalid username or password" });

            var token = _jwtService.GenerateToken(user);
            return Ok(new { token });
        }
    }
}
