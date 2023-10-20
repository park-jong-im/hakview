package com.project.hakview.service;

import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.project.hakview.Repository.AC_UserRepository;
import com.project.hakview.entity.AC_User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final AC_UserRepository ac_userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return ac_userRepository.findById(username)
                .map(this::createUserDetails)
                .orElseThrow(() -> new UsernameNotFoundException(username + " 을 DB에서 찾을 수 없습니다"));
    }

    private UserDetails createUserDetails(AC_User ac_user) {
        GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(ac_user.getAuthority().toString());

        return new User(
                String.valueOf(ac_user.getSerial()),
                ac_user.getPassword(),
                Collections.singleton(grantedAuthority)
        );
    }
}