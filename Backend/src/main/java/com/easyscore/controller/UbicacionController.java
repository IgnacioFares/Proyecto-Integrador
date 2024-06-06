package com.easyscore.controller;


import com.easyscore.model.Ubicacion;
import com.easyscore.service.UbicacionService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/ubicaciones")
public class UbicacionController {

    @Autowired
    UbicacionService ubicacionService;

    @Operation(summary = "Obtener todas las ubicaciones")
    @GetMapping
    public ResponseEntity<List<Ubicacion>> getAllUbicaciones() {
        List<Ubicacion> ubicaciones = ubicacionService.findAll();
        return ResponseEntity.ok(ubicaciones);
    }
}
