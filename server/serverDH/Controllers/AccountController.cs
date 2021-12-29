using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using serverDH.Dtos;
using serverDH.Entities;
using System.Threading.Tasks;

namespace serverDH.Controllers
{
    [ApiController]
    [Route("api/account")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;


        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }
      
 
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDto userLoginDto)
        {
            var findUser = await _userManager.FindByNameAsync(userLoginDto.UserName);
            if (findUser == null) { return NotFound("User doesn't exist"); }


            var result = await _signInManager.PasswordSignInAsync(findUser, userLoginDto.Password, false, true);
            if (result.Succeeded) {return Ok("Login");}

            return NotFound("Your password is not correct");

        }

        [HttpGet]
        [Route("logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok("Logout");
        }
    }
}
