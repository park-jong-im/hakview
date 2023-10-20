package com.project.hakview.dto;

import com.project.hakview.entity.AC_User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AC_UserResponseDto {
	private String id;
	private String nickname;
	private String birth;
	private String phone;
	private String ac_name;
	private String ac_address;
	private String ac_phone;
	
	public static AC_UserResponseDto of(AC_User ac_user) {
		return AC_UserResponseDto.builder()
				.id(ac_user.getId())
				.nickname(ac_user.getNickname())
				.birth(ac_user.getBirth())
                .phone(ac_user.getPhone())
                .ac_name(ac_user.getAc_name())
                .ac_address(ac_user.getAc_address())
                .ac_phone(ac_user.getAc_phone())
                .build();
	}
}
