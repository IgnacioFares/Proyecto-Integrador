package com.easyscore.controller;


import com.easyscore.model.Booking;
import com.easyscore.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingService.findAll();
    }

    @PostMapping
    public ResponseEntity<String> createBooking(@RequestBody Booking booking) {
        LocalTime startTime = booking.getHoraInicio();
        LocalTime endTime = booking.getHoraFin();

        if (bookingService.isProductAvailable(booking.getProducto().getId(), booking.getFechaReserva(), startTime, endTime)) {
            bookingService.save(booking);
            return ResponseEntity.ok("Booking created successfully");
        } else {
            return ResponseEntity.status(409).body("Product is not available for the selected time slot");
        }
    }

    @GetMapping("/product/{productId}/date/{date}")
    public List<Booking> getBookingsByProductAndDate(@PathVariable Long productId, @PathVariable String date) {
        LocalDate localDate = LocalDate.parse(date);
        return bookingService.findBookingsByProductoAndFecha(productId, localDate);
    }
}

