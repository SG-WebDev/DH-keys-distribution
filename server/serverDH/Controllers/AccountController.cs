using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SecretChat.Entities;
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
        private readonly AppDbContext _dbContext;
        private readonly IMapper _mapper;


        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _dbContext = dbContext;
            _userManager = userManager;
            _signInManager = signInManager;
            _mapper = mapper;
        }


        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDto userLoginDto)
        {
            var findUser = await _userManager.FindByNameAsync(userLoginDto.UserName);
            if (findUser == null) { return NotFound("User doesn't exist"); }

            var pkey = _mapper.Map<User>(userLoginDto.PublicKey);
            _dbContext.user.Add(pkey);
            _dbContext.SaveChanges();


            var result = await _signInManager.PasswordSignInAsync(findUser, userLoginDto.Password, false, true);

            if (result.Succeeded) {return Ok(findUser);}


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
