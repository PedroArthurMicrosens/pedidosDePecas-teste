package com.lacamentopeca.pedidosDePecas.services;

import com.lacamentopeca.pedidosDePecas.domain.page.Page;
import com.lacamentopeca.pedidosDePecas.domain.repositories.PageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PageService {

    private final PageRepository pageRepository;

    @Autowired
    public PageService(PageRepository pageRepository) {
        this.pageRepository = pageRepository;
    }

    public Page getPageById(Integer id) {
        Optional<Page> pageOptional = pageRepository.findById(id);
        return pageOptional.orElse(null);
    }

    public List<Page> getAllPages() {
        return pageRepository.findAll();
    }

    // Outros métodos do serviço podem ser adicionados conforme necessário, como salvar página, excluir página, etc.
}

