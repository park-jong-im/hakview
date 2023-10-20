package com.project.hakview.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChangeArticleRequestDto {
	private Long serial;
	private String title;
	private String body;
	private String tag1;
	private String tag2;
	private String tag3;
	private String ac_name;
	private String ac_address;
	private String ac_phone;
}
