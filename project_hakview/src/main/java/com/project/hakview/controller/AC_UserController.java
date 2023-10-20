package com.project.hakview.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.hakview.dto.AC_UserResponseDto;
import com.project.hakview.dto.ChangePasswordRequestDto;
import com.project.hakview.dto.MessageDto;
import com.project.hakview.service.AC_UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/ac_user")
public class AC_UserController {

	private final AC_UserService ac_userService;
	
	@GetMapping("/me")
	public ResponseEntity<AC_UserResponseDto> getMyAC_UserInfo() {
		AC_UserResponseDto myInfoBySecurity = ac_userService.getMyInfoBySecurity();
		System.out.println(myInfoBySecurity.getNickname());
		return ResponseEntity.ok((myInfoBySecurity));
	}
		
	@PostMapping("/updateInfo")
	public ResponseEntity<AC_UserResponseDto> updateUserInfo(@RequestBody AC_UserResponseDto request) {
	    return ResponseEntity.ok(ac_userService.updateUserInfo(
	        request.getId(), request.getNickname(), request.getBirth(), request.getPhone(),
	        request.getAc_name(), request.getAc_address(), request.getAc_phone()));
	}
	
	@PostMapping("/password")
	public ResponseEntity<AC_UserResponseDto> setAC_UserPassword(@RequestBody ChangePasswordRequestDto request) {
		return ResponseEntity.ok(ac_userService.changeAC_UserPassword(request.getId(), request.getExPassword(), request.getNewPassword()));
	}
	
	@DeleteMapping("/delete")
	public ResponseEntity<MessageDto> deleteAccount(@RequestParam(name = "password") String password) {
	    ac_userService.deleteAccount(password);
	    return ResponseEntity.ok(new MessageDto("success"));
	}
	
}


