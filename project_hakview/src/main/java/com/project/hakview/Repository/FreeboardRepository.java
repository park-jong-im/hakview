package com.project.hakview.Repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.project.hakview.entity.Freeboard;

public interface FreeboardRepository extends JpaRepository<Freeboard, Long>, FreeboardRepositoryCustom {
	
	Page<Freeboard> findByTitleContaining(String keyword, Pageable pageable);
	
	Page<Freeboard> findByAuthorNicknameContaining(String nickname, Pageable pageable);
	
	Page<Freeboard> findByTitleContainingOrBodyContaining(String titlekeyword, String bodykeyword,Pageable pageable);
}
