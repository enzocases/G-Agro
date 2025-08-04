package com.gagro.backend.Service;

import com.gagro.backend.Models.Colheita;
import com.gagro.backend.repository.ColheitaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ColheitaService {

    @Autowired
    private ColheitaRepository colheitaRepository;

    public List<Colheita> getAllColheitas(){
        return colheitaRepository.findAll();
    }

    public Optional<Colheita> getColheitaById(Long id){
        return colheitaRepository.findById(id);
    }

    public String registerColheita(Colheita colheita){
        colheitaRepository.save(colheita);
        return "Colheita cadastrada com sucesso!";
    }

    public String updateColheita(Long id, Colheita colheita){
        Optional<Colheita> colheitaOptional = colheitaRepository.findById(id);
        if(colheitaOptional.isPresent()){
            colheita.setId(id);
            colheitaRepository.save(colheita);
            return "Colheita atualizada com sucesso!";
        }
        return "Colheita não encontrada!";
    }

    public String deleteColheita(Long id){
        Optional<Colheita> colheitaOptional = colheitaRepository.findById(id);
        if(colheitaOptional.isPresent()){
            colheitaRepository.deleteById(id);
            return "Colheita deletada com sucesso!";
        }
        return "Colheita não encontrada";
    }

}
