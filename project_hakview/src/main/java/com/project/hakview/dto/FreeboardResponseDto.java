package com.project.hakview.dto;

import java.time.format.DateTimeFormatter;

import com.project.hakview.entity.Freeboard;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FreeboardResponseDto {
	private Long freeboardSerial;
	private String ac_userNickname;
	private String freeboardTitle;
	private String freeboardBody;
    private String createdAt;
    private String updatedAt;
    private boolean isWritten;
    
    public static FreeboardResponseDto of(Freeboard freeboard, boolean bool) {
    	return FreeboardResponseDto.builder()
    			.freeboardSerial(freeboard.getSerial())
    			.ac_userNickname(freeboard.getAc_user().getNickname())
    			.freeboardTitle(freeboard.getTitle())
    			.freeboardBody(freeboard.getBody())
    			.createdAt(freeboard.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .updatedAt(freeboard.getUpdatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .isWritten(bool)
                .build();
    }
}
