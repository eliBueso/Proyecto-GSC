namespace Proyecto_GSC.Models.Dto
{
    public class MedicoDto
    {
        public int Id { get; set; }

        public string Nombres { get; set; } = string.Empty;

        public string Apellidos { get; set; } = string.Empty;

        public string Direccion { get; set; } = string.Empty;

        public string Telefono { get; set; } = string.Empty;

        public string Especialidad { get; set; } = string.Empty;
    }
}
