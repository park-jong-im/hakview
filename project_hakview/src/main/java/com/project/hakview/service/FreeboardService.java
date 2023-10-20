package com.project.hakview.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.hakview.Repository.AC_UserRepository;
import com.project.hakview.Repository.FreeboardRepository;
import com.project.hakview.config.SecurityUtil;
import com.project.hakview.dto.FageResponseDto;
import com.project.hakview.dto.FreeboardResponseDto;
import com.project.hakview.entity.AC_User;
import com.project.hakview.entity.Freeboard;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FreeboardService {
	private final FreeboardRepository freeboardRepository;
	private final AC_UserRepository ac_userRepository;
	
	public FreeboardResponseDto oneFreeboard(Long serial) {
		Freeboard freeboard = freeboardRepository.findById(serial).orElseThrow(() -> new RuntimeException("글이 없습니다."));
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getPrincipal() == "anonymousUser") {
        	return FreeboardResponseDto.of(freeboard, false);
        } else {
        	AC_User ac_user = ac_userRepository.findById(Long.parseLong(authentication.getName())).orElseThrow();
        	boolean result = freeboard.getAc_user().equals(ac_user);
            return FreeboardResponseDto.of(freeboard, result);
        }
	}
	
//	public List<FageResponseDto> allFreeboard() {
//		List<Freeboard> freeboards = freeboardRepository.findAll();
//		return freeboards
//				.stream()
//				.map(FageResponseDto::of)
//				.collect(Collectors.toList());
//	}
	
	public Page<FageResponseDto> pageFreeboard(int pageNum) {
		return freeboardRepository.searchAll(PageRequest.of(pageNum -1, 10));
	}
	
    //타이틀 검색파트
   public Page<Freeboard> search(String keyword, Pageable pageable) {
   	return freeboardRepository.findByTitleContaining(keyword, pageable);
   }
   
   // 닉네임 검색파트
   public Page<Freeboard> searchByNickname(String nickname, Pageable pageable) {
   	return freeboardRepository.findByAuthorNicknameContaining(nickname, pageable);
   }
   
   // 타이틀,바디 검색파트
	public Page<Freeboard> searchByTitleOrBody(String titlekeyword, String bodykeyword, Pageable pageable) {
		return freeboardRepository.findByTitleContainingOrBodyContaining(titlekeyword, bodykeyword, pageable);
	}
	
	@Transactional
	public FreeboardResponseDto postFreeboard(String title, String body) {
		AC_User ac_user = isAC_UserCurrent();
		AC_User author = ac_user;
		Freeboard freeboard = Freeboard.createFreeboard(title, body, ac_user, author);
		return FreeboardResponseDto.of(freeboardRepository.save(freeboard), true);
	}
	
	@Transactional
	public FreeboardResponseDto changeFreeboard(Long serial, String title, String body) {
		Freeboard freeboard = authorizationFreeboardWriter(serial);
		return FreeboardResponseDto.of(freeboardRepository.save(Freeboard.changeFreeboard(freeboard, title, body)), true);
	}
	
	@Transactional
	public void deleteFreeboard(Long serial) {
		Freeboard freeboard = authorizationFreeboardWriter(serial);
		freeboardRepository.delete(freeboard);
	}
	
	public AC_User isAC_UserCurrent() {
		return ac_userRepository.findById(SecurityUtil.getCurrentMemberId())
				.orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
	}
	
	public Freeboard authorizationFreeboardWriter(Long serial) {
		AC_User ac_user = isAC_UserCurrent();
		Freeboard freeboard = freeboardRepository.findById(serial).orElseThrow(() -> new RuntimeException("글이 없습니다."));
		if (!freeboard.getAc_user().equals(ac_user)) {
			throw new RuntimeException("로그인한 유저와 작성 유저가 같지 않습니다.");
		}
		return freeboard;
	}
}





























