package com.project.hakview.dto;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.project.hakview.entity.AC_User;
import com.project.hakview.entity.Authority;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AC_UserRequestDto {
	private String id;
	private String nickname;
	private String password;
	private String birth;
	private String phone;
	private String ac_name;
	private String ac_address;
	private String ac_phone;
	
	public AC_User toAC_User(PasswordEncoder passwordEncoder) {
		Authority authority = (ac_name == null) ? Authority.ROLE_USER : Authority.ROLE_ACADMIN;
		return AC_User.builder()
				.id(id)
				.nickname(nickname)
				.password(passwordEncoder.encode(password))
				.birth(birth)
				.phone(phone)
				.ac_name(ac_name)
				.ac_address(ac_address)
				.ac_phone(ac_phone)
				.authority(authority)
				.build();
	}
	
	public UsernamePasswordAuthenticationToken toAuthentication() {
		return new UsernamePasswordAuthenticationToken(id, password);
	}
}
