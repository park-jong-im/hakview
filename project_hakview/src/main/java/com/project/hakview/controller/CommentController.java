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

import com.project.hakview.dto.CommentRequestDto;
import com.project.hakview.dto.CommentResponseDto;
import com.project.hakview.dto.MessageDto;
import com.project.hakview.service.CommentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/comment")
public class CommentController {
	private final CommentService commentService;

    @GetMapping("/list")
    public ResponseEntity<List<CommentResponseDto>> getComments(@RequestParam(name = "serial") Long serial) {
        return ResponseEntity.ok(commentService.getComment(serial));
    }

    @PostMapping("/")
    public ResponseEntity<CommentResponseDto> postComment(@RequestBody CommentRequestDto request) {
        return ResponseEntity.ok(commentService.createComment(request.getFreeboardSerial(), request.getBody()));
    }

    @DeleteMapping("/one")
    public ResponseEntity<MessageDto> deleteComment(@RequestParam(name = "serial") Long serial) {
        commentService.removeComment(serial);
        return ResponseEntity.ok(new MessageDto("Success"));
    }
}
