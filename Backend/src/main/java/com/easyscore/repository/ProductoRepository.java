package com.easyscore.repository;

import com.easyscore.model.Producto;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {

    @EntityGraph(attributePaths = {"caracteristicas"})
    @Query(value = "SELECT * FROM Producto ORDER BY RAND()", nativeQuery = true)
    List<Producto> findAllRandom();


    @Query("SELECT p FROM Producto p WHERE " +
            "(:searchTerm IS NULL OR LOWER(p.nombre) LIKE :searchTerm) AND " +
            "(:category IS NULL OR p.categoria.nombre = :category) AND " +
            "(:ciudad IS NULL OR p.ubicacion.ciudad = :ciudad) AND " +
            "(:startDate IS NULL OR :startTime IS NULL OR :endTime IS NULL OR NOT EXISTS (" +
            "SELECT b FROM Booking b WHERE b.producto.id = p.id AND " +
            "b.fechaReserva = :startDate AND " +
            "(b.horaInicio BETWEEN :startTime AND :endTime OR " +
            "b.horaFin BETWEEN :startTime AND :endTime)))")
    List<Producto> searchProducts(@Param("searchTerm") String searchTerm,
                                  @Param("category") String category,
                                  @Param("ciudad") String ciudad,
                                  @Param("startDate") LocalDate startDate,
                                  @Param("startTime") LocalTime startTime,
                                  @Param("endTime") LocalTime endTime);

}
