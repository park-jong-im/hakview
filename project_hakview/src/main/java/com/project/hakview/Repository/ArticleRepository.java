package com.project.hakview.Repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.project.hakview.entity.Article;

public interface ArticleRepository extends JpaRepository<Article, Long>, ArticleRepositoryCustom {
	// 검색
	Page<Article> findByTitleContaining(String keyword, Pageable pageable);
	// 닉네임검색
	Page<Article> findByAuthorNicknameContaining(String nickname, Pageable pageable);
	// 타이틀,바디 검색
	Page<Article> findByTitleContainingOrBodyContaining(String titlekeyword, String bodykeyword, Pageable pageable);
	
	//태그로 검색
	Page<Article> findByTag1(String tag1, Pageable pageable);
	Page<Article> findByTag2(String tag2, Pageable pageable);
	Page<Article> findByTag3(String tag3, Pageable pageable);
}
