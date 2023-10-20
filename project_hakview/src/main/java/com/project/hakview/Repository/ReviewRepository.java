package com.project.hakview.Repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.project.hakview.entity.Article;
import com.project.hakview.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Long>, ReviewRepositoryCustom {
	
	List<Review> findAllByArticleOrderByCreatedAtDesc(Article article);

	Page<Review> findByTitleContaining(String keyword, Pageable pageable);
	
	Page<Review> findByAuthorNicknameContaining(String nickname, Pageable pageable);
	
	Page<Review> findByTitleContainingOrBodyContaining(String titlekeyword, String bodykeyword,Pageable pageable);
}
