﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TriadRestockSystemData.Data.Models;

public partial class Almacen
{
    [Key]
    public int IdAlmacen { get; set; }

    [StringLength(100)]
    [Unicode(false)]
    public string Nombre { get; set; } = null!;

    [StringLength(500)]
    [Unicode(false)]
    public string Ubicacion { get; set; } = null!;

    [Column(TypeName = "decimal(18, 4)")]
    public decimal Espacio { get; set; }

    [StringLength(500)]
    [Unicode(false)]
    public string Descripcion { get; set; } = null!;

    public int CreadoPor { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime FechaCreacion { get; set; }

    public int? ModificadoPor { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? FechaModificacion { get; set; }

    [InverseProperty("IdAlmacenNavigation")]
    public virtual ICollection<AlmacenSeccion> AlmacenesSecciones { get; set; } = new List<AlmacenSeccion>();

    [ForeignKey("CreadoPor")]
    [InverseProperty("AlmaceneCreadoPorNavigations")]
    public virtual Usuario CreadoPorNavigation { get; set; } = null!;

    [ForeignKey("ModificadoPor")]
    [InverseProperty("AlmaceneModificadoPorNavigations")]
    public virtual Usuario? ModificadoPorNavigation { get; set; }
}
