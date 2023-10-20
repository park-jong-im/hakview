package com.project.hakview.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RecommendsDto {
	private int recommendNum;
	private boolean isRecommended;
	
	public static RecommendsDto noOne() {
		return RecommendsDto.builder()
				.recommendNum(0)
				.isRecommended(false)
				.build();
	}
}
