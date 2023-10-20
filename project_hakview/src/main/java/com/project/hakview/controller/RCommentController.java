package com.project.hakview.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.hakview.dto.MessageDto;
import com.project.hakview.dto.RCommentRequestDto;
import com.project.hakview.dto.RCommentResponseDto;
import com.project.hakview.service.RCommentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/rcomment")
public class RCommentController {
	private final RCommentService rcommentService;
	
    @GetMapping("/list")
    public ResponseEntity<List<RCommentResponseDto>> getRComments(@RequestParam(name = "serial") Long serial) {
        return ResponseEntity.ok(rcommentService.getRComment(serial));
    }

    @PostMapping("/")
    public ResponseEntity<RCommentResponseDto> postRComment(@RequestBody RCommentRequestDto request) {
        return ResponseEntity.ok(rcommentService.createRComment(request.getReviewSerial(), request.getBody()));
    }

    @DeleteMapping("/one")
    public ResponseEntity<MessageDto> deleteRComment(@RequestParam(name = "serial") Long serial) {
        rcommentService.removeRComment(serial);
        return ResponseEntity.ok(new MessageDto("Success"));
    }
}
