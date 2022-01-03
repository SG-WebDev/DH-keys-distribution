using Microsoft.AspNetCore.Identity;

namespace serverDH.Entities
{
    public class User : IdentityUser
    {
        public string PublicKey { get; set; }
    }
}
