package com.easyscore.repository;


import com.easyscore.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import org.springframework.data.jpa.repository.Query;


@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByProductoIdAndFechaReserva(Long productoId, LocalDate fechaReserva);

    List<Booking> findByProductoIdAndFechaReservaAndHoraInicioBeforeAndHoraFinAfter(
            Long productoId, LocalDate fechaReserva, LocalTime horaFin, LocalTime horaInicio);

    @Query("SELECT b FROM Booking b WHERE b.usuario.email = :email")
    List<Booking> findByUsuarioEmail(@Param("email") String email);

}

