package com.project.hakview.dto;

import java.time.format.DateTimeFormatter;

import com.project.hakview.entity.Review;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class RageResponseDto {
    private Long reviewSerial;
    private String reviewTitle;
    private String body;
    private String ac_userNickname;
    private double starpoint1;
    private double starpoint2;
    private double starpoint3;
    private double starpoint4;
    private double starpoint5;
    private double avgstarpoint;
    private String tag1;
    private String tag2;
    private String tag3;
    private String ac_name;
    private String ac_title;
    private String createdAt;
    private Long article_id;
    
	public static RageResponseDto of(Review review) {
		return RageResponseDto.builder()
				.reviewSerial(review.getSerial())
				.reviewTitle(review.getTitle())
				.body(review.getBody())
				.ac_userNickname(review.getAc_user().getNickname())
				.starpoint1(review.getStarpoint1())
				.starpoint2(review.getStarpoint2())
				.starpoint3(review.getStarpoint3())
				.starpoint4(review.getStarpoint4())
				.starpoint5(review.getStarpoint5())
				.avgstarpoint(review.getAvgstarpoint())
				.tag1(review.getTag1())
				.tag2(review.getTag2())
				.tag3(review.getTag3())
				.ac_name(review.getAc_name())
				.ac_title(review.getAc_title())
				.createdAt(review.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
				.article_id(review.getArticle().getSerial())
				.build();
	}
}
