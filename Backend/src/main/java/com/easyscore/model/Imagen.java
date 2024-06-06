package com.easyscore.model;

import lombok.Data;
import jakarta.persistence.*;

@Entity
@Data
public class Imagen {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String url;

    @ManyToOne
    @JoinColumn(name = "producto_id")
    private Producto producto;
}
