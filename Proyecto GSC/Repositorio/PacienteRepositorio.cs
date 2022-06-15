using Proyecto_GSC.Data;
using Proyecto_GSC.Models;
using Proyecto_GSC.Models.Dto;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace Proyecto_GSC.Repositorio
{
    public class PacienteRepositorio : InterfazPacienteRepositorio
    {

        private readonly AplicationDbContext _db;
        private IMapper _mapper;

        public PacienteRepositorio(AplicationDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        public async Task<PacienteDto> CreateUpdate(PacienteDto pacienteDto)
        {
            Paciente paciente = _mapper.Map<PacienteDto, Paciente>(pacienteDto);
            if (paciente.Id > 0)
            {
                _db.Pacientes.Update(paciente);
            }
            else
            {
                await _db.Pacientes.AddAsync(paciente);
            }
            await _db.SaveChangesAsync();
            return _mapper.Map<Paciente, PacienteDto>(paciente);
        }

        public async Task<bool> DeletePaciente(int id)
        {
            try
            {

                Paciente paciente = await _db.Pacientes.FindAsync(id);

                if (paciente == null)
                {
                    return false;
                }
                _db.Pacientes.Remove(paciente);
                await _db.SaveChangesAsync();

                return true;
            }
            catch (Exception)
            {

                return false;
            }
        }

        public async Task<PacienteDto> GetPacienteById(int id)
        {
            Paciente paciente = await _db.Pacientes.FindAsync(id);

            return _mapper.Map<PacienteDto>(paciente);

        }

        public async Task<List<PacienteDto>> GetPacientes()
        {
            List<Paciente> lista = await _db.Pacientes.ToListAsync();

            return _mapper.Map<List<PacienteDto>>(lista);
        }
    }
}
