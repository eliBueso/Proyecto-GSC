using Proyecto_GSC.Models.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Proyecto_GSC.Repositorio
{
    public interface InterfazPacienteRepositorio
    {

        Task<List<PacienteDto>> GetPacientes();

        Task<PacienteDto> GetPacienteById(int id);

        Task<PacienteDto> CreateUpdate(PacienteDto clienteDto);

        Task<bool> DeletePaciente(int id);

    }
}
