package com.gagro.backend.Service;

import com.gagro.backend.Models.Usuario;
import com.gagro.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

@Service
public class UsuarioService {

    private static final String EMAIL_REGEX = "^[A-Za-z0-9+_.-]+@(.+)$";
    private static final Pattern EMAIL_PATTERN = Pattern.compile(EMAIL_REGEX);

    @Autowired
    private UsuarioRepository userRepository;

    public List<Usuario> getAllUsers() {
        return userRepository.findAll();
    }

    public Usuario getUserById(Long id) {
        return userRepository.findById(id).orElse(null); // Busca o usuário pelo ID
    }

    public Usuario getUserByEmail(String email) {
        Usuario usuario = userRepository.findByEmail(email);
        return usuario; // Retorna null se não encontrar
    }

    private boolean isEmailValid(String email){
        return EMAIL_PATTERN.matcher(email).matches();
    }

    public String signUpUser(Usuario usuario) {
        if(!isEmailValid(usuario.getEmail())){
            return "Email inválido";
        }

        Usuario usuarioExistente = userRepository.findByEmail(usuario.getEmail());
        if (usuarioExistente != null) {
            return "Usuário já existe"; 
        }
        userRepository.save(usuario);
        return "Usuário cadastrado com sucesso!";
    }

    public String loginUser(Usuario usuario) {
        if(!isEmailValid(usuario.getEmail())){
            return "Email inválido";
        }
        Usuario usuarioExistente = userRepository.findByEmail(usuario.getEmail());
        if(usuarioExistente == null){
            return "Usuário não encontrado!";
        }

        if(!usuario.getSenha().equals(usuarioExistente.getSenha()) || !usuario.getRole().equals(usuarioExistente.getRole())){
            return "Email, senha ou cargo incorretos!";
        }

        return "Login bem-sucedido"; // Exemplo de retorno
    }

    public String updateUser(Long id, Usuario usuarioAtualizado) {

        if(!isEmailValid(usuarioAtualizado.getEmail())){
            return "Email inválido";
        }
        
        Optional<Usuario> optionalUsuario = userRepository.findById(id);
        if (optionalUsuario.isPresent()) {
            Usuario usuarioExistente = userRepository.findByEmail(usuarioAtualizado.getEmail());
            if(usuarioExistente != null && !usuarioExistente.getId().equals(id)){
                return "Email já está em uso";
            }

            usuarioAtualizado.setId(id);
            userRepository.save(usuarioAtualizado);
            return "Usuário atualizado com sucesso!";
        }
        return "Usuário não encontrado";
    }

    public String deleteUser(Long id) {
        Optional<Usuario> optionalUsuario = userRepository.findById(id);
        if(optionalUsuario.isPresent()){
            userRepository.deleteById(id);
            return "Usuário excluído com sucesso!";
        }
        return "Usuário não encontrado!";
    }
}