package com.project.hakview.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RRecommendDto {
	private int recommendNum;
	private boolean isRecommended;
	
	public static RRecommendDto noOne() {
		return RRecommendDto.builder()
				.recommendNum(0)	//추천수
				.isRecommended(false)	//추천여부
				.build();
	}
}
