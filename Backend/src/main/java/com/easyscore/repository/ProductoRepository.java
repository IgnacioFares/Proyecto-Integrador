package com.easyscore.repository;

import com.easyscore.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {

    @Query(value = "SELECT * FROM Producto ORDER BY RAND()", nativeQuery = true)
    List<Producto> findAllRandom();
}