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
public class RComment {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "RCOMMENT_SEQ")
    @SequenceGenerator(name = "RCOMMENT_SEQ", sequenceName = "HAKVIEW_SEQ", allocationSize = 1)
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
    @JoinColumn(name = "review_id")
    private Review review;
    
    @Builder
    public RComment(String text, AC_User ac_user, Review review) {
        this.text = text;
        this.ac_user = ac_user;
        this.review = review;
    }
}
