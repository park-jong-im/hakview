package com.project.hakview.service;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.hakview.Repository.AC_UserRepository;
import com.project.hakview.Repository.FreeboardRepository;
import com.project.hakview.Repository.RecommendsRepository;
import com.project.hakview.config.SecurityUtil;
import com.project.hakview.dto.RecommendsDto;
import com.project.hakview.entity.AC_User;
import com.project.hakview.entity.Freeboard;
import com.project.hakview.entity.Recommends;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RecommendsService {
    private final FreeboardRepository freeboardRepository;
    private final AC_UserRepository ac_userRepository;
    private final RecommendsRepository recommendsRepository;
    
    public RecommendsDto allRecommends(Long serial) {
    	Freeboard freeboard = freeboardRepository.findById(serial).orElseThrow(() -> new RuntimeException("글이 없습니다."));
        List<Recommends> recommends = recommendsRepository.findAllByFreeboard(freeboard);
        int size = recommends.size();
        if (size == 0) {
            return RecommendsDto.noOne();
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || authentication.getPrincipal() == "anonymousUser") {
            return new RecommendsDto(size, false);
        } else {
        	AC_User ac_user = ac_userRepository.findById(Long.parseLong(authentication.getName())).orElseThrow();
            boolean result = recommends.stream().anyMatch(recommend -> recommend.getAc_user().equals(ac_user));
            return new RecommendsDto(size, result);
        }
    }

//    @Transactional
//    public void createRecommends(Long serial) {
//    	AC_User ac_user = ac_userRepository.findById(
//                        SecurityUtil.getCurrentMemberId())
//                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
//    	Freeboard freeboard = freeboardRepository.findById(serial).orElseThrow(() -> new RuntimeException("글이 없습니다."));
//
//        Recommends recommends = new Recommends(ac_user, freeboard);
//        recommendsRepository.save(recommends);
//    }
    
	@Transactional
	   public void createRecommends(Long serial) {
	       AC_User ac_user = ac_userRepository.findById(
	                           SecurityUtil.getCurrentMemberId())
	               .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다."));
	       Freeboard freeboard = freeboardRepository.findById(serial).orElseThrow(() -> new RuntimeException("글이 없습니다."));

	       if (recommendsRepository.existsByAC_UserSerial(ac_user.getSerial()) &&
	           recommendsRepository.existsByFreeboardSerial(freeboard.getSerial())) {
	           throw new RuntimeException("추천은 한개만 가능");
	       }
	       Recommends recommends = new Recommends(ac_user, freeboard);
	       recommendsRepository.save(recommends);
	   }

    @Transactional
    public void removeRecommends(Long serial) {
        AC_User ac_user = ac_userRepository.findById(
                        SecurityUtil.getCurrentMemberId())
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
        Freeboard freeboard = freeboardRepository.findById(serial).orElseThrow(() -> new RuntimeException("글이 없습니다."));
        Recommends recommends = recommendsRepository.findAllByFreeboard(freeboard)
                .stream()
                .filter(r -> r.getAc_user().equals(ac_user))
                .findFirst()
                .orElseThrow(() ->  new RuntimeException("추천이 없습니다."));

        recommendsRepository.delete(recommends);
    }

}

