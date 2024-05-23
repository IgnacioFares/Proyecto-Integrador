package com.easyscore.controller;

import com.easyscore.model.Caracteristica;
import com.easyscore.model.Categoria;
import com.easyscore.model.Producto;
import com.easyscore.service.CaracteristicaService;
import com.easyscore.service.CategoriaService;
import com.easyscore.service.ProductoService;
import com.easyscore.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
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

    @PostMapping("/users/{username}/roles")
    public ResponseEntity<?> addRoleToUser(@PathVariable String username, @RequestBody String roleName) {
        userService.addRoleToUser(username, roleName);
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

    // Endpoints para características

    @GetMapping("/caracteristicas")
    public List<Caracteristica> getAllCaracteristicas() {
        return caracteristicaService.findAll();
    }


    @GetMapping("/caracteristicas/{id}")
    public ResponseEntity<Caracteristica> getCaracteristicaById(@PathVariable Long id) {
        Optional<Caracteristica> caracteristica = caracteristicaService.findById(id);
        if (caracteristica.isPresent()) {
            return ResponseEntity.ok(caracteristica.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Crear caracteristica
    @PostMapping("/caracteristicas")
    public Caracteristica createCaracteristica(@RequestBody Caracteristica caracteristica) {
        return caracteristicaService.save(caracteristica);
    }

    // Editar caracteristica
    @PutMapping("/caracteristicas/{id}")
    public ResponseEntity<Caracteristica> updateCaracteristica(@PathVariable Long id, @RequestBody Caracteristica caracteristicaDetails) {
        Optional<Caracteristica> caracteristica = caracteristicaService.findById(id);
        if (caracteristica.isPresent()) {
            Caracteristica updatedCaracteristica = caracteristica.get();
            updatedCaracteristica.setNombre(caracteristicaDetails.getNombre());
            caracteristicaService.save(updatedCaracteristica);
            return ResponseEntity.ok(updatedCaracteristica);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Asignar características a un producto
    @PutMapping("/productos/{productoId}/caracteristicas")
    public ResponseEntity<Producto> asignarCaracteristicas(
            @PathVariable Long productoId,
            @RequestBody List<String> nombresCaracteristicas) {

        List<Caracteristica> caracteristicas = caracteristicaService.findByNombres(nombresCaracteristicas);
        Producto updatedProducto = productoService.asignarCaracteristicasPorNombre(productoId, caracteristicas);
        if (updatedProducto != null) {
            return ResponseEntity.ok(updatedProducto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    // Eliminar caracteristica
    @DeleteMapping("/caracteristicas/{id}")
    public ResponseEntity<Void> deleteCaracteristica(@PathVariable Long id) {
        if (caracteristicaService.findById(id).isPresent()) {
            caracteristicaService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
