package com.easyscore.controller;

import com.easyscore.model.Producto;
import com.easyscore.service.ProductoService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping()
public class ProductoController {

    @Autowired
    private ProductoService productoService;

    @Operation(summary = "Trae todos los productos en un orden random")
    @GetMapping("/productos")
    public List<Producto> getAllProducts() {
        return productoService.findAllRandom();
    }

    @Operation(summary = "Trae un producto especificado por su id")
    @GetMapping("/{id}")
    public ResponseEntity<Producto> getProductoById(@PathVariable Long id) {
        return productoService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Buscar productos a traves de la barra de busqueda")
    @GetMapping("/search")
    public ResponseEntity<List<Producto>> searchProducts(
            @RequestParam(required = false) String searchTerm,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {
        List<Producto> productos = productoService.searchProducts(searchTerm, category, startDate, endDate);
        return ResponseEntity.ok(productos);
    }
}
