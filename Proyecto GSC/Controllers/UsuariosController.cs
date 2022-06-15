using Proyecto_GSC.Models;
using Proyecto_GSC.Models.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Proyecto_GSC.Repositorio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace Proyecto_GSC.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {

        private readonly InterfazUsuarioRepositorio _UsuarioRepositorio;
        protected ResponseDto _response;

        public UsuariosController(InterfazUsuarioRepositorio UsuarioRepositorio)
        {
            _UsuarioRepositorio = UsuarioRepositorio;
            _response = new ResponseDto();
        }


        [HttpPost("Register")]
        public async Task<ActionResult> Register(UsuarioDto usuario)
        {
            var respuesta = await _UsuarioRepositorio.Register(
                    new Usuario
                    {
                       NombreDeUsuario = usuario.NombreDeUsuario
                    }, usuario.Contraseña);

            if(respuesta == "existe")
            {
                _response.IsSuccess = false;
                _response.DisplayMessage = "Usuario ya Existe";
                return BadRequest(_response);
            }

            if(respuesta == "error")
            {
                _response.IsSuccess = false;
                _response.DisplayMessage = "Error al Crear el Usuario";
                return BadRequest(_response);
            }

            _response.DisplayMessage = "Usuario Creado con Exito!";
            //_response.Result = respuesta;
            JwTPackage jtp = new JwTPackage();
            jtp.NombreDeUsuario = usuario.NombreDeUsuario;
            jtp.Token = respuesta;
            _response.Result = jtp;


            return Ok(_response);
        }


        [HttpPost("Login")]
        public async Task<ActionResult> Login(UsuarioDto usuario)
        {
            var respuesta = await _UsuarioRepositorio.Login(usuario.NombreDeUsuario, usuario.Contraseña);

            if (respuesta == "nouser")
            {
                _response.IsSuccess = false;
                _response.DisplayMessage = "Usuario no Existe";
                return BadRequest(_response);
            }
            if (respuesta == "wrongpassword")
            {
                _response.IsSuccess = false;
                _response.DisplayMessage = "Password Incorrecta";
                return BadRequest(_response);
            }

            //_response.Result = respuesta;
            JwTPackage jtp = new JwTPackage();
            jtp.NombreDeUsuario = usuario.NombreDeUsuario;
            jtp.Token = respuesta;
            _response.Result = jtp;

            _response.DisplayMessage = "Usuario Conectado";
            return Ok(_response);
        }

    }

    public class JwTPackage
    {
        public string NombreDeUsuario { get; set; }
        public string Token { get; set; }
    }

}
