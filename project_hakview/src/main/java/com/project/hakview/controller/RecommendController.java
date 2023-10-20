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
import com.project.hakview.dto.PostRecommendDto;
import com.project.hakview.dto.RecommendDto;
import com.project.hakview.service.RecommendService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/recommend")
public class RecommendController {
	private final RecommendService recommendService;
	
	@GetMapping("/list")
	public ResponseEntity<RecommendDto> getRecommends(@RequestParam(name = "serial") Long serial) {
		return ResponseEntity.ok(recommendService.allRecommend(serial));
	}
	
	@PostMapping("/")
	public ResponseEntity<MessageDto> postRecommend(@RequestBody PostRecommendDto dto) {
		recommendService.createRecommend(dto.getSerial());
		return ResponseEntity.ok(new MessageDto("Success"));
	}
	
	@DeleteMapping("/one")
	public ResponseEntity<MessageDto> deleteRecommend(@RequestParam(name = "serial") Long serial) {
		recommendService.removeRecommend(serial);
		return ResponseEntity.ok(new MessageDto("Success"));
	}
}
