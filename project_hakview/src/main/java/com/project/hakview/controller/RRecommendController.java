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
import com.project.hakview.dto.PostRRecommendDto;
import com.project.hakview.dto.RRecommendDto;
import com.project.hakview.service.RRecommendService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/rrecommend")
public class RRecommendController {

	private final RRecommendService rrecommendService;
	
    @GetMapping("/list")
    public ResponseEntity<RRecommendDto> getRRecommend(@RequestParam(name = "serial") Long serial) {
        return ResponseEntity.ok(rrecommendService.allRRecommend(serial));
    }
    
    @PostMapping("/")
    public ResponseEntity<MessageDto> postRRecommend(@RequestBody PostRRecommendDto dto) {
        rrecommendService.createRRecommend(dto.getSerial());
        return ResponseEntity.ok(new MessageDto("Success"));
    }

    @DeleteMapping("/one")
    public ResponseEntity<MessageDto> deleteRRecommend(@RequestParam(name = "serial") Long serial) {
        rrecommendService.removeRRecommend(serial);
        return ResponseEntity.ok(new MessageDto("Success"));
    }
}
