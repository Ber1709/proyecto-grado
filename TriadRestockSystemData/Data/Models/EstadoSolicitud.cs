﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TriadRestockSystemData.Data.Models;

public partial class EstadoSolicitud
{
    [Key]
    public int IdEstado { get; set; }

    [StringLength(100)]
    [Unicode(false)]
    public string Estado { get; set; } = null!;

    [InverseProperty("IdEstadoNavigation")]
    public virtual ICollection<Solicitud> Solicitudes { get; set; } = new List<Solicitud>();
}
