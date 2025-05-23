namespace Crm.Api.Models
{
    public class CustomerDto

    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Region { get; set; } = string.Empty;
        public DateTime RegistrationDate { get; set; }
    }
}
