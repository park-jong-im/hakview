package com.project.hakview.dto;

import java.time.format.DateTimeFormatter;

import com.project.hakview.entity.Review;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReviewResponseDto {
    private Long reviewSerial;
    private String ac_userNickname;
    private String reviewTitle;
    private String reviewBody;
    private String createdAt;
    private String updatedAt;
    private double starpoint1;
    private double starpoint2;
    private double starpoint3;
    private double starpoint4;
    private double starpoint5;
    private double avgstarpoint;
	private String tag1;
	private String tag2;
	private String tag3;
	private String ac_title;
	private String ac_name;
    private boolean isWritten;
    
    public static ReviewResponseDto of(Review review, boolean bool) {
    	return ReviewResponseDto.builder()
    			.reviewSerial(review.getSerial())
    			.ac_userNickname(review.getAc_user().getNickname())
    			.reviewTitle(review.getTitle())
    			.reviewBody(review.getBody())
    			.createdAt(review.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .updatedAt(review.getUpdatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .starpoint1(review.getStarpoint1())
                .starpoint2(review.getStarpoint2())
                .starpoint3(review.getStarpoint3())
                .starpoint4(review.getStarpoint4())
                .starpoint5(review.getStarpoint5())
                .avgstarpoint(review.getAvgstarpoint())
                .tag1(review.getTag1())
                .tag2(review.getTag2())
                .tag3(review.getTag3())
                .ac_title(review.getAc_title())
                .ac_name(review.getAc_name())
                .isWritten(bool)
                .build();
    }
    
}
