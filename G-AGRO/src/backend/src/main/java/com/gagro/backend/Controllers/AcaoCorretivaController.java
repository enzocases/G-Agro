package com.gagro.backend.Controllers;

import com.gagro.backend.DTO.AcaoCorretivaDTO;
import com.gagro.backend.Models.AcaoCorretiva;
import com.gagro.backend.Models.Colheita;
import com.gagro.backend.Service.AcaoCorretivaService;
import com.gagro.backend.Service.ColheitaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/acaoCorretiva")
public class AcaoCorretivaController {

    @Autowired
    private AcaoCorretivaService acaoCorretivaService;
    @Autowired
    private ColheitaService colheitaService;

    @GetMapping
    public List<AcaoCorretiva> getAllAcoes() {
        return acaoCorretivaService.getAllAcoes();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AcaoCorretiva> getAcaoCorretivaPorId(@PathVariable Long id) {
        Optional<AcaoCorretiva> acaoCorretiva = acaoCorretivaService.getAcaoCorretivaById(id);
        if (acaoCorretiva.isPresent()) {
            return ResponseEntity.ok(acaoCorretiva.get());
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/colheita/{idColheita}")
    public ResponseEntity<List<AcaoCorretiva>> getAcoesCorretivasPorColheita(@PathVariable Long idColheita) {
        Optional<Colheita> colheitaOptional = colheitaService.getColheitaById(idColheita);
        if (colheitaOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        List<AcaoCorretiva> acoesCorretivas = acaoCorretivaService.getAcoesCorretivasPorColheita(idColheita);
        if (acoesCorretivas.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(acoesCorretivas);
        }

        return ResponseEntity.ok(acoesCorretivas);
    }


    @PostMapping("/cadastro")
    public ResponseEntity<String> cadastrarAcaoCorretiva(@RequestBody AcaoCorretivaDTO acaoCorretivaDTO) {

        AcaoCorretiva acaoCorretiva = new AcaoCorretiva();

        acaoCorretiva.setDescricao(acaoCorretivaDTO.getDescricao());

        Optional<Colheita> colheitaAtual = colheitaService.getColheitaById(acaoCorretivaDTO.getIdColheita());
        if (colheitaAtual.isPresent()) {
            acaoCorretiva.setColheita(colheitaAtual.get());
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Colheita não encontrada");
        }
        
        String response = acaoCorretivaService.registerAcaoCorretiva(acaoCorretiva);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> atualizarAcaoCorretiva(@PathVariable Long id, @RequestBody AcaoCorretivaDTO acaoCorretivaDTO) {
        Optional<AcaoCorretiva> acaoCorretivaOptional = acaoCorretivaService.getAcaoCorretivaById(id);
        if (acaoCorretivaOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Ação Corretiva não encontrado para o ID: " + id);
        }

        AcaoCorretiva acaoCorretiva = new AcaoCorretiva();
        acaoCorretiva.setDescricao(acaoCorretivaDTO.getDescricao());
        Optional<Colheita> colheitaAtual = colheitaService.getColheitaById(acaoCorretivaDTO.getIdColheita());
        if (colheitaAtual.isPresent()) {
            acaoCorretiva.setColheita(colheitaAtual.get());
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Colheita não encontrada");
        }

        String response = acaoCorretivaService.updateAcaoCorretiva(id, acaoCorretiva);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletarAcaoCorretiva(@PathVariable Long id) {
        String response = acaoCorretivaService.deleteAcaoCorretiva(id);
        if(response.contains("não encontrado")){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

}
