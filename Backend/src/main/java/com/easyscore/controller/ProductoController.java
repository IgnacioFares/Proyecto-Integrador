package com.easyscore.controller;

import com.easyscore.model.Producto;
import com.easyscore.service.ProductoService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
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
    @GetMapping("/productos/{id}")
    public ResponseEntity<Producto> getProductoById(@PathVariable Long id) {
        return productoService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Buscar productos a traves de la barra de busqueda")
    @GetMapping("/search")
    public ResponseEntity<List<Producto>> searchProducts(@RequestParam(required = false) String searchTerm,
                                                         @RequestParam(required = false) String category,
                                                         @RequestParam(required = false) String ciudad,
                                                         @RequestParam(required = false) LocalDate startDate,
                                                         @RequestParam(required = false) LocalTime startTime,
                                                         @RequestParam(required = false) LocalTime endTime) {
        List<Producto> productos = productoService.searchProducts(searchTerm, category, ciudad, startDate, startTime, endTime);
        return ResponseEntity.ok(productos);
    }
}
