using Crm.Api.Models;
using FluentValidation;

namespace Crm.Api.Validators
{
    public class CustomerDtoValidator : AbstractValidator<CustomerDto>
    {
        public CustomerDtoValidator()
        {
            RuleFor(x => x.FirstName)
                .NotEmpty().WithMessage("İsim boş olamaz.")
                .Matches("^[a-zA-ZçğıöşüÇĞİÖŞÜ ]+$")
                .MinimumLength(2).WithMessage("İsim en az 2 karakter olmalı.");

            RuleFor(x => x.LastName)
                .NotEmpty().WithMessage("Soyisim boş olamaz.")
                .Matches("^[a-zA-ZçğıöşüÇĞİÖŞÜ ]+$")
                .WithMessage("Soyisim sadece harf içermelidir.");

            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email gerekli.")
                .EmailAddress().WithMessage("Geçerli bir email giriniz.");

            RuleFor(x => x.Region)
                .NotEmpty().WithMessage("Bölge zorunludur.");

            RuleFor(x => x.RegistrationDate)
                .LessThanOrEqualTo(DateTime.Today).WithMessage("Kayıt tarihi bugünden ileri olamaz.");
        }
    }
}
