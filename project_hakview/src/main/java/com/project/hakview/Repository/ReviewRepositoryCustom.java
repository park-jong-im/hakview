package com.project.hakview.Repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.project.hakview.dto.RageResponseDto;

public interface ReviewRepositoryCustom {
	Page<RageResponseDto> searchAll(Pageable pageable);
}
