package com.project.hakview.dto;

import java.time.format.DateTimeFormatter;

import com.project.hakview.entity.RComment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RCommentResponseDto {
	private long rcommentSerial;
    private String ac_userNickname;
    private String rcommentBody;
    private String createdAt;
    private boolean isWritten;
    
    public static RCommentResponseDto of(RComment rcomment, boolean bool) {
        return RCommentResponseDto.builder()
                .rcommentSerial(rcomment.getSerial())
                .ac_userNickname(rcomment.getAc_user().getNickname())
                .rcommentBody(rcomment.getText())
                .createdAt(rcomment.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .isWritten(bool)
                .build();
    }
}
