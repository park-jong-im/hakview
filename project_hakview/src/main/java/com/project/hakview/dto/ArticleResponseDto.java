package com.project.hakview.dto;

import java.time.format.DateTimeFormatter;

import com.project.hakview.entity.Article;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ArticleResponseDto {
	private Long articleSerial;
	private String ac_userNickname;
	private String articleTitle;
	private String articleBody;
	private String tag1;
	private String tag2;
	private String tag3;
	private String ac_name;
	private String ac_address;
	private String ac_phone;
	private String createdAt;
	private String updatedAt;
	private boolean isWritten;
	
	public static ArticleResponseDto of(Article article, boolean bool) {
		return ArticleResponseDto.builder()
				.articleSerial(article.getSerial())
				.ac_userNickname(article.getAc_user().getNickname())
				.articleTitle(article.getTitle())
				.articleBody(article.getBody())
				.tag1(article.getTag1())
				.tag2(article.getTag2())
				.tag3(article.getTag3())
				.ac_name(article.getAc_name())
				.ac_address(article.getAc_address())
				.ac_phone(article.getAc_phone())
				.createdAt(article.getCreateAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
				.updatedAt(article.getUpdateAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
				.isWritten(bool)
				.build();
	}
}
