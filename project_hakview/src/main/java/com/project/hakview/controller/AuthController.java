package com.project.hakview.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.hakview.dto.AC_UserRequestDto;
import com.project.hakview.dto.AC_UserResponseDto;
import com.project.hakview.dto.ChangePasswordRequestDto;
import com.project.hakview.dto.TokenDto;
import com.project.hakview.service.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    // 학원 관계자 회원가입
    @PostMapping("/signup")
    public ResponseEntity<AC_UserResponseDto> signup(@RequestBody AC_UserRequestDto requestDto) {
        return ResponseEntity.ok(authService.signup(requestDto));
    }
    

    @PostMapping("/login")
    public ResponseEntity<TokenDto> login(@RequestBody AC_UserRequestDto requestDto) {
        return ResponseEntity.ok(authService.login(requestDto));
    }
    
    @PostMapping("/refresh")
    public ResponseEntity<TokenDto> refresh(@RequestBody TokenDto tokenDto) {
    	return ResponseEntity.ok(authService.refresh(tokenDto));
    }
    
	
	@GetMapping("/findUserId")
	public ResponseEntity<String> findUserId(@RequestParam String phone, @RequestParam String birth) {
	    String foundUserId = authService.findUserIdByPhoneAndBirth(phone, birth);
	    if (foundUserId != null) {
	        return ResponseEntity.ok(foundUserId);
	    } else {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("사용자를 찾을 수 없습니다.");
	    }
	}
	
	// 비번 찾기
    @PostMapping("/findpw")
    public ResponseEntity<String> findPw(@RequestBody AC_UserRequestDto requestDto) {
    	return ResponseEntity.ok(authService.findPw(requestDto));
    }
    
    // 비번 수정
	@PostMapping("/changepw")
	public ResponseEntity<AC_UserResponseDto> setAC_UserPassword(@RequestBody ChangePasswordRequestDto request) {
		return ResponseEntity.ok(authService.changeAC_UserPassword(request.getId(), request.getExPassword(), request.getNewPassword()));
	}
}
