package com.easyscore.service;


import com.easyscore.model.Booking;
import com.easyscore.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    public List<Booking> findAll() {
        return bookingRepository.findAll();
    }

    public Booking save(Booking booking) {
        return bookingRepository.save(booking);
    }

    public boolean isProductAvailable(Long productId, LocalDate date, LocalTime startTime, LocalTime endTime) {
        List<Booking> bookings = bookingRepository.findByProductoIdAndFechaReservaAndHoraInicioBeforeAndHoraFinAfter(
                productId, date, endTime, startTime);
        return bookings.isEmpty();
    }

    public List<Booking> findBookingsByProductoAndFecha(Long productoId, LocalDate fechaReserva) {
        return bookingRepository.findByProductoIdAndFechaReserva(productoId, fechaReserva);
    }
}

