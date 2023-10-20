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
public class Freeboard {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "FREEBOARD_SEQ")
    @SequenceGenerator(name = "FREEBOARD_SEQ", sequenceName = "HAKVIEW_SEQ", allocationSize = 1)
	@Column(name = "freeboard_id")
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

    @OneToMany(mappedBy = "freeboard", cascade = CascadeType.REMOVE)
    private List<MainComment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "freeboard", cascade = CascadeType.REMOVE)
    private List<Recommends> recommends = new ArrayList<>();
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private AC_User ac_user;
    
	// 닉네임조인
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_nickname")
	private AC_User author;

    public static Freeboard createFreeboard (String title, String body, AC_User ac_user, AC_User author) {
    	Freeboard freeboard = new Freeboard();
    	freeboard.title = title;
    	freeboard.body = body;
    	freeboard.ac_user = ac_user;
    	freeboard.author = author;

        return freeboard;
    }

    public static Freeboard changeFreeboard (Freeboard freeboard, String title, String body) {
    	freeboard.title = title;
    	freeboard.body = body;

        return freeboard;
    }
}
