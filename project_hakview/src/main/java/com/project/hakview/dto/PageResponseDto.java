package com.project.hakview.dto;

import java.time.format.DateTimeFormatter;

import com.project.hakview.entity.Article;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PageResponseDto {
	private Long articleSerial;
	private String articleTitle;
	private String ac_userNickname;
	private String ac_address;
	private String ac_name;
	private String tag1;
	private String tag2;
	private String tag3;
	private String body;
	private String createdAt;
	
	public static PageResponseDto of(Article article) {
		return PageResponseDto.builder()
				.articleSerial(article.getSerial())
				.articleTitle(article.getTitle())
				.ac_userNickname(article.getAc_user().getNickname())
				.ac_address(article.getAc_address())
				.ac_name(article.getAc_name())
				.tag1(article.getTag1())
				.tag2(article.getTag2())
				.tag3(article.getTag3())
				.body(article.getBody())
				.createdAt(article.getCreateAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
				.build();
	}
}
