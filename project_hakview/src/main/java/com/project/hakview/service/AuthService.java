package com.project.hakview.service;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.hakview.Repository.AC_UserRepository;
import com.project.hakview.Repository.RefreshTokenRepository;
import com.project.hakview.dto.AC_UserRequestDto;
import com.project.hakview.dto.AC_UserResponseDto;
import com.project.hakview.dto.TokenDto;
import com.project.hakview.entity.AC_User;
import com.project.hakview.entity.RefreshToken;
import com.project.hakview.jwt.TokenProvider;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {
	private final AuthenticationManagerBuilder managerBuilder;
    private final AC_UserRepository ac_userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    
    // 회원 가입 메서드
    public AC_UserResponseDto signup(AC_UserRequestDto requestDto) {
        if (ac_userRepository.existsById(requestDto.getId())) {
        	// 이미 가입된 사용자인 경우 예외 처리
        	throw new RuntimeException("이미 가입되어 있는 유저입니다");
        }

        AC_User ac_user = requestDto.toAC_User(passwordEncoder);
        // 회원 정보 저장 및 응답 DTO 생성
        return AC_UserResponseDto.of(ac_userRepository.save(ac_user));
    }

    // 로그인 메서드
    public TokenDto login(AC_UserRequestDto requestDto) {
    	// 기존에 저장되어있는 유저의 refreshToken를 제거 (중복 로그인 방지)
    	if (refreshTokenRepository.existsById(requestDto.getId())) {
    		refreshTokenRepository.deleteById(requestDto.getId());
    	}
  	
        UsernamePasswordAuthenticationToken authenticationToken = requestDto.toAuthentication();
        
        System.out.println(authenticationToken);

        Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken);
        
        // Access Token 및 Refresh Token 생성 및 응답
        TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);
        System.out.println(tokenDto);
        
        String rt = tokenDto.getRefreshToken();
        RefreshToken refreshToken = RefreshToken.builder()
                .refreshToken(rt)
                .id(requestDto.getId())
                .build();
        refreshTokenRepository.save(refreshToken);
        
        
        return tokenDto;
    }
    
    // Refresh Token을 사용하여 Access Token 재발급 메서드
    public TokenDto refresh(TokenDto tokenDto) {
    	Optional<RefreshToken> refreshTokenOptional = refreshTokenRepository.findByRefreshToken(tokenDto.getRefreshToken());
    	String userId = refreshTokenOptional.get().getId();
    	
        if (refreshTokenOptional.isPresent() && tokenProvider.validateRefreshToken(tokenDto.getRefreshToken())) {
        	// Refresh Token이 유효하면 새로운 Access Token 발급
        	TokenDto newtokenDto = tokenProvider.newGenerateTokenDto(userId);
            
            // 새로 발급한 Access Token을 반환합니다.
            return newtokenDto;
        } else {
            // 유효성 검사 실패 또는 Refresh Token이 없을 때의 처리
            System.out.println("재발급 실패");
            throw new AuthenticationCredentialsNotFoundException("RefreshToken이 유효하지 않습니다.");
        }
    }
    
    // 번호와 생일을 이용하여 아이디를 찾는 메서드
	@Transactional
	public String findUserIdByPhoneAndBirth(String phone, String birth) {
	    AC_User ac_user = ac_userRepository.findByPhoneAndBirth(phone, birth);
	    if (ac_user != null) {
	        return ac_user.getId();
	    } else {
	        return null; // 사용자를 찾지 못한 경우 null 반환
	    }
	}
	
	// 비번 찾기
    public String findPw(AC_UserRequestDto requestDto) {
    	System.out.println(requestDto.getId());
    	AC_User ac_user = ac_userRepository.findById(requestDto.getId())
                .orElseThrow(() -> new RuntimeException("해당 아이디의 사용자를 찾을 수 없습니다."));
    	if (!ac_user.getBirth().equals(requestDto.getBirth())
    			|| !ac_user.getPhone().equals(requestDto.getPhone())) {
    		throw new RuntimeException("해당 계정의 사용자가 존재하지 않습니다.");
    	}
    	return ac_user.getId();
    }
    
    // 비번 수정
	@Transactional
	public AC_UserResponseDto changeAC_UserPassword(String id, String exPassword, String newPassword) {
		AC_User ac_user = ac_userRepository.findById(id).orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다."));
		if (exPassword.equals(newPassword)) {
	        throw new RuntimeException("비밀번호가 일치하지 않습니다.");
	    }
		ac_user.setPassword(passwordEncoder.encode(newPassword));
		return AC_UserResponseDto.of(ac_userRepository.save(ac_user));
	}
    

}
