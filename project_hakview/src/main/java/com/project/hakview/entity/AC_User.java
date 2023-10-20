package com.project.hakview.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
public class AC_User {
	// H2의 경우 GenerationType.IDENTITY를 사용하지만 Oracle은 GenerationType.SEQUENCE와 함께
	// @SequenceGenerator로 시퀸스 지정을 해줘야됨.
	// 같은 유형으로 TEXT를 사용하지 못해 CLOB 또는 VARCHAR로 지정해줘야됨.
	@Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "AC_USER_SEQ")
    @SequenceGenerator(name = "AC_USER_SEQ", sequenceName = "HAKVIEW_SEQ", allocationSize = 1)
    @Column(name = "member_id")
    private Long serial;

    // 아이디
    @Column(nullable = false, unique = true)
    private String id;

    // 닉네임
    @Column(nullable = false, unique = true, name = "member_nickname")
    private String nickname;
    
    // 비밀번호
    @Column(nullable = false)
    private String password;

    // 생년월일
    @Column(nullable = false)
    private String birth;
    
    // 폰번호
    @Column(nullable = false)
    private String phone;
    
    // 학원이름
    private String ac_name;
    
    // 학원주소
    private String ac_address;
    
    // 학원전화
    private String ac_phone;
    
    @OneToMany(mappedBy = "ac_user", cascade = CascadeType.REMOVE)
    private List<Article> articles = new ArrayList<>();
    
    @OneToMany(mappedBy = "ac_user", cascade = CascadeType.REMOVE)
    private List<Freeboard> freeboards = new ArrayList<>();
    
    @OneToMany(mappedBy = "ac_user", cascade = CascadeType.REMOVE)
    private List<Review> reviews = new ArrayList<>();
    
    @Enumerated(EnumType.STRING)
    private Authority authority;

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }
    
    public void setPassword(String password) {
        this.password = password;
     }
    
    public void setBirth(String birth) {
    	this.birth = birth;
    }
    
    public void setPhone(String phone) {
    	this.phone = phone;
    }
    
    public void setac_name(String ac_name) {
    	this.ac_name = ac_name;
    }
    
    public void setac_address(String ac_address) {
    	this.ac_address = ac_address;
    }
    
    public void setac_phone(String ac_phone) {
    	this.ac_phone = ac_phone;
    }
    
    @Builder
    public AC_User(Long serial, String id, String nickname, String password,
    		String birth, String phone, String ac_name, String ac_address, String ac_phone, Authority authority) {
        this.serial = serial;
    	this.id = id;
        this.nickname = nickname;
        this.password = password;
        this.birth = birth;
        this.phone = phone;
        this.ac_name = ac_name;
        this.ac_address = ac_address;
        this.ac_phone = ac_phone;
        this.authority = authority;
    }
}
