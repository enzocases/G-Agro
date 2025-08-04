package com.gagro.backend.Models;

import jakarta.persistence.*;

// import java.util.regex.Matcher;
// import java.util.regex.Pattern;

@Entity
@Table(name = "usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String email;
    private String senha;
    @Column(name = "cargo")
    private String cargo;
    
    public Usuario() {

    }

    public Usuario(String nome, String email, String senha, String cargo) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.cargo = cargo;
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getRole() {
        return cargo;
    }

    public void setRole(String role) {
        this.cargo = role;
    }

    @Override
    public String toString() {
        return "Usuario{" +
                "id=" + id +
                ", name='" + nome + '\'' +
                ", email='" + email + '\'' +
                ", role='" + cargo + '\'' +
                '}';
    }
}