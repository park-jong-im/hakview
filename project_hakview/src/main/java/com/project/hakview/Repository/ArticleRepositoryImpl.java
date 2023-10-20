package com.project.hakview.Repository;

import static com.project.hakview.entity.QArticle.article;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import com.project.hakview.dto.PageResponseDto;
import com.project.hakview.entity.Article;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
public class ArticleRepositoryImpl implements ArticleRepositoryCustom {
	
	private final JPAQueryFactory queryFactory;
	
	@Override
	public Page<PageResponseDto> searchAll(Pageable pageable) {
		
		List<Article> content = queryFactory
				.selectFrom(article)
				.orderBy(article.serial.desc())
				.offset(pageable.getOffset())
				.limit(pageable.getPageSize())
				.fetch();
		
		List<PageResponseDto> pages = content
				.stream()
				.map(PageResponseDto::of)
				.collect(Collectors.toList());
		
		int totalSize = queryFactory
                .selectFrom(article)
                .fetch()
                .size();
		
		return new PageImpl<>(pages, pageable, totalSize);
	}
}
