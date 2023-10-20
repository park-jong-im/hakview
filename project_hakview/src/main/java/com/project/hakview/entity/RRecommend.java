package com.project.hakview.entity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RRecommend {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "RRECOMMEND_SEQ")
    @SequenceGenerator(name = "RRECOMMEND_SEQ", sequenceName = "HAKVIEW_SEQ", allocationSize = 1)
    private Long serial;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private AC_User ac_user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "review_id")
    private Review review;
    
    public RRecommend(AC_User ac_user, Review review) {
        this.ac_user = ac_user;
        this.review = review;
    }
}
