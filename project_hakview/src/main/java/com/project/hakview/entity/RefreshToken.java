package com.project.hakview.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
public class RefreshToken {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "REFRESH_TOKEN_SEQ")
    @SequenceGenerator(name = "REFRESH_TOKEN_SEQ", sequenceName = "HAKVIEW_SEQ", allocationSize = 1)
	private Long serial;
	
	private String refreshToken;
	
	private String id;
	
	@Builder
	public RefreshToken(Long serial, String refreshToken, String id) {
		this.serial = serial;
		this.refreshToken = refreshToken;
		this.id = id;
	}
}
