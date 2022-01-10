using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using serverDH.Dtos;
using serverDH.Entities;
using serverDH.Interfaces;
using serverDH.Services;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace serverDH.Controllers
{
    [ApiController]
    [Route("api/account")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly ISecretKey _secretKey;
        public List<UserLoginDto> kk = new List<UserLoginDto>();

        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager, ISecretKey secretKey)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _secretKey = secretKey;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDto userLoginDto)
        {
            var findUser = await _userManager.FindByNameAsync(userLoginDto.UserName);
            if (findUser == null) { return NotFound("User doesn't exist"); }
            findUser.PublicKey = userLoginDto.PublicKey;
            if (userLoginDto.PublicKey == null) { userLoginDto.PublicKey = "lihjaldwihashdalsd"; await _userManager.UpdateAsync(findUser); }
            else { await _userManager.UpdateAsync(findUser); }
            var result = await _signInManager.PasswordSignInAsync(findUser, userLoginDto.Password, false, true);
            if (result.Succeeded) {
                kk.Add(new UserLoginDto() { UserName = userLoginDto.UserName, PublicKey = userLoginDto.PublicKey });
                foreach (UserLoginDto a in kk)
                {
                    Console.WriteLine(a.UserName);
                }
               // _secretKey.AddUserList(userLoginDto.UserName, userLoginDto.PublicKey);
                //_secretKey.LengthUserList();
                //_secretKey.GetAllList();
                return Ok(findUser);
            }
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
