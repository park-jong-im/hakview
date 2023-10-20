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
import com.project.hakview.Repository.RCommentRepository;
import com.project.hakview.Repository.ReviewRepository;
import com.project.hakview.config.SecurityUtil;
import com.project.hakview.dto.RCommentResponseDto;
import com.project.hakview.entity.AC_User;
import com.project.hakview.entity.RComment;
import com.project.hakview.entity.Review;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RCommentService {
    private final ReviewRepository reviewRepository;
    private final AC_UserRepository ac_userRepository;
    private final RCommentRepository rcommentRepository;
    
    public List<RCommentResponseDto> getRComment(Long serial) {
    	Review review = reviewRepository.findById(serial).orElseThrow(() -> new RuntimeException("댓글이 없습니다."));
        List<RComment> comments = rcommentRepository.findAllByReview(review);
        if (comments.isEmpty()) {
            return Collections.emptyList();
        }
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getPrincipal() == "anonymousUser") {
            return comments
                    .stream()
                    .map(comment -> RCommentResponseDto.of(comment, false))
                    .collect(Collectors.toList());
        } else {
        	AC_User ac_user = ac_userRepository.findById(Long.parseLong(authentication.getName())).orElseThrow();
            Map<Boolean, List<RComment>> collect = comments.stream()
                    .collect(
                            Collectors.partitioningBy(
                                    comment -> comment.getAc_user().equals(ac_user)
                            )
                    );
            List<RCommentResponseDto> tCollect = collect.get(true).stream()
                    .map(t -> RCommentResponseDto.of(t, true))
                    .collect(Collectors.toList());
            List<RCommentResponseDto> fCollect = collect.get(false).stream()
                    .map(f -> RCommentResponseDto.of(f, false))
                    .collect(Collectors.toList());

            return Stream
                    .concat(tCollect.stream() ,fCollect.stream())
                    .sorted(Comparator.comparing(RCommentResponseDto::getRcommentSerial))
                    .collect(Collectors.toList());

        }

    }
    
    @Transactional
    public RCommentResponseDto createRComment(Long serial, String text) {
    	AC_User ac_user = ac_userRepository.findById(
                        SecurityUtil.getCurrentMemberId())
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
    	Review review = reviewRepository.findById(serial).orElseThrow(() -> new RuntimeException("댓글이 없습니다."));

        RComment rcomment = RComment.builder()
                .text(text)
                .review(review)
                .ac_user(ac_user)
                .build();

        return RCommentResponseDto.of(rcommentRepository.save(rcomment), true);

    }
    
    @Transactional
    public void removeRComment(Long serial) {
        AC_User ac_user = ac_userRepository.findById(
                        SecurityUtil.getCurrentMemberId())
                .orElseThrow(() -> new RuntimeException("로그인 하십시오"));
        RComment rcomment = rcommentRepository.findById(serial).orElseThrow(() -> new RuntimeException("댓글이 없습니다."));
        if (!rcomment.getAc_user().equals(ac_user)) {
            throw new RuntimeException("작성자와 로그인이 일치하지 않습니다.");
        }
        rcommentRepository.delete(rcomment);
    }
}
