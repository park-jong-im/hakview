package com.project.hakview.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ChangeNicknameRequestDto {
	private String id;
	private String newNickname;
	private String newBirth;
	private String newPhone;
	private String newAc_name;
	private String newAc_address;
	private String newAc_phone;
}
