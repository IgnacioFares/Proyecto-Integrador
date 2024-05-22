package com.easyscore.service;


import com.easyscore.model.Caracteristica;
import com.easyscore.repository.CaracteristicaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CaracteristicaService {

    @Autowired
    private CaracteristicaRepository caracteristicaRepository;

    public List<Caracteristica> findAll() {
        return caracteristicaRepository.findAll();
    }

    public Optional<Caracteristica> findById(Long id) {
        return caracteristicaRepository.findById(id);
    }

    public Caracteristica save(Caracteristica caracteristica) {
        return caracteristicaRepository.save(caracteristica);
    }

    public void deleteById(Long id) {
        caracteristicaRepository.deleteById(id);
    }
}
