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
    public class MedicosController : ControllerBase
    {
        private readonly InterfazMedicoRepositorio _medicoRepositorio;
        protected ResponseDto _response;

        public MedicosController(InterfazMedicoRepositorio medicoRepositorio)
        {
            _medicoRepositorio = medicoRepositorio;
            _response = new ResponseDto();
        }

        // GET: api/Citas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Medico>>> GetMedicos()
        {
            try
            {
                var lista = await _medicoRepositorio.GetMedicos();
                _response.Result = lista;
                _response.DisplayMessage = "Lista de Medicos";
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
        public async Task<ActionResult<Medico>> GetMedico(int id)
        {
            var medico = await _medicoRepositorio.GetMedicoById(id);
            if ( medico == null)
            {
                _response.IsSuccess = false;
                _response.DisplayMessage = "Cita No Existe";
                return NotFound(_response);
            }
            _response.Result = medico;
            _response.DisplayMessage = "Informacion del Cita";
            return Ok(_response);
        }

        // PUT: api/Pacientes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMedico(int id, MedicoDto medicoDto)
        {
            try
            {
                MedicoDto model = await _medicoRepositorio.CreateUpdate(medicoDto);
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
        public async Task<ActionResult<Medico>> PostMedico(MedicoDto medicoDto)
        {
            try
            {
                MedicoDto model = await _medicoRepositorio.CreateUpdate(medicoDto);
                _response.Result = model;
                return CreatedAtAction("GetMedico", new { id = model.Id }, _response);
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
        public async Task<IActionResult> DeleteMeidico(int id)
        {
            try
            {
                bool estaEliminado = await _medicoRepositorio.DeleteMedico(id);
                if (estaEliminado)
                {
                    _response.Result = estaEliminado;
                    _response.DisplayMessage = "Medico Eliminado con Exito";
                    return Ok(_response);
                }
                else
                {
                    _response.IsSuccess = false;
                    _response.DisplayMessage = "Error al Eliminar Medico";
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
