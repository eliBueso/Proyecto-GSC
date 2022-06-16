using Proyecto_GSC.Models;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Proyecto_GSC.Models.Dto;

namespace Proyecto_GSC
{
    public class MappingConfig
    {
        public static MapperConfiguration RegisterMaps()
        {
            var mappingConfig = new MapperConfiguration(config =>
            {
                config.CreateMap<PacienteDto, Paciente>();
                config.CreateMap<Paciente, PacienteDto>();
                config.CreateMap<CitaDto, Cita>();
                config.CreateMap<Cita, CitaDto>();
                config.CreateMap<MedicoDto, Medico>();
                config.CreateMap<Medico, MedicoDto>();
            });

            return mappingConfig;
        }
    }
}
