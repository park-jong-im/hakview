package com.project.hakview.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.hakview.Repository.AC_UserRepository;
import com.project.hakview.config.SecurityUtil;
import com.project.hakview.dto.AC_UserResponseDto;
import com.project.hakview.entity.AC_User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AC_UserService {
	private final AC_UserRepository ac_userRepository;
	private final PasswordEncoder passwordEncoder;
	
	// 현재 로그인한 사용자의 정보를 조회하여 반환하는 메서드
	public AC_UserResponseDto getMyInfoBySecurity() {
		return ac_userRepository.findById(SecurityUtil.getCurrentMemberId())
				.map(AC_UserResponseDto::of)
				.orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다."));
	}
	
	
	// 사용자의 정보를 변경하는 메서드
	@Transactional
	public AC_UserResponseDto updateUserInfo(String id, String nickname, String birth, String phone, String ac_name, String ac_address, String ac_phone) {
	    AC_User ac_user = ac_userRepository.findById(SecurityUtil.getCurrentMemberId())
	            .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다."));
	    
	    // 요청에서 받은 정보로 사용자 정보 업데이트
	    ac_user.setNickname(nickname);
	    ac_user.setBirth(birth);
	    ac_user.setPhone(phone);
	    ac_user.setac_name(ac_name);
	    ac_user.setac_address(ac_address);
	    ac_user.setac_phone(ac_phone);

	    // 변경된 사용자 정보를 저장하고 변경된 정보를 반환
	    return AC_UserResponseDto.of(ac_userRepository.save(ac_user));
	}
	
	// 사용자의 비밀번호를 변경하는 메서드
	@Transactional
	public AC_UserResponseDto changeAC_UserPassword(String id, String exPassword, String newPassword) {
		AC_User ac_user = ac_userRepository.findById(SecurityUtil.getCurrentMemberId()).orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다."));
		// 입력된 이전 비밀번호가 현재 비밀번호와 일치하는지 확인
		if(!passwordEncoder.matches(exPassword, ac_user.getPassword())) {
			throw new RuntimeException("비밀번호가 맞지 않습니다.");
		}
		// 새로운 비밀번호로 변경
		ac_user.setPassword(passwordEncoder.encode(newPassword));
		// 변경된 사용자 정보를 저장하고 변경된 정보를 반환
		return AC_UserResponseDto.of(ac_userRepository.save(ac_user));
	}
	
	// 사용자 탈퇴하는 메서드
    @Transactional
    public void deleteAccount(String password) {
    	// 현재 로그인한 사용자 정보를 가져옴
        AC_User ac_user = isAC_UserCurrent();
        
        // 입력한 비밀번호와 사용자의 저장된 비밀번호를 비교
        if (!passwordEncoder.matches(password, ac_user.getPassword())) {
        	// 비밀번호가 일치하지 않으면 예외를 던짐
        	throw new RuntimeException("비밀번호가 일치하지 않습니다.");
        }
        
        // 비밀번호가 일치하면 사용자 계정을 삭제
        ac_userRepository.delete(ac_user);
    }
    
    // 현재 로그인한 사용자 정보를 반환하는 메서드입니다.
    public AC_User isAC_UserCurrent() {
        return ac_userRepository.findById(SecurityUtil.getCurrentMemberId())
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다."));
    }
	
}
