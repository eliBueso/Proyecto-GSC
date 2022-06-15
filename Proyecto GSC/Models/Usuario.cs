using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Proyecto_GSC.Models
{
    public class Usuario
    {
        [Key]
        public int Id { get; set; }

        public string NombreDeUsuario { get; set; } = string.Empty;

        public byte[] PasswordHash { get; set; } = {};

        public byte[] PasswordSalt { get; set; } = {};

    }
}
