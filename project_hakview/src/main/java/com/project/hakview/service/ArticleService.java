package com.project.hakview.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.hakview.Repository.AC_UserRepository;
import com.project.hakview.Repository.ArticleRepository;
import com.project.hakview.config.SecurityUtil;
import com.project.hakview.dto.ArticleResponseDto;
import com.project.hakview.dto.PageResponseDto;
import com.project.hakview.entity.AC_User;
import com.project.hakview.entity.Article;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ArticleService {
    private final ArticleRepository articleRepository;
    private final AC_UserRepository ac_userRepository;
    
    // 특정 글 조회 메서드
    public ArticleResponseDto oneArticle(Long serial) {
    	// 글을 조회하고, 현재 로그인한 사용자와 글 작성자를 비교하여 작성자 여부를 확인
    	Article article = articleRepository.findById(serial).orElseThrow(() -> new RuntimeException("글이 없습니다."));
    	Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    	if (authentication == null || authentication.getPrincipal() == "anonymousUser") {
    		// 로그인하지 않은 경우 작성자 여부를 false로 설정
    		return ArticleResponseDto.of(article, false);
    	} else {
    		// 로그인한 경우 작성자 여부를 판단하여 반환
    		AC_User ac_user = ac_userRepository.findById(Long.parseLong(authentication.getName())).orElseThrow();
    		boolean result = article.getAc_user().equals(ac_user);
    		return ArticleResponseDto.of(article, result);
    	}
    }
    
//    public List<PageResponseDto> allArticle() {
//        List<Article> articles = articleRepository.findAll();
//        return articles
//                .stream()
//                .map(PageResponseDto::of)
//                .collect(Collectors.toList());
//    }
    
    // 페이지별 글 조회 메서드
    public Page<PageResponseDto> pageArticle(int pageNum) {
    	// 페이지 번호를 이용하여 20개의 글을 조회
    	return articleRepository.searchAll(PageRequest.of(pageNum -1, 20));
    }
    
    // 제목으로 글 검색 메서드
    public Page<Article> search(String keyword, Pageable pageable) {
    	return articleRepository.findByTitleContaining(keyword, pageable);
    }
    
    // 작성자 닉네임으로 글 검색 메서드
    public Page<Article> searchByNickname(String nickname, Pageable pageable) {
    	return articleRepository.findByAuthorNicknameContaining(nickname, pageable);
    }
    
    // 제목 또는 내용으로 글 검색 메서드
    public Page<Article> searchByTitleOrBody(String titlekeyword, String bodykeyword, Pageable pageable) {
    	return articleRepository.findByTitleContainingOrBodyContaining(titlekeyword, bodykeyword, pageable);
    }
    
    // 태그1 검색 메서드
    public Page<Article> searchByTag1(String tag1, Pageable pageable) {
    	return articleRepository.findByTag1(tag1, pageable);
    }
    
    // 태그2 검색 메서드
    public Page<Article> searchByTag2(String tag2, Pageable pageable) {
    	return articleRepository.findByTag2(tag2, pageable);
    }
    
    // 태그3 검색 메서드
    public Page<Article> searchByTag3(String tag3, Pageable pageable) {
    	return articleRepository.findByTag3(tag3, pageable);
    }
    
    // 글 작성 메서드
    @Transactional
    public ArticleResponseDto postArticle(String title, String body, String tag1, String tag2, String tag3, String ac_name, String ac_address, String ac_phone) {
    	AC_User ac_user = isAC_UserCurrent();
    	AC_User author = ac_user;
    	Article article = Article.createArticle(title, body, ac_user, author, tag1, tag2, tag3, ac_name, ac_address, ac_phone);
    	return ArticleResponseDto.of(articleRepository.save(article), true);
    }
    
    // 글 수정 메서드
    @Transactional
    public ArticleResponseDto changeArticle(Long serial, String title, String body, String tag1, String tag2, String tag3, String ac_name, String ac_address, String ac_phone) {
    	// 글 작성자와 로그인한 사용자가 일치하는지 확인하고 수정을 허용
    	Article article = authorizationArticleWriter(serial);
    	return ArticleResponseDto.of(articleRepository.save(Article.changeArticle(article, title, body, tag1, tag2, tag3, ac_name, ac_address, ac_phone)), true);
    }
    
    // 글 삭제 메서드
    @Transactional
    public void deleteArticle(Long serial) {
    	// 글 작성자와 로그인한 사용자가 일치하는지 확인하고 삭제를 허용
    	Article article = authorizationArticleWriter(serial);
    	articleRepository.delete(article);
    }
    
    // 현재 로그인한 사용자 정보 조회 메서드
    public AC_User isAC_UserCurrent() {
    	return ac_userRepository.findById(SecurityUtil.getCurrentMemberId())
    			.orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다."));
    }
    
    // 글 작성자 권한 확인 메서드
    public Article authorizationArticleWriter(Long serial) {
    	AC_User ac_user = isAC_UserCurrent();
    	Article article = articleRepository.findById(serial).orElseThrow(() -> new RuntimeException("글이 없습니다."));
    	if (!article.getAc_user().equals(ac_user)) {
    		throw new RuntimeException("로그인한 유저와 작성 유저가 같지 않습니다.");
    	}
    	return article;
    }
}
