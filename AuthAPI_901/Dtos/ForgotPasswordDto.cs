using System.ComponentModel.DataAnnotations;

namespace AuthAPI_901.Dtos
{
    public class ForgotPasswordDto
    {
        [Required]
        [EmailAddress]
        public string Email {  get; set; }

    }
}
