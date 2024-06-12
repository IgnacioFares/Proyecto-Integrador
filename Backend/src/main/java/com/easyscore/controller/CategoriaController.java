package com.easyscore.controller;

import com.easyscore.model.Categoria;
import com.easyscore.service.CategoriaService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping()
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;

    @Operation(summary = "Lista todas las categorias")
    @GetMapping("/categorias")
    public List<Categoria> getAllCategorias() {
        return categoriaService.getAllCategorias();
    }
}
