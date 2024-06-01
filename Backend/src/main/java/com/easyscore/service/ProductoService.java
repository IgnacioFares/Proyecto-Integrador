package com.easyscore.service;

import com.easyscore.model.Caracteristica;
import com.easyscore.model.Categoria;
import com.easyscore.model.Producto;
import com.easyscore.repository.CaracteristicaRepository;
import com.easyscore.repository.CategoriaRepository;
import com.easyscore.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public Producto save(Producto producto) {
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



    public Producto update(Producto producto) {
        return productoRepository.save(producto);
    }


}
