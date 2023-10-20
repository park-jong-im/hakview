package com.project.hakview.service;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.hakview.Repository.AC_UserRepository;
import com.project.hakview.Repository.CommentRepository;
import com.project.hakview.Repository.FreeboardRepository;
import com.project.hakview.config.SecurityUtil;
import com.project.hakview.dto.CommentResponseDto;
import com.project.hakview.entity.AC_User;
import com.project.hakview.entity.MainComment;
import com.project.hakview.entity.Freeboard;


import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CommentService {
	private final FreeboardRepository freeboardRepository;
    private final AC_UserRepository ac_userRepository;
    private final CommentRepository commentRepository;

    public List<CommentResponseDto> getComment(Long serial) {
        Freeboard freeboard = freeboardRepository.findById(serial).orElseThrow(() -> new RuntimeException("댓글이 없습니다."));
        List<MainComment> comments = commentRepository.findAllByFreeboard(freeboard);
        if (comments.isEmpty()) {
            return Collections.emptyList();
        }
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getPrincipal() == "anonymousUser") {
            return comments
                    .stream()
                    .map(comment -> CommentResponseDto.of(comment, false))
                    .collect(Collectors.toList());
        } else {
        	AC_User ac_user = ac_userRepository.findById(Long.parseLong(authentication.getName())).orElseThrow();
            Map<Boolean, List<MainComment>> collect = comments.stream()
                    .collect(
                            Collectors.partitioningBy(
                                    comment -> comment.getAc_user().equals(ac_user)
                            )
                    );
            List<CommentResponseDto> tCollect = collect.get(true).stream()
                    .map(t -> CommentResponseDto.of(t, true))
                    .collect(Collectors.toList());
            List<CommentResponseDto> fCollect = collect.get(false).stream()
                    .map(f -> CommentResponseDto.of(f, false))
                    .collect(Collectors.toList());

            return Stream
                    .concat(tCollect.stream() ,fCollect.stream())
                    .sorted(Comparator.comparing(CommentResponseDto::getCommentSerial))
                    .collect(Collectors.toList());

        }

    }

    @Transactional
    public CommentResponseDto createComment(Long serial, String text) {
    	AC_User ac_user = ac_userRepository.findById(
                        SecurityUtil.getCurrentMemberId())
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
    	Freeboard freeboard = freeboardRepository.findById(serial).orElseThrow(() -> new RuntimeException("댓글이 없습니다."));

        MainComment comment = MainComment.builder()
                .text(text)
                .freeboard(freeboard)
                .ac_user(ac_user)
                .build();

        return CommentResponseDto.of(commentRepository.save(comment), true);

    }

    @Transactional
    public void removeComment(Long serial) {
        AC_User ac_user = ac_userRepository.findById(
                        SecurityUtil.getCurrentMemberId())
                .orElseThrow(() -> new RuntimeException("로그인 하십시오"));
        MainComment comment = commentRepository.findById(serial).orElseThrow(() -> new RuntimeException("댓글이 없습니다."));
        if (!comment.getAc_user().equals(ac_user)) {
            throw new RuntimeException("작성자와 로그인이 일치하지 않습니다.");
        }
        commentRepository.delete(comment);
    }
}
