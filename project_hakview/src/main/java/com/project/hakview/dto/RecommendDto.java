package com.project.hakview.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RecommendDto {
	private int recommendNum;
	private boolean isRecommended;
	
	public static RecommendDto noOne() {
		return RecommendDto.builder()
				.recommendNum(0)	//추천수
				.isRecommended(false)	//추천여부
				.build();
	}
}
