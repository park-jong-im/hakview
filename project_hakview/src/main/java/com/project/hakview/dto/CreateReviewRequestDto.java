package com.project.hakview.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateReviewRequestDto {
	private String title;
	private String body;
	private double starpoint1;
	private double starpoint2;
	private double starpoint3;
	private double starpoint4;
	private double starpoint5;
	private String tag1;
	private String tag2;
	private String tag3;
	private String ac_title;
	private String ac_name;
	
	// 학원 정보 시리얼 따로 불러오기
	private Long serial;
}
