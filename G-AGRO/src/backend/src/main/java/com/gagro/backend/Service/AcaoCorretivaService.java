package com.gagro.backend.Service;

import com.gagro.backend.Models.AcaoCorretiva;
import com.gagro.backend.repository.AcaoCorretivaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AcaoCorretivaService {

    @Autowired
    AcaoCorretivaRepository acaoCorretivaRepository;

    public List<AcaoCorretiva> getAllAcoes() {
        return acaoCorretivaRepository.findAll();
    }

    public Optional<AcaoCorretiva> getAcaoCorretivaById(Long id) {
        return acaoCorretivaRepository.findById(id);
    }

    public List<AcaoCorretiva> getAcoesCorretivasPorColheita(Long idColheita) {
        return acaoCorretivaRepository.findByColheitaId(idColheita);
    }

    public String registerAcaoCorretiva(AcaoCorretiva acaoCorretiva) {
        acaoCorretivaRepository.save(acaoCorretiva);
        return "Registro cadastrado com sucesso";
    }

    public String updateAcaoCorretiva(Long id, AcaoCorretiva acaoCorretiva) {
        Optional<AcaoCorretiva> acaoCorretivaOptional = acaoCorretivaRepository.findById(id);
        if (acaoCorretivaOptional.isPresent()) {
            acaoCorretiva.setId(id);
            acaoCorretivaRepository.save(acaoCorretiva);
            return "Registro atualizado com sucesso";
        }
        return "Registro não encontrado";
    }

    public String deleteAcaoCorretiva(Long id) {
        Optional<AcaoCorretiva> acaoCorretivaOptional = acaoCorretivaRepository.findById(id);
        if (acaoCorretivaOptional.isPresent()) {
            acaoCorretivaRepository.deleteById(id);
            return "Registro deletado com sucesso";
        }
        return "Registro não encontrado!";
    }
}
