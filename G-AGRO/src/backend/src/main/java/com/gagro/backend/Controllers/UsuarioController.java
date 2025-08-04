package com.gagro.backend.Controllers;

import com.gagro.backend.Models.Usuario;
import com.gagro.backend.Service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public List<Usuario> getAllUsers() {
        return usuarioService.getAllUsers(); // Use a instância corretamente
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> obterUsuarioPorId(@PathVariable Long id) {
        Usuario usuario = usuarioService.getUserById(id);
        if (usuario == null) {
            return ResponseEntity.notFound().build(); // Retorna 404 se não encontrado
        }
        return ResponseEntity.ok(usuario); // Retorna 200 se encontrado
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Usuario> obterPorEmail(@PathVariable String email) {
        Usuario usuario = usuarioService.getUserByEmail(email);
        if (usuario == null) {
            return ResponseEntity.notFound().build(); // Retorna 404 se não encontrado
        }
        return ResponseEntity.ok(usuario); // Retorna 200 se encontrado
    }

    @PostMapping("/cadastro")
    public ResponseEntity<String> cadastrarUsuario(@RequestBody Usuario usuario) {
        String response = usuarioService.signUpUser(usuario);
        if (response.contains("já existe")) {
            return ResponseEntity.badRequest().body(response);
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Usuario usuario) {
        String response = usuarioService.loginUser(usuario);
        if (response.contains("incorretos")) {
            return ResponseEntity.status(401).body(response);
        }
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> atualizarUsuario(@PathVariable Long id, @RequestBody Usuario usuarioAtualizado) {
        String response = usuarioService.updateUser(id, usuarioAtualizado);
        if (response.contains("não encontrado")) {
            return ResponseEntity.badRequest().body(response);
        }
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirUsuario(@PathVariable Long id) {
        String response = usuarioService.deleteUser(id);
        if(response.contains("não encontrado")){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build(); // Retorna 204 sem conteúdo
    }
}