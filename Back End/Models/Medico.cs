using System.ComponentModel.DataAnnotations;

namespace Proyecto_GSC.Models
{
    public class Medico
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Nombres { get; set; } = string.Empty;

        [Required]
        public string Apellidos { get; set; } = string.Empty;

        [Required]
        public string Direccion { get; set; } = string.Empty;

        [Required]
        public string Telefono { get; set; } = string.Empty;
        
        [Required]
        public string Especialidad { get; set; } = string.Empty;   


    }
}
