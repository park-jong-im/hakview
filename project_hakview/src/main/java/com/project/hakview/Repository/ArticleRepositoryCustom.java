package com.project.hakview.Repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.project.hakview.dto.PageResponseDto;

public interface ArticleRepositoryCustom {
	Page<PageResponseDto> searchAll(Pageable pageable);
}
