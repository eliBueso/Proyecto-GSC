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
    public class CitaRepositorio:InterfazCitaRepositorio
    {
        
        private readonly AplicationDbContext _db;
        private IMapper _mapper;

        public CitaRepositorio(AplicationDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        public async Task<CitaDto> CreateUpdate(CitaDto citaDto)
        {
            Cita cita = _mapper.Map<CitaDto, Cita>(citaDto);
            if (cita.Id > 0)
            {
                _db.Citas.Update(cita);
            }
            else
            {
                await _db.Citas.AddAsync(cita);
            }
            await _db.SaveChangesAsync();
            return _mapper.Map<Cita, CitaDto>(cita);
        }

        public async Task<bool> DeleteCita(int id)
        {
            try
            {

                Cita cita = await _db.Citas.FindAsync(id);

                if (cita == null)
                {
                    return false;
                }
                _db.Citas.Remove(cita);
                await _db.SaveChangesAsync();

                return true;
            }
            catch (Exception)
            {

                return false;
            }
        }

        public async Task<CitaDto> GetCitaById(int id)
        {
            Cita cita = await _db.Citas.FindAsync(id);

            return _mapper.Map<CitaDto>(cita);

        }

        public async Task<List<CitaDto>> GetCitas()
        {
            List<Cita> lista = await _db.Citas.ToListAsync();

            return _mapper.Map<List<CitaDto>>(lista);
        }

       
    }
}
