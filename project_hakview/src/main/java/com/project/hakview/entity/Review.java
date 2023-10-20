package com.project.hakview.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.Getter;

@Entity
@Getter
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "REVIEW_SEQ")
    @SequenceGenerator(name = "REVIEW_SEQ", sequenceName = "HAKVIEW_SEQ", allocationSize = 1)
    @Column(name = "review_id")
    private Long serial;
    
    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "CLOB")
    private String body;

    @CreationTimestamp
    @Column
    private LocalDateTime createdAt = LocalDateTime.now();

    @UpdateTimestamp
    @Column
    private LocalDateTime updatedAt = LocalDateTime.now();

    @OneToMany(mappedBy = "review", cascade = CascadeType.REMOVE)
    private List<RComment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "review", cascade = CascadeType.REMOVE)
    private List<RRecommend> recommends = new ArrayList<>();
    
    @Column(nullable = false)
	private double starpoint1;
	
	@Column(nullable = false)
	private double starpoint2;
	
	@Column(nullable = false)
	private double starpoint3;
	
	@Column(nullable = false)
	private double starpoint4;
	
	@Column(nullable = false)
	private double starpoint5;
	
	@Column
	private double avgstarpoint;
	
	@Column
	private String tag1;
	
	@Column
	private String tag2;
	
	@Column
	private String tag3;
	
	private String ac_title;
	
	private String ac_name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private AC_User ac_user;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "article_id")
    private Article article;
    
    // 닉네임조인
 	@ManyToOne(fetch = FetchType.LAZY)
 	@JoinColumn(name = "member_nickname")
 	private AC_User author;
 	
    public static Review createReview (String title, String body, double starpoint1, double starpoint2, double starpoint3, 
    		double starpoint4, double starpoint5, String tag1, String tag2, String tag3, String ac_title, String ac_name ,AC_User ac_user, Article article ,AC_User author) {
    	Review review = new Review();
    	review.title = title;
    	review.body = body;
    	review.starpoint1 = starpoint1;
    	review.starpoint2 = starpoint2;
    	review.starpoint3 = starpoint3;
    	review.starpoint4 = starpoint4;
    	review.starpoint5 = starpoint5;
    	review.tag1 = tag1;
    	review.tag2 = tag2;
    	review.tag3 = tag3;
    	review.ac_title = ac_title;
    	review.ac_name = ac_name;
    	review.ac_user = ac_user;
    	review.article = article;
    	review.author = author;
    	
    	double avgstarpoint = (starpoint1 + starpoint2 + starpoint3 + starpoint4 + starpoint5) / 5;
        review.avgstarpoint = avgstarpoint;

        return review;
    }
    
    public static Review changeReview (Review review, String title, String body, double starpoint1, double starpoint2, double starpoint3, 
    		double starpoint4, double starpoint5, String tag1, String tag2, String tag3) {
    	review.title = title;
    	review.body = body;
    	review.starpoint1 = starpoint1;
    	review.starpoint2 = starpoint2;
    	review.starpoint3 = starpoint3;
    	review.starpoint4 = starpoint4;
    	review.starpoint5 = starpoint5;
    	review.tag1 = tag1;
    	review.tag2 = tag2;
    	review.tag3 = tag3;
        return review;
    }
}
