package com.easyscore.controller;

import com.easyscore.model.Producto;
import com.easyscore.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
public class ProductoController {

    @Autowired
    private ProductoService productoService;

    @GetMapping("/productos")
    public List<Producto> getAllProducts() {
        return productoService.findAllRandom();
    }

    @GetMapping("/productos/{id}")
    public Producto getProductById(@PathVariable Long id) {
        return productoService.findById(id).orElse(null);
    }
}
