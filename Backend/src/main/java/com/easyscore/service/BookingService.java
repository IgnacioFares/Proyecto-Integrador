package com.easyscore.service;

import com.easyscore.model.Booking;
import com.easyscore.model.User;
import com.easyscore.repository.BookingRepository;
import com.easyscore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Booking> findAll() {
        return bookingRepository.findAll();
    }

    public boolean isProductAvailable(Long productId, LocalDate date, LocalTime startTime, LocalTime endTime) {
        List<Booking> bookings = bookingRepository.findByProductoIdAndFechaReservaAndHoraInicioBeforeAndHoraFinAfter(
                productId, date, endTime, startTime);
        return bookings.isEmpty();
    }

    public Booking save(Booking booking, String email) {
        if (!isProductAvailable(booking.getProducto().getId(), booking.getFechaReserva(), booking.getHoraInicio(), booking.getHoraFin())) {
            throw new RuntimeException("Product is not available for the selected time slot");
        }
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found with email: " + email));
        booking.setUsuario(user);
        return bookingRepository.save(booking);
    }


    public void delete(Long id) {
        bookingRepository.deleteById(id);
    }

    public List<Booking> findBookingsByProductoAndFecha(Long productoId, LocalDate fechaReserva) {
        return bookingRepository.findByProductoIdAndFechaReserva(productoId, fechaReserva);
    }

    public List<Booking> findBookingsByUserEmail(String email) {
        return bookingRepository.findByUsuarioEmail(email);
    }

}
