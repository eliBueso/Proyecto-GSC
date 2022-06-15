using Proyecto_GSC.Models.Dto;

namespace Proyecto_GSC.Repositorio
{
    public interface InterfazMedicoRepositorio
    {
        Task<List<MedicoDto>> GetMedicos();

        Task<MedicoDto> GetMedicoById(int id);

        Task<MedicoDto> CreateUpdate(MedicoDto medicoDto);

        Task<bool>? DeleteMedico(int id);
    }
}
