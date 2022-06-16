using Proyecto_GSC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Proyecto_GSC.Repositorio
{
    public interface InterfazUsuarioRepositorio
    {
        Task<string> Register(Usuario user, string password);
        Task<string> Login(string userName, string password);
        Task<bool> UserExiste(string username);


    }
}
