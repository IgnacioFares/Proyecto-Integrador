package com.easyscore.repository;


import com.easyscore.model.Ubicacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UbicacionRepository extends JpaRepository<Ubicacion, Long> {
    Optional<Ubicacion> findByDireccionAndCiudadAndProvincia(String direccion, String ciudad, String provincia);
}

