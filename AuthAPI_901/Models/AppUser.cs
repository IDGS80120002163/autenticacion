using Microsoft.AspNetCore.Identity;

namespace AuthAPI_901.Models
{
    public class AppUser: IdentityUser
    {
        public string? FullName { get; set; }
    }
}
