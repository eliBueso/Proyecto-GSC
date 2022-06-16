using Proyecto_GSC.Data;
using Proyecto_GSC.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Proyecto_GSC.Repositorio
{
    public class UsuarioRepositorio : InterfazUsuarioRepositorio
    {

        private readonly AplicationDbContext _db;
        private readonly IConfiguration _configuration;

        public UsuarioRepositorio(AplicationDbContext db, IConfiguration configuration)
        {
            _db = db;
            _configuration = configuration;
        }

        public async Task<string> Login(string nombreDeUsuario, string contraseña)
        {
            var usuario = await _db.Usuarios.FirstOrDefaultAsync(
                x => x.NombreDeUsuario.ToLower().Equals(nombreDeUsuario.ToLower()));

            if (usuario == null)
            {
                return "nouser";
            }
            else if (!VerificarPasswordHash(contraseña, usuario.PasswordHash, usuario.PasswordSalt))
            {
                return "wrongpassword";
            }
            else
            {
                return CrearToken(usuario);
            }

        }

        public async Task<string> Register(Usuario usuario, string password)
        {
            try
            {

                if (await UserExiste(usuario.NombreDeUsuario))
                {
                    return "existe";
                }

                CrearPasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);

                usuario.PasswordHash = passwordHash;
                usuario.PasswordSalt = passwordSalt;

                await _db.Usuarios.AddAsync(usuario);
                await _db.SaveChangesAsync();
                return CrearToken(usuario);
            }
            catch (Exception)
            {

                return "error";
            }
        }

        public async Task<bool> UserExiste(string username)
        {
            if (await _db.Usuarios.AnyAsync(x => x.NombreDeUsuario.ToLower().Equals(username.ToLower())))
            {
                return true;
            }
            return false;
        }


        private void CrearPasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }


        public bool VerificarPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != passwordHash[i])
                    {
                        return false;
                    }
                }
                return true;
            }
        }


        private string CrearToken(Usuario usuario)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, usuario.Id.ToString()),
                new Claim(ClaimTypes.Name, usuario.NombreDeUsuario)
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.
                                        GetBytes(_configuration.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = System.DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);

        }



    }
}
