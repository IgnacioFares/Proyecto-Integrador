package com.easyscore.service;

import com.easyscore.model.Imagen;
import com.easyscore.repository.ImagenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ImagenService {

    @Autowired
    private ImagenRepository imagenRepository;

    public List<Imagen> findAll() {
        return imagenRepository.findAll();
    }

    public Optional<Imagen> findById(Long id) {
        return imagenRepository.findById(id);
    }

    public Imagen save(Imagen imagen) {
        return imagenRepository.save(imagen);
    }

    public void deleteById(Long id) {
        imagenRepository.deleteById(id);
    }

    public List<Imagen> findByProductoId(Long productoId) {
        return imagenRepository.findByProductoId(productoId);
    }
}
