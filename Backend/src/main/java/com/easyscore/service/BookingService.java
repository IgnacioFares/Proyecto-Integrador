package com.easyscore.service;

import com.easyscore.model.Booking;
import com.easyscore.model.User;
import com.easyscore.repository.BookingRepository;
import com.easyscore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class BookingService {

    private static final Logger logger = LoggerFactory.getLogger(BookingService.class);

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

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
        Booking savedBooking = bookingRepository.save(booking);

        // Enviar correo electr贸nico de confirmaci贸n de reserva
        try {
            emailService.sendBookingConfirmationEmail(
                    user.getEmail(),
                    user.getNombre(),
                    booking.getProducto().getNombre(),
                    booking.getFechaReserva(),
                    booking.getHoraInicio(),
                    booking.getHoraFin()
            );
            logger.info("Correo de confirmaci贸n de reserva enviado a {}", user.getEmail());
        } catch (Exception e) {
            logger.error("Error enviando correo de confirmaci贸n de reserva a {}: {}", user.getEmail(), e.getMessage());
        }

        return savedBooking;
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

    public List<LocalTime> getAvailableTimes(Long productId, LocalDate date) {
        List<Booking> bookings = bookingRepository.findByProductoIdAndFechaReserva(productId, date);
        List<LocalTime> availableTimes = new ArrayList<>();
        LocalTime openingTime = LocalTime.of(10, 0); // Hora de apertura
        LocalTime closingTime = LocalTime.of(23, 0); // Hora de cierre

        for (LocalTime time = openingTime; time.isBefore(closingTime); time = time.plusHours(1)) {
            boolean isAvailable = true;
            for (Booking booking : bookings) {
                if (!booking.getHoraInicio().isAfter(time) && !booking.getHoraFin().isBefore(time.plusHours(1))) {
                    isAvailable = false;
                    break;
                }
            }
            if (isAvailable) {
                availableTimes.add(time);
            }
        }

        return availableTimes;
    }
}