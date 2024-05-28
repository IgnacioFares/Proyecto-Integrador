package com.easyscore.controller;

import com.easyscore.model.Categoria;
import com.easyscore.model.Producto;
import com.easyscore.service.CategoriaService;
import com.easyscore.service.ProductoService;
import com.easyscore.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/administracion")
public class AdminController {

    @Autowired
    private ProductoService productoService;

    @Autowired
    private CategoriaService categoriaService;

    @Autowired
    private UserService userService;

    // Endpoints para productos

    @GetMapping("/productos")
    public List<Producto> getAllProductos() {
        return productoService.findAll();
    }

    @GetMapping("/productos/{id}")
    public ResponseEntity<Producto> getProductoById(@PathVariable Long id) {
        return productoService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/productos")
    public Producto createProducto(@RequestBody Producto producto) {
        return productoService.save(producto);
    }

    @PutMapping("/productos/{id}")
    public ResponseEntity<Producto> updateProducto(@PathVariable Long id, @RequestBody Producto productoDetails) {
        return productoService.findById(id)
                .map(producto -> {
                    producto.setNombre(productoDetails.getNombre());
                    producto.setDescripcion(productoDetails.getDescripcion());
                    producto.setCaracteristicas(productoDetails.getCaracteristicas());
                    producto.setImagenes(productoDetails.getImagenes());
                    producto.setUbicacion(productoDetails.getUbicacion());
                    producto.setCategoria(productoDetails.getCategoria());
                    Producto updatedProducto = productoService.save(producto);
                    return ResponseEntity.ok(updatedProducto);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/productos/{id}")
    public ResponseEntity<Void> deleteProducto(@PathVariable Long id) {
        return productoService.findById(id)
                .map(producto -> {
                    productoService.deleteById(id);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Endpoints para gestión de usuarios

    @PostMapping("/users/{id}/roles")
    public ResponseEntity<?> addRoleToUser(@PathVariable Long id, @RequestBody String roleName) {
        userService.addRoleToUser(id, roleName);
        return ResponseEntity.ok().build();
    }

    // Endpoints para categorías

    @GetMapping("/categorias")
    public List<Categoria> getAllCategorias() {
        return categoriaService.getAllCategorias();
    }

    @GetMapping("/categorias/{id}")
    public ResponseEntity<Categoria> getCategoriaById(@PathVariable Long id) {
        Optional<Categoria> categoria = categoriaService.getCategoriaById(id);
        if (categoria.isPresent()) {
            return ResponseEntity.ok(categoria.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/categorias")
    public Categoria createCategoria(@RequestBody Categoria categoria) {
        return categoriaService.saveCategoria(categoria);
    }

    @PutMapping("/categorias/{id}")
    public ResponseEntity<Categoria> updateCategoria(@PathVariable Long id, @RequestBody Categoria categoriaDetails) {
        Optional<Categoria> categoria = categoriaService.getCategoriaById(id);
        if (categoria.isPresent()) {
            Categoria updatedCategoria = categoria.get();
            updatedCategoria.setNombre(categoriaDetails.getNombre());
            categoriaService.saveCategoria(updatedCategoria);
            return ResponseEntity.ok(updatedCategoria);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/productos/{productoId}/categoria/{categoriaId}")
    public ResponseEntity<Producto> asignarCategoria(@PathVariable Long productoId, @PathVariable Long categoriaId) {
        Optional<Producto> productoOpt = productoService.findById(productoId);
        Optional<Categoria> categoriaOpt = categoriaService.getCategoriaById(categoriaId);

        if (productoOpt.isPresent() && categoriaOpt.isPresent()) {
            Producto producto = productoOpt.get();
            Categoria categoria = categoriaOpt.get();
            producto.setCategoria(categoria);
            Producto updatedProducto = productoService.save(producto);
            return ResponseEntity.ok(updatedProducto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/categorias/{id}")
    public ResponseEntity<Void> deleteCategoria(@PathVariable Long id) {
        if (categoriaService.getCategoriaById(id).isPresent()) {
            categoriaService.deleteCategoria(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
