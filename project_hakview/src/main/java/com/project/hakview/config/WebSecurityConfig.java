package com.project.hakview.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.stereotype.Component;

import com.project.hakview.jwt.JwtAccessDeniedHandler;
import com.project.hakview.jwt.JwtAuthenticationEntryPoint;
import com.project.hakview.jwt.TokenProvider;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
@Component
public class WebSecurityConfig {
	
	private final TokenProvider tokenProvider;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
        		.cors()
        		
        		.and()
                .httpBasic().disable()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                .and()
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)

                .and()
                .authorizeRequests()
                .antMatchers("/auth/**").permitAll()
                .antMatchers("/ac_user/**").authenticated()
                // 학원홍보 권한
                .antMatchers("/article/page").permitAll()
                .antMatchers("/article/one").permitAll()
                .antMatchers("/article/search").permitAll()
                .antMatchers("/article/searchByNickname").permitAll()
                .antMatchers("/article/searchOr").permitAll()
                .antMatchers("/article/tag1").permitAll()
                .antMatchers("/article/tag2").permitAll()
                .antMatchers("/article/tag3").permitAll()
                .antMatchers("/article/**").hasRole("ACADMIN")
                // 리뷰 권한
                .antMatchers("/review/page").permitAll()
                .antMatchers("/review/one").permitAll()
                .antMatchers("/review/search").permitAll()
                .antMatchers("/review/searchByNickname").permitAll()
                .antMatchers("/review/searchOr").permitAll()
                .antMatchers("/review/list").permitAll()
                .antMatchers("/review/**").hasRole("USER")
                // 자유게시판 권한
                .antMatchers("/freeboard/page").permitAll()
                .antMatchers("/freeboard/one").permitAll()
                .antMatchers("/freeboard/search").permitAll()
                .antMatchers("/freeboard/searchByNickname").permitAll()
                .antMatchers("/freeboard/searchOr").permitAll()
                .antMatchers("/freeboard/**").authenticated()
                // 자게 댓글 권한
                .antMatchers("/comment/list").permitAll()
                .antMatchers("/comment/**").authenticated()
                // 리뷰 댓글 권한
                .antMatchers("/rcomment/list").permitAll()
                .antMatchers("/rcomment/**").authenticated()
                // 추천기능 권한
                .antMatchers("/recommend/**").authenticated()
                .antMatchers("/recommends/**").authenticated()
                .antMatchers("/rrecommend/**").authenticated()
                .anyRequest().authenticated()
                

                .and()
                .apply(new JwtSecurityConfig(tokenProvider));

        return http.build();
    }
    
}
