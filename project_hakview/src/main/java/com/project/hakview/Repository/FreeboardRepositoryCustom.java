package com.project.hakview.Repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.project.hakview.dto.FageResponseDto;

public interface FreeboardRepositoryCustom {
	Page<FageResponseDto> searchAll(Pageable pagealbe);
}
