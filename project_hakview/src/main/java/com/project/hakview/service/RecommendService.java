package com.project.hakview.service;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.hakview.Repository.AC_UserRepository;
import com.project.hakview.Repository.ArticleRepository;
import com.project.hakview.Repository.RecommendRepository;
import com.project.hakview.config.SecurityUtil;
import com.project.hakview.dto.RecommendDto;
import com.project.hakview.entity.AC_User;
import com.project.hakview.entity.Article;
import com.project.hakview.entity.Recommend;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RecommendService {
	private final ArticleRepository articleRepository;
	private final AC_UserRepository ac_userRepository;
	private final RecommendRepository recommendRepository;
	
	public RecommendDto allRecommend(Long serial) {
		Article article = articleRepository.findById(serial).orElseThrow(() -> new RuntimeException("글이 없습니다."));
		List<Recommend> recommends = recommendRepository.findAllByArticle(article);
		int size = recommends.size();
		if (size == 0) {
			return RecommendDto.noOne();
		}
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication == null || authentication.getPrincipal() == "anonymousUser") {
			return new RecommendDto(size, false);
		} else {
			AC_User ac_user = ac_userRepository.findById(Long.parseLong(authentication.getName())).orElseThrow();
			boolean result = recommends.stream().anyMatch(recommend -> recommend.getAc_user().equals(ac_user));
			return new RecommendDto(size, result);
		}
	}
	
	@Transactional
	   public void createRecommend(Long serial) {
	       AC_User ac_user = ac_userRepository.findById(
	                           SecurityUtil.getCurrentMemberId())
	               .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다."));
	       Article article = articleRepository.findById(serial).orElseThrow(() -> new RuntimeException("글이 없습니다."));

	       if (recommendRepository.existsByAC_UserSerial(ac_user.getSerial()) &&
	           recommendRepository.existsByArticleSerial(article.getSerial())) {
	           throw new RuntimeException("추천은 한개만 가능");
	       }
	       Recommend recommend = new Recommend(ac_user, article);
	       recommendRepository.save(recommend);
	   }
	
	@Transactional
	public void removeRecommend(Long serial) {
		AC_User ac_user = ac_userRepository.findById(
							SecurityUtil.getCurrentMemberId())
				.orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다."));
		Article article = articleRepository.findById(serial).orElseThrow(() -> new RuntimeException("글이 없습니다."));
		Recommend recommend = recommendRepository.findAllByArticle(article)
				.stream()
				.filter(r -> r.getAc_user().equals(ac_user))
				.findFirst()
				.orElseThrow(() -> new RuntimeException("추천이 없습니다."));
		
		recommendRepository.delete(recommend);
				
	}
}
