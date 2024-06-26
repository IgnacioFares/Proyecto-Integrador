package com.easyscore.service;

import com.easyscore.model.Caracteristica;
import com.easyscore.model.Categoria;
import com.easyscore.model.Producto;
import com.easyscore.model.Ubicacion;
import com.easyscore.repository.CaracteristicaRepository;
import com.easyscore.repository.CategoriaRepository;
import com.easyscore.repository.ProductoRepository;
import com.easyscore.repository.UbicacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class ProductoService {

    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private CaracteristicaRepository caracteristicaRepository;

    @Autowired
    UbicacionRepository ubicacionRepository;

    public List<Producto> findAllRandom() {
        List<Producto> productos = productoRepository.findAll();
        Collections.shuffle(productos);
        return productos;
    }
    public List<Producto> findAll() {
        return productoRepository.findAll();
    }

    public Optional<Producto> findById(Long id) {
        return productoRepository.findById(id);
    }

    //Este sirve para el metodo put
    public Producto save(Producto producto) {
        return productoRepository.save(producto);
    }

    //Este sirve para el metodo post
    public Producto saveWithRelations(Producto producto) {
        // Verificar y crear Ubicación
        if (producto.getUbicacion() != null) {
            Ubicacion ubicacion = producto.getUbicacion();
            Optional<Ubicacion> existingUbicacion = ubicacionRepository.findByDireccionAndCiudadAndProvincia(
                    ubicacion.getDireccion(), ubicacion.getCiudad(), ubicacion.getProvincia());
            if (existingUbicacion.isPresent()) {
                producto.setUbicacion(existingUbicacion.get());
            } else {
                ubicacionRepository.save(ubicacion);
            }
        }

        // Verificar y crear Categoría
        if (producto.getCategoria() != null) {
            Categoria categoria = producto.getCategoria();
            Optional<Categoria> existingCategoria = categoriaRepository.findByNombre(categoria.getNombre());
            if (existingCategoria.isPresent()) {
                producto.setCategoria(existingCategoria.get());
            } else {
                categoriaRepository.save(categoria);
            }
        }

        // Verificar y crear Características
        if (producto.getCaracteristicas() != null) {
            List<Caracteristica> existingCaracteristicas = new ArrayList<>();
            for (Caracteristica caracteristica : producto.getCaracteristicas()) {
                Optional<Caracteristica> existingCaracteristica = caracteristicaRepository.findByNombre(caracteristica.getNombre());
                if (existingCaracteristica.isPresent()) {
                    existingCaracteristicas.add(existingCaracteristica.get());
                } else {
                    caracteristicaRepository.save(caracteristica);
                    existingCaracteristicas.add(caracteristica);
                }
            }
            producto.setCaracteristicas(existingCaracteristicas);
        }

        return productoRepository.save(producto);
    }

    public void deleteById(Long id) {
        productoRepository.deleteById(id);
    }

    //Asignar Categoria a un producto
    public Producto asignarCategoria(Long productoId, Long categoriaId) {
        Producto producto = productoRepository.findById(productoId).orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        Categoria categoria = categoriaRepository.findById(categoriaId).orElseThrow(() -> new RuntimeException("Categoria no encontrada"));
        producto.setCategoria(categoria);
        return productoRepository.save(producto);
    }

    //Quitar Categoria a un producto
    public Producto quitarAsignacionCategoria(Long productoId) {
        Producto producto = productoRepository.findById(productoId).orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        producto.setCategoria(null);
        return productoRepository.save(producto);
    }


    //Asignar Caracteristicas a un producto
    public Producto asignarCaracteristicas(Long productoId, List<Long> caracteristicaIds) {
        Producto producto = productoRepository.findById(productoId).orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        List<Caracteristica> caracteristicas = caracteristicaRepository.findAllById(caracteristicaIds);
        producto.getCaracteristicas().addAll(caracteristicas);
        return productoRepository.save(producto);
    }

    //Quitar Caracteristicas a un producto
    public Producto quitarAsignacionCaracteristicas(Long productoId, List<Long> caracteristicaIds) {
        Producto producto = productoRepository.findById(productoId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        producto.getCaracteristicas().removeIf(caracteristica -> caracteristicaIds.contains(caracteristica.getId()));

        return productoRepository.save(producto);
    }



    public Producto updateProducto(Long id, Producto productoDetails) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        producto.setNombre(productoDetails.getNombre());
        producto.setDescripcion(productoDetails.getDescripcion());
        producto.setPrecio(productoDetails.getPrecio());
        producto.setHorarioApertura(productoDetails.getHorarioApertura());
        producto.setHorarioCierre(productoDetails.getHorarioCierre());

        if (productoDetails.getCategoria() != null) {
            Categoria categoria = categoriaRepository.findById(productoDetails.getCategoria().getId())
                    .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
            producto.setCategoria(categoria);
        }

        if (productoDetails.getUbicacion() != null) {
            Ubicacion ubicacion = ubicacionRepository.findById(productoDetails.getUbicacion().getId())
                    .orElseThrow(() -> new RuntimeException("Ubicación no encontrada"));
            producto.setUbicacion(ubicacion);
        }

        if (productoDetails.getCaracteristicas() != null) {
            List<Caracteristica> caracteristicas = new ArrayList<>();
            for (Caracteristica carac : productoDetails.getCaracteristicas()) {
                Caracteristica caracteristica = caracteristicaRepository.findById(carac.getId())
                        .orElseThrow(() -> new RuntimeException("Característica no encontrada"));
                caracteristicas.add(caracteristica);
            }
            producto.setCaracteristicas(caracteristicas);
        }

        producto.setImagenes(productoDetails.getImagenes());

        return productoRepository.save(producto);
    }

    //Barra de busqueda
    public List<Producto> searchProducts(String searchTerm, String category, String ciudad, LocalDate startDate, LocalTime startTime, LocalTime endTime) {
        if (searchTerm == null) {
            searchTerm = "";
        }
        searchTerm = "%" + searchTerm.toLowerCase() + "%";

        return productoRepository.searchProducts(searchTerm, category, ciudad, startDate, startTime, endTime);
    }


}
