package com.project.hakview.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.hakview.dto.ArticleResponseDto;
import com.project.hakview.dto.ChangeArticleRequestDto;
import com.project.hakview.dto.CreateArticleRequestDto;
import com.project.hakview.dto.MessageDto;
import com.project.hakview.dto.PageResponseDto;
import com.project.hakview.service.ArticleService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/article")
public class AritlcleController {
	private final ArticleService articleService;
	
	@GetMapping("/page")
	public ResponseEntity<Page<PageResponseDto>> pageArticle(@RequestParam(name = "page") int page) {
		return ResponseEntity.ok(articleService.pageArticle(page));
	}
	
	@GetMapping("/one")
	public ResponseEntity<ArticleResponseDto> getOneArticle(@RequestParam(name = "serial") Long serial) {
		return ResponseEntity.ok(articleService.oneArticle(serial));
	}
	
	@PostMapping("/")
	public ResponseEntity<ArticleResponseDto> createArticle(@RequestBody CreateArticleRequestDto request) {
		return ResponseEntity.ok(articleService.postArticle(request.getTitle(), request.getBody(),
				request.getTag1(), request.getTag2(), request.getTag3(), request.getAc_name(), request.getAc_address(), request.getAc_phone()));
		
	}
	
	@GetMapping("/change")
	public ResponseEntity<ArticleResponseDto> getChangeArticle(@RequestParam(name = "serial") Long serial) {
		return ResponseEntity.ok(articleService.oneArticle(serial));
	}
	
	@PutMapping("/")
	public ResponseEntity<ArticleResponseDto> putChangeArticle(@RequestBody ChangeArticleRequestDto request) {
		return ResponseEntity.ok(articleService.changeArticle(request.getSerial(), request.getTitle(), request.getBody(),
				request.getTag1(), request.getTag2(), request.getTag3(), request.getAc_name(), request.getAc_address(), request.getAc_phone()));
	}
	
	@DeleteMapping("/delete")
	public ResponseEntity<MessageDto> deleteArticle(@RequestParam(name = "serial") Long serial) {
		articleService.deleteArticle(serial);
		return ResponseEntity.ok(new MessageDto("Success"));
	}
	
	//타이틀로 검색
	@GetMapping("/search")
	public ResponseEntity<Page<PageResponseDto>> search(@RequestParam(name = "keyword") String keyword,
														@RequestParam(name = "page", defaultValue = "1") int page, // 기본값 0
											            @RequestParam(name = "size", defaultValue = "10") int size, // 페이지 크기를 10으로 설정
	                                                    Pageable pageable) {
		pageable = PageRequest.of(page-1, size, Sort.by(Sort.Order.desc("createAt")));
		
	    Page<PageResponseDto> searchResult = articleService.search(keyword, pageable)
	            .map(article -> PageResponseDto.of(article)); // Article을 PageResponseDto로 매핑

	    return ResponseEntity.ok(searchResult);
	}
	
	//닉네임으로 검색
    @GetMapping("/searchByNickname")
    public ResponseEntity<Page<PageResponseDto>> searchByNickname(@RequestParam(name = "nickname") String nickname,
                                                        Pageable pageable) {
        Page<PageResponseDto> searchResult = articleService.searchByNickname(nickname, pageable)
                .map(article -> PageResponseDto.of(article)); // Article을 PageResponseDto로 매핑

        return ResponseEntity.ok(searchResult);
    }
    
    //타이틀,바디로 검색
    @GetMapping("/searchOr")
    public ResponseEntity<Page<PageResponseDto>> searchByTitleOrBody(@RequestParam(name = "titlekeyword") String titlekeyword, 
            @RequestParam(name = "bodykeyword") String bodykeyword, Pageable pageable) {
        Page<PageResponseDto> searchResult = articleService.searchByTitleOrBody(titlekeyword, bodykeyword, pageable)
                .map(article -> PageResponseDto.of(article)); // Article을 PageResponseDto로 매핑

        return ResponseEntity.ok(searchResult);
    }
    
  //태그1 검색
    @GetMapping("/tag1")
    public ResponseEntity<Page<PageResponseDto>> searchByTag1(@RequestParam(name = "tag1") String tag1, Pageable pageable) {
    	Page<PageResponseDto> searchResult = articleService.searchByTag1(tag1, pageable)
    			.map(article -> PageResponseDto.of(article));
    	
    	return ResponseEntity.ok(searchResult);
    }
    
  //태그2 검색
    @GetMapping("/tag2")
    public ResponseEntity<Page<PageResponseDto>> searchByTag2(@RequestParam(name = "tag2") String tag2, Pageable pageable) {
    	Page<PageResponseDto> searchResult = articleService.searchByTag2(tag2, pageable)
    			.map(article -> PageResponseDto.of(article));
    	
    	return ResponseEntity.ok(searchResult);
    }
    
  //태그3 검색
    @GetMapping("/tag3")
    public ResponseEntity<Page<PageResponseDto>> searchByTag3(@RequestParam(name = "tag3") String tag3, Pageable pageable) {
    	Page<PageResponseDto> searchResult = articleService.searchByTag3(tag3, pageable)
    			.map(article -> PageResponseDto.of(article));
    	
    	return ResponseEntity.ok(searchResult);
    }
}


