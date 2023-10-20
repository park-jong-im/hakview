package com.project.hakview.service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.hakview.Repository.AC_UserRepository;
import com.project.hakview.Repository.ArticleRepository;
import com.project.hakview.Repository.ReviewRepository;
import com.project.hakview.config.SecurityUtil;
import com.project.hakview.dto.RageResponseDto;
import com.project.hakview.dto.ReviewResponseDto;
import com.project.hakview.entity.AC_User;
import com.project.hakview.entity.Article;
import com.project.hakview.entity.Review;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ReviewService {
	private final ReviewRepository reviewRepository;
	private final AC_UserRepository ac_userRepository;
	private final ArticleRepository articleRepository;
	
	public List<ReviewResponseDto> getReview(Long reviewSerial) {
	       Optional<Article> articleOptional = articleRepository.findById(reviewSerial);
	       Article article = articleOptional.orElseThrow(() -> new RuntimeException("리뷰가 없습니다."));

	       List<Review> reviews = reviewRepository.findAllByArticleOrderByCreatedAtDesc(article);

	       if (reviews.isEmpty()) {
	           return Collections.emptyList();
	       }

	       List<ReviewResponseDto> responseDtos = reviews.stream()
	               .map(review -> ReviewResponseDto.of(review, false))
	               .collect(Collectors.toList());

	       return responseDtos;
	   }
	
	public ReviewResponseDto oneReview(Long serial) {
		Review review = reviewRepository.findById(serial).orElseThrow(() -> new RuntimeException("글이 없습니다."));
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getPrincipal() == "anonymousUser") {
        	return ReviewResponseDto.of(review, false);
        } else {
        	AC_User ac_user = ac_userRepository.findById(Long.parseLong(authentication.getName())).orElseThrow();
        	boolean result = review.getAc_user().equals(ac_user);
            return ReviewResponseDto.of(review, result);
        }
	}
//	public List<RageResponseDto> allReview() {
//		List<Review> reviews = reviewRepository.findAll();
//		return reviews
//				.stream()
//				.map(RageResponseDto::of)
//				.collect(Collectors.toList());
//	}
//	
	public Page<RageResponseDto> pageReview(int pageNum) {
		return reviewRepository.searchAll(PageRequest.of(pageNum -1 , 10));
	}
	
		//타이틀 검색파트
	   public Page<Review> search(String keyword, Pageable pageable) {
	   	return reviewRepository.findByTitleContaining(keyword, pageable);
	   }
	   
	   // 닉네임 검색파트
	   public Page<Review> searchByNickname(String nickname, Pageable pageable) {
	   	return reviewRepository.findByAuthorNicknameContaining(nickname, pageable);
	   }
	   
	   // 타이틀,바디 검색파트
		public Page<Review> searchByTitleOrBody(String titlekeyword, String bodykeyword, Pageable pageable) {
			return reviewRepository.findByTitleContainingOrBodyContaining(titlekeyword, bodykeyword, pageable);
		}
	
	@Transactional
    public ReviewResponseDto postReview(String title, String body, double starpoint1, double starpoint2, double starpoint3, double starpoint4, double starpoint5,
    		String tag1, String tag2, String tag3, String ac_title, String ac_name, Long serial) {
    	AC_User ac_user = isAC_UserCurrent();
    	Article article = isArticleCurrent(serial);
    	AC_User author = ac_user;
    	Review review = Review.createReview(title, body, starpoint1, starpoint2, starpoint3, starpoint4, starpoint5, tag1, tag2, tag3, ac_title, ac_name , ac_user, article, author);
    	return ReviewResponseDto.of(reviewRepository.save(review), true);
    }
	
	@Transactional
    public ReviewResponseDto changeReview(Long serial, String title, String body, double starpoint1, double starpoint2, double starpoint3, double starpoint4, double starpoint5,
    		String tag1, String tag2, String tag3) {
		Review review = authorizationReviewWriter(serial);
        return ReviewResponseDto.of(reviewRepository.save(Review.changeReview(review, title, body, starpoint1, starpoint2, starpoint3, starpoint4, starpoint5,
        		tag1, tag2, tag3)), true);
    }

    @Transactional
    public void deleteReview(Long serial) {
    	Review review = authorizationReviewWriter(serial);
        reviewRepository.delete(review);
    }

    public Article isArticleCurrent(Long serial) {
    	return articleRepository.findById(serial).orElseThrow(() -> new RuntimeException("학원 정보가 없습니다."));
    }
    
	public AC_User isAC_UserCurrent() {
		return ac_userRepository.findById(SecurityUtil.getCurrentMemberId())
				.orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
	}

    public Review authorizationReviewWriter(Long serial) {
    	AC_User ac_user = isAC_UserCurrent();
    	Review review = reviewRepository.findById(serial).orElseThrow(() -> new RuntimeException("글이 없습니다."));
        if (!review.getAc_user().equals(ac_user)) {
            throw new RuntimeException("로그인한 유저와 작성 유저가 같지 않습니다.");
        }
        return review;
    }

	
}
