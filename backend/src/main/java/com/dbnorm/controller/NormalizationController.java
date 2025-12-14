package com.dbnorm.controller;

import com.dbnorm.dto.DetectResponse;

import com.dbnorm.dto.NormalizeResponse;
import com.dbnorm.dto.SchemaRequest;
import com.dbnorm.service.NormalizationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // during development; tighten in production
public class NormalizationController {

    private final NormalizationService service;

    public NormalizationController(NormalizationService service) {
        this.service = service;
    }

    @PostMapping("/nf/detect")
    public ResponseEntity<DetectResponse> detect(@Valid @RequestBody SchemaRequest request) {
        if (request.getAttributes() == null || request.getAttributes().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        if (request.getPrimaryKey() == null || request.getPrimaryKey().isEmpty()) {
            // default to first attribute if frontend didn't provide a primary key
            request.setPrimaryKey(java.util.List.of(request.getAttributes().get(0)));
        }
        return ResponseEntity.ok(service.detect(request));
    }
    
    

    @PostMapping("/nf/normalize")
    public ResponseEntity<NormalizeResponse> normalize(@Valid @RequestBody SchemaRequest request,
                                                       @RequestParam(name = "target", defaultValue = "3NF") String target) {
        if (request.getAttributes() == null || request.getAttributes().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        if (request.getPrimaryKey() == null || request.getPrimaryKey().isEmpty()) {
            request.setPrimaryKey(java.util.List.of(request.getAttributes().get(0)));
        }
        return ResponseEntity.ok(service.normalize(request, target));
    }
}
