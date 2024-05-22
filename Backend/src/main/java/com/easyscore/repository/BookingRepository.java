package com.easyscore.repository;


import com.easyscore.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByProductoIdAndFechaReserva(Long productoId, LocalDate fechaReserva);

    List<Booking> findByProductoIdAndFechaReservaAndHoraInicioBeforeAndHoraFinAfter(
            Long productoId, LocalDate fechaReserva, LocalTime horaFin, LocalTime horaInicio);
}

