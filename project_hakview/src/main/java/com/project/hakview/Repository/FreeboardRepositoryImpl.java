package com.project.hakview.Repository;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import com.project.hakview.dto.FageResponseDto;
import com.project.hakview.entity.Freeboard;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

import static com.project.hakview.entity.QFreeboard.freeboard;

@RequiredArgsConstructor
public class FreeboardRepositoryImpl implements FreeboardRepositoryCustom {

	private final JPAQueryFactory queryFactory;
	
	@Override
	public Page<FageResponseDto> searchAll(Pageable pageable) {
		
		List<Freeboard> content = queryFactory
				.selectFrom(freeboard)
				.orderBy(freeboard.serial.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
		
        List<FageResponseDto> pages = content
                .stream()
                .map(FageResponseDto::of)
                .collect(Collectors.toList());

        int totalSize = queryFactory
                .selectFrom(freeboard)
                .fetch()
                .size();

        return new PageImpl<>(pages, pageable, totalSize);
	}
}
