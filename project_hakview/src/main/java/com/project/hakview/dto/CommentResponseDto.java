package com.project.hakview.dto;

import java.time.format.DateTimeFormatter;

import com.project.hakview.entity.MainComment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommentResponseDto {
	private long commentSerial;
    private String ac_userNickname;
    private String commentBody;
    private String createdAt;
    private boolean isWritten;

    public static CommentResponseDto of(MainComment comment, boolean bool) {
        return CommentResponseDto.builder()
                .commentSerial(comment.getSerial())
                .ac_userNickname(comment.getAc_user().getNickname())
                .commentBody(comment.getText())
                .createdAt(comment.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .isWritten(bool)
                .build();
    }
}
