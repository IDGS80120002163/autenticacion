using System.ComponentModel.DataAnnotations;

namespace AuthAPI_901.Dtos
{
    public class CreateRoleDto
    {
        [Required(ErrorMessage = "Role Name is required")]
        public string RoleName { get; set; } = null!;
    }
}
