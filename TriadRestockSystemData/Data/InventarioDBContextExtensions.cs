﻿using Dapper;
using Microsoft.EntityFrameworkCore;
using System.Data;
using TriadRestockSystemData.Data.ViewModels;

namespace TriadRestockSystemData.Data
{
    public static partial class InventarioDBContextExtensions
    {
        public static IList<vmUsuario> UsuariosGetAll(this InventarioDBContext context)
        {
            return context.Database.GetDbConnection()
                .Query<vmUsuario>("UsuariosGetAll", commandType: CommandType.StoredProcedure)
                .ToList();
        }
    }
}
