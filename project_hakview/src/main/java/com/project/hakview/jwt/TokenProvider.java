package com.project.hakview.jwt;

import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory; // 추가된 import
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails; // 추가된 import
import org.springframework.stereotype.Component;

import com.project.hakview.Repository.AC_UserRepository;
import com.project.hakview.dto.TokenDto;
import com.project.hakview.entity.AC_User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;

@Component
public class TokenProvider {

    private static final String AUTHORITIES_KEY = "auth";
    private static final String BEARER_TYPE = "bearer";
    private static final long ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60 * 10;
    private static final long REFRESH_TOKEN_EXPIRE_TIME = 1000 * 60 * 50;
    private static final Logger log = LoggerFactory.getLogger(TokenProvider.class);
    private final Key key;
    private final Key key2;

    @Autowired
    private AC_UserRepository ac_UserRepository;

    
    public TokenProvider(@Value("${jwt.secret}") String secretKey) {
        // 키 생성 (256 bits 이상)
        this.key = Keys.secretKeyFor(SignatureAlgorithm.HS512);
        this.key2 = Keys.secretKeyFor(SignatureAlgorithm.HS512);
    }


    // 토큰 생성
    public TokenDto generateTokenDto(Authentication authentication) {

        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        long now = (new Date()).getTime();
        
        System.out.println("토큰생성 확인용############");
        System.out.println(authentication.getName());
        System.out.println(authentication.getName());


        Date tokenExpiresIn = new Date(now + ACCESS_TOKEN_EXPIRE_TIME);
        Date refreshTokenExpiresIn = new Date(now + REFRESH_TOKEN_EXPIRE_TIME);

        System.out.println(tokenExpiresIn);

        String accessToken = Jwts.builder()
                .setSubject(authentication.getName())
                .claim(AUTHORITIES_KEY, authorities)
                .setExpiration(tokenExpiresIn)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
        
        String refreshToken = Jwts.builder()
        		.setSubject(authentication.getName())
        		.claim(AUTHORITIES_KEY, authorities)
        		.setExpiration(refreshTokenExpiresIn)
        		.signWith(key2, SignatureAlgorithm.HS512)
        		.compact();
        
        return TokenDto.builder()
                .grantType(BEARER_TYPE)
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .tokenExpiresIn(tokenExpiresIn.getTime())
                .build();
    }
    
    
    // 새로 시도
    public TokenDto newGenerateTokenDto(String id) {

    	Optional<AC_User> ac_user = ac_UserRepository.findById(id);
        long now = (new Date()).getTime();

        Date tokenExpiresIn = new Date(now + ACCESS_TOKEN_EXPIRE_TIME);

        Long serial = ac_user.get().getSerial();
        
        System.out.println("리프레시 확인용");
        System.out.println(serial);
        
        
        String accessToken = Jwts.builder()
                .setSubject(String.valueOf(serial))
                .claim(AUTHORITIES_KEY, ac_user.get().getAuthority())
                .setExpiration(tokenExpiresIn)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
        
        return TokenDto.builder()
                .grantType(BEARER_TYPE)
                .accessToken(accessToken)
                .tokenExpiresIn(tokenExpiresIn.getTime())
                .build();
    }

    // 토큰 인증정보를 가져오는데 사용
    public Authentication getAuthentication(String accessToken) {
        Claims claims = parseClaims(accessToken);

        if (claims.get(AUTHORITIES_KEY) == null) {
            throw new RuntimeException("권한 정보가 없는 토큰입니다.");
        }

        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

        UserDetails principal = new User(claims.getSubject(), "", authorities);

        return new UsernamePasswordAuthenticationToken(principal, "", authorities);
    }

    // AccessToken 유효성 검사
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.error("잘못된 JWT 서명입니다.", e); // 로그 수정
        } catch (ExpiredJwtException e) {
            log.error("만료된 JWT 토큰입니다.", e); // 로그 수정
        } catch (UnsupportedJwtException e) {
            log.error("지원되지 않는 JWT 토큰입니다.", e); // 로그 수정
        } catch (IllegalArgumentException e) {
            log.error("JWT 토큰이 잘못되었습니다.", e); // 로그 수정
        }
        return false;
    }
    
    // RefreshToken 유효성 검사
    public boolean validateRefreshToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key2).build().parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.error("잘못된 JWT 서명입니다.", e); // 로그 수정
        } catch (ExpiredJwtException e) {
            log.error("만료된 JWT 토큰입니다.", e); // 로그 수정         
        } catch (UnsupportedJwtException e) {
            log.error("지원되지 않는 JWT 토큰입니다.", e); // 로그 수정
        } catch (IllegalArgumentException e) {
            log.error("JWT 토큰이 잘못되었습니다.", e); // 로그 수정
        }
        return false;
    }

    // 토큰에 담긴 정보 추출
    private Claims parseClaims(String accessToken) {
        try {
            return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken).getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }
}

