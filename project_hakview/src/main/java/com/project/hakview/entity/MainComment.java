package com.project.hakview.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;

import org.hibernate.annotations.CreationTimestamp;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MainComment {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "MAIN_COMMENT_SEQ")
    @SequenceGenerator(name = "MAIN_COMMENT_SEQ", sequenceName = "HAKVIEW_SEQ", allocationSize = 1)
    private Long serial;

    @Column(nullable = false, columnDefinition = "CLOB")
    private String text;

    @CreationTimestamp
    @Column
    private LocalDateTime createdAt = LocalDateTime.now();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private AC_User ac_user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "freeboard_id")
    private Freeboard freeboard;


    @Builder
    public MainComment(String text, AC_User ac_user, Freeboard freeboard) {
        this.text = text;
        this.ac_user = ac_user;
        this.freeboard = freeboard;
    }

}

