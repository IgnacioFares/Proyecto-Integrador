package com.easyscore.controller;

import com.easyscore.model.Caracteristica;
import com.easyscore.model.Categoria;
import com.easyscore.model.Producto;
import com.easyscore.service.CaracteristicaService;
import com.easyscore.service.CategoriaService;
import com.easyscore.service.ProductoService;
import com.easyscore.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
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
    private CaracteristicaService caracteristicaService;

    @Autowired
    private UserService userService;

    // Endpoints para productos

    @Operation(summary = "Lista los productos en el panel de admin")
    @GetMapping("/productos")
    public List<Producto> getAllProductos() {
        return productoService.findAll();
    }

    @Operation(summary = "Trae un producto seleccionado por id")
    @GetMapping("/productos/{id}")
    public ResponseEntity<Producto> getProductoById(@PathVariable Long id) {
        return productoService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Se encarga de la creacion de un nuevo producto", security = @SecurityRequirement(name = "Bearer Authentication"))
    @PostMapping("/productos")
    public Producto createProducto(@RequestBody Producto producto) {
        return productoService.saveWithRelations(producto);
    }

    @Operation(summary = "Se encarga de editar un producto existente", security = @SecurityRequirement(name = "Bearer Authentication"))
    @PutMapping("/productos/{id}")
    public ResponseEntity<Producto> updateProducto(@PathVariable Long id, @RequestBody Producto productoDetails) {
        Producto updatedProducto = productoService.updateProducto(id, productoDetails);
        return ResponseEntity.ok(updatedProducto);
    }

    @Operation(summary = "Se encarga de eliminar un producto existente", security = @SecurityRequirement(name = "Bearer Authentication"))
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

    @Operation(summary = "Asigna el rol de administrador a un usuario", security = @SecurityRequirement(name = "Bearer Authentication"))
    @PutMapping("/users/{userId}/roles")
    public ResponseEntity<?> addRoleToUser(@PathVariable Long userId, @RequestBody String roleName) {
        userService.addRoleToUser(userId, roleName);
        return ResponseEntity.ok("Rol asignado exitosamente");
    }

    // Endpoints para categorías

    @Operation(summary = "Traer una categoria por su id", security = @SecurityRequirement(name = "Bearer Authentication"))
    @GetMapping("/categorias/{id}")
    public ResponseEntity<Categoria> getCategoriaById(@PathVariable Long id) {
        Optional<Categoria> categoria = categoriaService.getCategoriaById(id);
        if (categoria.isPresent()) {
            return ResponseEntity.ok(categoria.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Operation(summary = "Se encarga de crear una nueva categoria", security = @SecurityRequirement(name = "Bearer Authentication"))
    @PostMapping("/categorias/create")
    public Categoria createCategoria(@RequestBody Categoria categoria) {
        return categoriaService.saveCategoria(categoria);
    }

    @Operation(summary = "Se encarga de editar una categoria existente", security = @SecurityRequirement(name = "Bearer Authentication"))
    @PutMapping("/categorias/update/{id}")
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

    @Operation(summary = "Se encarga de asignar una categoria a un producto existente", security = @SecurityRequirement(name = "Bearer Authentication"))
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

    @Operation(summary = "Se encarga de quitar la asignacion de una categoria a un producto", security = @SecurityRequirement(name = "Bearer Authentication"))
    @DeleteMapping("/productos/{productoId}/categoria")
    public ResponseEntity<Producto> quitarAsignacionCategoria(@PathVariable Long productoId) {
        return ResponseEntity.ok(productoService.quitarAsignacionCategoria(productoId));
    }

    @Operation(summary = "Se encarga de eliminar una categoria existente", security = @SecurityRequirement(name = "Bearer Authentication"))
    @DeleteMapping("/categorias/delete/{id}")
    public ResponseEntity<Void> deleteCategoria(@PathVariable Long id) {
        if (categoriaService.getCategoriaById(id).isPresent()) {
            categoriaService.deleteCategoria(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoints de Caracteristicas

    @Operation(summary = "Se encarga de listar las caracteristicas en el panel", security = @SecurityRequirement(name = "Bearer Authentication"))
    @GetMapping("/caracteristicas")
    public List<Caracteristica> getAllCaracteristicas() {
        return caracteristicaService.findAll();
    }

    @Operation(summary = "Se encarga de traer una caracteristica por su id", security = @SecurityRequirement(name = "Bearer Authentication"))
    @GetMapping("/caracteristicas/{id}")
    public ResponseEntity<Caracteristica> getCaracteristicaById(@PathVariable Long id) {
        return caracteristicaService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Se encarga de crear una nueva caracteristica", security = @SecurityRequirement(name = "Bearer Authentication"))
    @PostMapping("/caracteristicas/create")
    public Caracteristica createCaracteristica(@RequestBody Caracteristica caracteristica) {
        return caracteristicaService.save(caracteristica);
    }

    @Operation(summary = "Se encarga de editar una caracteristica existente", security = @SecurityRequirement(name = "Bearer Authentication"))
    @PutMapping("/caracteristicas/update/{id}")
    public ResponseEntity<Caracteristica> updateCaracteristica(@PathVariable Long id, @RequestBody Caracteristica caracteristicaDetails) {
        return caracteristicaService.findById(id)
                .map(caracteristica -> {
                    caracteristica.setNombre(caracteristicaDetails.getNombre());
                    caracteristica.setLogoUrl(caracteristicaDetails.getLogoUrl());
                    Caracteristica updatedCaracteristica = caracteristicaService.save(caracteristica);
                    return ResponseEntity.ok(updatedCaracteristica);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Se encarga de asignar una o mas caracteristicas a un producto existente", security = @SecurityRequirement(name = "Bearer Authentication"))
    @PutMapping("/productos/{productoId}/caracteristicas")
    public ResponseEntity<Producto> asignarCaracteristicas(@PathVariable Long productoId, @RequestBody List<Long> caracteristicaIds) {
        return ResponseEntity.ok(productoService.asignarCaracteristicas(productoId, caracteristicaIds));
    }

    @Operation(summary = "Se encarga de quitar la asignacion de una o mas caracteristicas a un producto existente", security = @SecurityRequirement(name = "Bearer Authentication"))
    @DeleteMapping("/productos/{productoId}/caracteristicas")
    public ResponseEntity<Producto> quitarAsignacionCaracteristicas(@PathVariable Long productoId, @RequestBody List<Long> caracteristicaIds) {
        return ResponseEntity.ok(productoService.quitarAsignacionCaracteristicas(productoId, caracteristicaIds));
    }

    @Operation(summary = "Se encarga de eliminar una caracteristica existente", security = @SecurityRequirement(name = "Bearer Authentication"))
    @DeleteMapping("/caracteristicas/delete/{id}")
    public ResponseEntity<Void> deleteCaracteristica(@PathVariable Long id) {
        return caracteristicaService.findById(id)
                .map(caracteristica -> {
                    caracteristicaService.deleteById(id);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
