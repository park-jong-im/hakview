package com.project.hakview.dto;

import java.time.format.DateTimeFormatter;

import com.project.hakview.entity.Freeboard;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FageResponseDto {
	private Long freeboardSerial;
	private String freeboardTitle;
	private String ac_userNickname;
	private String createdAt;
	
	public static FageResponseDto of(Freeboard freeboard) {
		return FageResponseDto.builder()
				.freeboardSerial(freeboard.getSerial())
				.freeboardTitle(freeboard.getTitle())
				.ac_userNickname(freeboard.getAc_user().getNickname())
				.createdAt(freeboard.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
				.build();
	}
}
