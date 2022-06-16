using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Proyecto_GSC.Data;
using Proyecto_GSC.Models;
using Proyecto_GSC.Models.Dto;
using Proyecto_GSC.Repositorio;
using Microsoft.AspNetCore.Authorization;

namespace Proyecto_GSC.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CitasController : ControllerBase
    {
        private readonly InterfazCitaRepositorio _citaRepositorio;
        protected ResponseDto _response;

        public CitasController(InterfazCitaRepositorio citaRepositorio)
        {
            _citaRepositorio = citaRepositorio;
            _response = new ResponseDto();
        }

        // GET: api/Citas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cita>>> GetCitas()
        {
            try
            {
                var lista = await _citaRepositorio.GetCitas();
                _response.Result = lista;
                _response.DisplayMessage = "Lista de Citas";
            }
            catch (Exception ex)
            {

                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string> { ex.ToString() };
            }

            return Ok(_response);
        }

        // GET: api/Pacientes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Cita>> GetCita(int id)
        {
            var cita = await _citaRepositorio.GetCitaById(id);
            if (cita == null)
            {
                _response.IsSuccess = false;
                _response.DisplayMessage = "Cita No Existe";
                return NotFound(_response);
            }
            _response.Result = cita;
            _response.DisplayMessage = "Informacion del Cita";
            return Ok(_response);
        }

        // PUT: api/Pacientes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCita(int id, CitaDto citaDto)
        {
            try
            {
                CitaDto model = await _citaRepositorio.CreateUpdate(citaDto);
                _response.Result = model;
                return Ok(_response);
            }
            catch (Exception ex)
            {

                _response.IsSuccess = false;
                _response.DisplayMessage = "Error al Actualizar el Registro";
                _response.ErrorMessages = new List<string> { ex.ToString() };
                return BadRequest(_response);
            }
        }

        // POST: api/Pacientes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Paciente>> PostCita(CitaDto citaDto)
        {
            try
            {
                CitaDto model = await _citaRepositorio.CreateUpdate(citaDto);
                _response.Result = model;
                return CreatedAtAction("GetCita", new { id = model.Id }, _response);
            }
            catch (Exception ex)
            {

                _response.IsSuccess = false;
                _response.DisplayMessage = "Error al Grabar el Registro";
                _response.ErrorMessages = new List<string> { ex.ToString() };
                return BadRequest(_response);
            }
        }

        // DELETE: api/Pacientes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCita(int id)
        {
            try
            {
                bool estaEliminada = await _citaRepositorio.DeleteCita(id);
                if (estaEliminada)
                {
                    _response.Result = estaEliminada;
                    _response.DisplayMessage = "Cita Eliminada con Exito";
                    return Ok(_response);
                }
                else
                {
                    _response.IsSuccess = false;
                    _response.DisplayMessage = "Error al Eliminar Cita";
                    return BadRequest(_response);
                }
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string> { ex.ToString() };
                return BadRequest(_response);
            }
        }


    }
}
