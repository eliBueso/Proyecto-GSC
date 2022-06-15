﻿using System.ComponentModel.DataAnnotations;

namespace Proyecto_GSC.Models
{
    public class Cita
    {
        
        [Key]
        public int Id { get; set; }

        [Required]
        public DateTime FechaDeCita { get; set; } 

        [Required]
        public string Nombres { get; set; } = string.Empty;

        [Required]
        public string Apellidos { get; set; } = string.Empty;

        [Required] 
        public string Direccion { get; set;} = string.Empty;   
        [Required]
        public DateTime FechaDeNacimiento { get; set; }
    }
}