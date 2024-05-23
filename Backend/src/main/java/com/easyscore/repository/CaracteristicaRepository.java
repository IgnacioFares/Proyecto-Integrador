package com.easyscore.repository;

import com.easyscore.model.Caracteristica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CaracteristicaRepository extends JpaRepository<Caracteristica, Long> {
    List<Caracteristica> findByNombreIn(List<String> nombres);
}
