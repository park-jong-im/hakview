package com.project.hakview.service;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.hakview.Repository.AC_UserRepository;
import com.project.hakview.Repository.RRecommendRepository;
import com.project.hakview.Repository.ReviewRepository;
import com.project.hakview.config.SecurityUtil;
import com.project.hakview.dto.RRecommendDto;
import com.project.hakview.entity.AC_User;
import com.project.hakview.entity.RRecommend;
import com.project.hakview.entity.Review;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RRecommendService {
    private final ReviewRepository reviewRepository;
    private final AC_UserRepository ac_userRepository;
    private final RRecommendRepository rrecommendRepository;
    
    public RRecommendDto allRRecommend(Long serial) {
    	Review review = reviewRepository.findById(serial).orElseThrow(() -> new RuntimeException("글이 없습니다."));
        List<RRecommend> rrecommend = rrecommendRepository.findAllByReview(review);
        int size = rrecommend.size();
        if (size == 0) {
            return RRecommendDto.noOne();
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || authentication.getPrincipal() == "anonymousUser") {
            return new RRecommendDto(size, false);
        } else {
        	AC_User ac_user = ac_userRepository.findById(Long.parseLong(authentication.getName())).orElseThrow();
            boolean result = rrecommend.stream().anyMatch(recommend -> recommend.getAc_user().equals(ac_user));
            return new RRecommendDto(size, result);
        }
    }
    
    @Transactional
	   public void createRRecommend(Long serial) {
	       AC_User ac_user = ac_userRepository.findById(
	                           SecurityUtil.getCurrentMemberId())
	               .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다."));
	       Review review = reviewRepository.findById(serial).orElseThrow(() -> new RuntimeException("글이 없습니다."));

	       if (rrecommendRepository.existsByAC_UserSerial(ac_user.getSerial()) &&
	           rrecommendRepository.existsByReviewSerial(review.getSerial())) {
	           throw new RuntimeException("추천은 한개만 가능");
	       }
	       RRecommend rrecommend = new RRecommend(ac_user, review);
	       rrecommendRepository.save(rrecommend);
	   }
    
    @Transactional
    public void removeRRecommend(Long serial) {
        AC_User ac_user = ac_userRepository.findById(
                        SecurityUtil.getCurrentMemberId())
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
        Review review = reviewRepository.findById(serial).orElseThrow(() -> new RuntimeException("글이 없습니다."));
        RRecommend rrecommend = rrecommendRepository.findAllByReview(review)
                .stream()
                .filter(r -> r.getAc_user().equals(ac_user))
                .findFirst()
                .orElseThrow(() ->  new RuntimeException("추천이 없습니다."));

        rrecommendRepository.delete(rrecommend);
    }
}
