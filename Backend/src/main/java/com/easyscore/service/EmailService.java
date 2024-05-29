package com.easyscore.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendWelcomeEmail(String to, String nombre) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Bienvenido a Easyscore");
        message.setText("Hola " + nombre + ",\n\nBienvenido a Easyscore! Nos alegra tenerte con nosotros.\n\n" +
                "Visita nuestro sitio: [URL_DEL_SITIO]\n\nSaludos,\nEl equipo de Easyscore");
        mailSender.send(message);
    }
}

