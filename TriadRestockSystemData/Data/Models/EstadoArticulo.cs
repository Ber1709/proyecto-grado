﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TriadRestockSystemData.Data.Models;

public partial class EstadoArticulo
{
    [Key]
    public int IdEstado { get; set; }

    [StringLength(10)]
    public string? Estado { get; set; }

    [InverseProperty("IdEstadoNavigation")]
    public virtual ICollection<Inventario> Inventarios { get; set; } = new List<Inventario>();
}
