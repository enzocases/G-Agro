package com.gagro.backend.Controllers;

import com.gagro.backend.Models.Terreno;
import com.gagro.backend.Service.TerrenoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/terrenos")
public class TerrenoController {

    @Autowired
    private TerrenoService terrenoService;

    @GetMapping
    public List<Terreno> getAllTerrenos(){
        return terrenoService.getAllTerrenos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Terreno> getTerrenoById(@PathVariable Long id){
        Optional<Terreno> terreno = terrenoService.getTerrenoById(id);
        if(terreno.isPresent()){
            return ResponseEntity.ok(terreno.get());
        }

        return ResponseEntity.notFound().build();
    }

    @PostMapping("/cadastro")
    public ResponseEntity<String> addTerreno(@RequestBody Terreno terreno){
        String response = terrenoService.createTerreno(terreno);
        if(response.contains("já existe")){
            return ResponseEntity.badRequest().body(response);
        }
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateTerreno(@PathVariable Long id, @RequestBody Terreno terreno){
        String response = terrenoService.updateTerreno(id, terreno);
        if(response.contains("não encontrado")){
            return ResponseEntity.badRequest().body(response);
        }
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTerreno(@PathVariable Long id){
        String response = terrenoService.deleteTerreno(id);
        if (response.contains("não encontrado")){
            return ResponseEntity.badRequest().body(response);
        }
        return ResponseEntity.ok(response);
    }
}
