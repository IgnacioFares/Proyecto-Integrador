package com.easyscore.repository;

import com.easyscore.model.Producto;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {

    @EntityGraph(attributePaths = {"caracteristicas"})
    @Query(value = "SELECT * FROM Producto ORDER BY RAND()", nativeQuery = true)
    List<Producto> findAllRandom();

    @Query("SELECT p FROM Producto p WHERE " +
            "(:searchTerm IS NULL OR LOWER(p.nombre) LIKE :searchTerm) AND " +
            "(:category IS NULL OR p.categoria.nombre = :category) AND " +
            "(:startDate IS NULL OR p.horarioApertura >= :startDate) AND " +
            "(:endDate IS NULL OR p.horarioCierre <= :endDate) AND " +
            "(:location IS NULL OR p.ubicacion.ciudad = :location)")
    List<Producto> searchProducts(
            @Param("searchTerm") String searchTerm,
            @Param("category") String category,
            @Param("startDate") String startDate,
            @Param("endDate") String endDate,
            @Param("location") String location);
}