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
    public class MedicoRepositorio:InterfazMedicoRepositorio
    {
        
        private readonly AplicationDbContext _db;
        private IMapper _mapper;

        public MedicoRepositorio(AplicationDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        public async Task<MedicoDto> CreateUpdate(MedicoDto medicoDto)
        {
            Medico medico = _mapper.Map<MedicoDto, Medico>(medicoDto);
            if (medico.Id > 0)
            {
                _db.Medicos.Update(medico);
            }
            else
            {
                await _db.Medicos.AddAsync(medico);
            }
            await _db.SaveChangesAsync();
            return _mapper.Map<Medico, MedicoDto>(medico);
        }

        public async Task<bool> DeleteMedico(int id)
        {
            try
            {

                Medico medico = await _db.Medicos.FindAsync(id);

                if (medico == null)
                {
                    return false;
                }
                _db.Medicos.Remove(medico);
                await _db.SaveChangesAsync();

                return true;
            }
            catch (Exception)
            {

                return false;
            }
        }

        public async Task<MedicoDto> GetMedicoById(int id)
        {
            Medico medico = await _db.Medicos.FindAsync(id);

            return _mapper.Map<MedicoDto>(medico);

        }

        public async Task<List<MedicoDto>> GetMedicos()
        {
            List<Medico> lista = await _db.Medicos.ToListAsync();

            return _mapper.Map<List<MedicoDto>>(lista);
        }

       
    }
}
