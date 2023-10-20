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
public class Article {
	// 고유 번호
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ARTICLE_SEQ")
    @SequenceGenerator(name = "ARTICLE_SEQ", sequenceName = "HAKVIEW_SEQ", allocationSize = 1)
	@Column(name = "article_id")
	private Long serial;
	
	// 제목
	@Column(nullable = false)
	private String title;
	
	// 내용
	@Column(nullable = false, columnDefinition = "CLOB")
	private String body;
	
	// 작성일
	@CreationTimestamp
	@Column
	private LocalDateTime createAt = LocalDateTime.now();
	
	// 수정일
	@UpdateTimestamp
	@Column
	private LocalDateTime updateAt = LocalDateTime.now();
	
    // 학원이름
    private String ac_name;
    
    // 학원주소
    private String ac_address;
    
    // 학원전화
    private String ac_phone;
	
	@Column
	private String tag1;
	
	@Column
	private String tag2;
	
	@Column
	private String tag3;
	
	// 작성자 번호
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id")
	private AC_User ac_user;
	
	// 닉네임조인 (작성자)
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_nickname")
	private AC_User author;
	
	// 추천수
	@OneToMany(mappedBy = "article", cascade = CascadeType.REMOVE)
	private List<Recommend> recommends = new ArrayList<>();
	
	@OneToMany(mappedBy = "article", cascade = CascadeType.REMOVE)
	private List<Review> reviews = new ArrayList<>();

	public static Article createArticle (String title, String body, AC_User ac_user, AC_User author,
			String tag1, String tag2, String tag3, String ac_name, String ac_address, String ac_phone) {
		Article article = new Article();
		article.title = title;
		article.body = body;
		article.ac_user = ac_user;
		article.author = author;
		article.tag1 = tag1;
		article.tag2 = tag2;
		article.tag3 = tag3;
		article.ac_name = ac_name;
		article.ac_address = ac_address;
		article.ac_phone = ac_phone;
		
		return article;
	}
	
	public static Article changeArticle (Article article, String title, String body,
			String tag1, String tag2, String tag3, String ac_name, String ac_address, String ac_phone) {
		article.title = title;
		article.body = body;
		article.tag1 = tag1;
		article.tag2 = tag2;
		article.tag3 = tag3;
		article.ac_name = ac_name;
		article.ac_address = ac_address;
		article.ac_phone = ac_phone;
		
		return article;
	}
}
