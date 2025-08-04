package com.gagro.backend.Service;

import com.gagro.backend.Models.Terreno;
import com.gagro.backend.repository.TerrenoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TerrenoService {

    @Autowired
    private TerrenoRepository terrenoRepository;

    public List<Terreno> getAllTerrenos(){
        return terrenoRepository.findAll();
    }

    public Optional<Terreno> getTerrenoById(Long id){
        return terrenoRepository.findById(id);
    }

    public String createTerreno(Terreno terreno){
        Terreno terrenoExistente = terrenoRepository.findByNome(terreno.getNome());
        if(terrenoExistente != null){
            return "Nome de terreno já existe!";
        }
        terrenoRepository.save(terreno);
        return "Terreno cadastrado com sucesso";
    }

    public String updateTerreno(Long id, Terreno terrenoAtualizado) {
    Optional<Terreno> terrenoExistente = terrenoRepository.findById(id);
    if (terrenoExistente.isPresent()) {
        Terreno terrenoNome = terrenoRepository.findByNome(terrenoAtualizado.getNome());
        if (terrenoNome != null && !terrenoNome.getId().equals(id)) {
            return "Nome de Terreno já existente";
        }
        terrenoAtualizado.setId(id); 
        terrenoRepository.save(terrenoAtualizado); 
        return "Terreno atualizado com sucesso";
    }
    return "Terreno não encontrado!";
}


    public String deleteTerreno(Long id){
        Optional<Terreno> terrenoExistente = terrenoRepository.findById(id);
        if(terrenoExistente.isPresent()){
            terrenoRepository.deleteById(id);
            return "Terreno removido com sucesso";
        }
        return "Erro ao remover o terreno";
    }

}