package com.project.hakview.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChangeFreeboardRequestDto {
	private Long serial;
	private String title;
	private String body;
}
