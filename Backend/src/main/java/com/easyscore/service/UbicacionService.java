package com.easyscore.service;

import com.easyscore.model.Ubicacion;
import com.easyscore.repository.UbicacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UbicacionService {

    @Autowired
    private UbicacionRepository ubicacionRepository;

    public List<Ubicacion> findAll() {
        return ubicacionRepository.findAll();
    }

    public Optional<Ubicacion> findById(Long id) {
        return ubicacionRepository.findById(id);
    }

    public Ubicacion save(Ubicacion ubicacion) {
        return ubicacionRepository.save(ubicacion);
    }

    public void deleteById(Long id) {
        ubicacionRepository.deleteById(id);
    }


}
