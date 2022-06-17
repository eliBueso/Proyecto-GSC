using Proyecto_GSC.Models.Dto;

namespace Proyecto_GSC.Repositorio
{
    public interface InterfazCitaRepositorio
    {
        Task<List<CitaDto>> GetCitas();

        Task<CitaDto> GetCitaById(int id);

        Task<CitaDto> CreateUpdate(CitaDto citaDto);

        Task<bool> DeleteCita(int id);
    }
}
