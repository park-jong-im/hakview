package com.project.hakview.Repository;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import com.project.hakview.dto.RageResponseDto;
import com.project.hakview.entity.Review;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

import static com.project.hakview.entity.QReview.review;

@RequiredArgsConstructor
public class ReviewRepositoryImpl implements ReviewRepositoryCustom{
	
	private final JPAQueryFactory queryFactory;
	
	 @Override
	    public Page<RageResponseDto> searchAll(Pageable pageable) {

	        List<Review> content = queryFactory
	                .selectFrom(review)
	                .orderBy(review.serial.desc())
	                .offset(pageable.getOffset())
	                .limit(pageable.getPageSize())
	                .fetch();

	        List<RageResponseDto> pages = content
	                .stream()
	                .map(RageResponseDto::of)
	                .collect(Collectors.toList());

	        int totalSize = queryFactory
	                .selectFrom(review)
	                .fetch()
	                .size();

	        return new PageImpl<>(pages, pageable, totalSize);
	    }
}
