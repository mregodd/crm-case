using Crm.Domain.Entities;
using Crm.Domain.Enums;

namespace Crm.Api.Services
{
    public class UserService
    {
        // Burada hardcoded bir admin kullanıcı dönüyoruz (şifre hash'leme yok, sadece demo amaçlı)
        public User? ValidateUser(string username, string password)
        {
            if (username == "admin" && password == "123456")
            {
                return new User
                {
                    Id = Guid.NewGuid(),
                    Username = "admin",
                    Role = UserRole.Admin
                };
            }

            return null;
        }
    }
}
