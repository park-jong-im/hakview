package com.project.hakview.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.hakview.dto.MessageDto;
import com.project.hakview.dto.PostRecommendsDto;
import com.project.hakview.dto.RecommendsDto;
import com.project.hakview.service.RecommendsService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/recommends")
public class RecommendsController {

	private final RecommendsService recommendsService;

    @GetMapping("/list")
    public ResponseEntity<RecommendsDto> getRecommends(@RequestParam(name = "serial") Long serial) {
        return ResponseEntity.ok(recommendsService.allRecommends(serial));
    }

    @PostMapping("/")
    public ResponseEntity<MessageDto> postRecommends(@RequestBody PostRecommendsDto dto) {
        recommendsService.createRecommends(dto.getSerial());
        return ResponseEntity.ok(new MessageDto("Success"));
    }

    @DeleteMapping("/one")
    public ResponseEntity<MessageDto> deleteRecommends(@RequestParam(name = "serial") Long serial) {
        recommendsService.removeRecommends(serial);
        return ResponseEntity.ok(new MessageDto("Success"));
    }
    
}
