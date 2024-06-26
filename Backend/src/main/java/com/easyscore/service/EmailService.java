package com.easyscore.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDate;
import java.time.LocalTime;

@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    @Autowired
    private JavaMailSender mailSender;

    public void sendWelcomeEmail(String to, String nombre) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject("Bienvenido a Easyscore");
            message.setText("Hola " + nombre + ",\n\nBienvenido a Easyscore! Nos alegra tenerte con nosotros.\n\n" +
                    "Visita nuestro sitio: [URL_DEL_SITIO]\n\nSaludos,\nEl equipo de Easyscore");
            mailSender.send(message);
            logger.info("Correo de bienvenida enviado a {}", to);
        } catch (Exception e) {
            logger.error("Error enviando correo de bienvenida a {}: {}", to, e.getMessage());
        }
    }

    public void sendBookingConfirmationEmail(String to, String nombre, String producto, LocalDate fecha, LocalTime horaInicio, LocalTime horaFin) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject("Confirmación de Reserva");
            message.setText("Hola " + nombre + ",\n\nTu reserva ha sido confirmada:\n\n" +
                    "Producto: " + producto + "\n" +
                    "Fecha: " + fecha + "\n" +
                    "Hora de inicio: " + horaInicio + "\n" +
                    "Hora de fin: " + horaFin + "\n\n" +
                    "Gracias por utilizar nuestro servicio.\n\nSaludos,\nEl equipo de Easyscore");
            mailSender.send(message);
            logger.info("Correo de confirmación de reserva enviado a {}", to);
        } catch (Exception e) {
            logger.error("Error enviando correo de confirmación de reserva a {}: {}", to, e.getMessage());
        }
    }
}