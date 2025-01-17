﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TriadRestockSystemData.Data.Models;

public partial class Impuesto
{
    [Key]
    public int IdImpuesto { get; set; }

    [StringLength(100)]
    [Unicode(false)]
    public string Nombre { get; set; } = null!;

    [Column("Impuesto", TypeName = "decimal(10, 2)")]
    public decimal Impuesto1 { get; set; }

    [InverseProperty("IdImpuestoNavigation")]
    public virtual ICollection<Inventario> Inventarios { get; set; } = new List<Inventario>();

    [InverseProperty("IdImpuestoNavigation")]
    public virtual ICollection<OrdenCompraDetalle> OrdenesCompraDetalles { get; set; } = new List<OrdenCompraDetalle>();
}
