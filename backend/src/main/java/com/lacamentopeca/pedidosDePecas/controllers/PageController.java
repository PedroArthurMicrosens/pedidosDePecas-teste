package com.lacamentopeca.pedidosDePecas.controllers;

import com.lacamentopeca.pedidosDePecas.domain.page.Page;
import com.lacamentopeca.pedidosDePecas.domain.page.RequestPage;
import com.lacamentopeca.pedidosDePecas.domain.repositories.PageRepository;
import com.lacamentopeca.pedidosDePecas.services.PageService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/page")
public class PageController {
    @Autowired
    private PageService pageService;
    @Autowired
    private PageRepository repository;

    @CrossOrigin(origins = "*")
    @GetMapping("/{id}")
    public Page getPageById(@PathVariable Integer id) {
        return pageService.getPageById(id);
    }
    @CrossOrigin(origins = "*")
    @PostMapping()
    public ResponseEntity<Page> createPage(@RequestBody @Valid RequestPage data) {
        Page page = new Page(data);
        repository.save(page);
        return ResponseEntity.ok(page);
    }

    @CrossOrigin(origins = "*")
    @PutMapping("{id}")
    @Transactional
    public ResponseEntity updatePage(@RequestBody @Valid RequestPage data, @PathVariable Integer id) {
        Optional<Page> optionalPage = repository.findById(id);
        if (optionalPage.isPresent()) {
            Page page = optionalPage.get();
            page.setAtt_page(data.att_page());
            return ResponseEntity.ok(page);
        } else {
            throw new EntityNotFoundException();
        }
    }

}
