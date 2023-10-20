package com.project.hakview.controller;

import java.util.List;

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

import com.project.hakview.dto.ChangeReviewRequestDto;
import com.project.hakview.dto.CreateReviewRequestDto;
import com.project.hakview.dto.MessageDto;
import com.project.hakview.dto.RageResponseDto;
import com.project.hakview.dto.ReviewResponseDto;
import com.project.hakview.service.ReviewService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/review")
public class ReviewController {
	private final ReviewService reviewService;
	
	@GetMapping("/list")
    public ResponseEntity<List<ReviewResponseDto>> getRComments(@RequestParam(name = "reviewserial") Long reviewSerial) {
        return ResponseEntity.ok(reviewService.getReview(reviewSerial));
    }
	
	@GetMapping("/page")
	public ResponseEntity<Page<RageResponseDto>> pageReview(@RequestParam(name = "page") int page) {
		return ResponseEntity.ok(reviewService.pageReview(page));
	}
	
	@GetMapping("/one")
	public ResponseEntity<ReviewResponseDto> getOneReview(@RequestParam(name = "serial") Long serial) {
		return ResponseEntity.ok(reviewService.oneReview(serial));
	}
	
	@PostMapping("/")
	public ResponseEntity<ReviewResponseDto> createReview(@RequestBody CreateReviewRequestDto request) {
		return ResponseEntity.ok(reviewService.postReview(request.getTitle(), request.getBody(), request.getStarpoint1(), request.getStarpoint2(), request.getStarpoint3(), request.getStarpoint4(), request.getStarpoint5()
				,request.getTag1(), request.getTag2(), request.getTag3(), request.getAc_title(), request.getAc_name(), request.getSerial()));
		
	}
	
	@GetMapping("/change")
	public ResponseEntity<ReviewResponseDto> getChangeReview(@RequestParam(name = "serial") Long serial) {
		return ResponseEntity.ok(reviewService.oneReview(serial));
	}
	
	@PutMapping("/")
	public ResponseEntity<ReviewResponseDto> putChangeReview(@RequestBody ChangeReviewRequestDto request) {
		return ResponseEntity.ok(reviewService.changeReview(request.getSerial(), request.getTitle(), request.getBody(), request.getStarpoint1(), request.getStarpoint2(), request.getStarpoint3(), request.getStarpoint4(), request.getStarpoint5()
				, request.getTag1(), request.getTag2(), request.getTag3()));
	}
	
	@DeleteMapping("/delete")
	public ResponseEntity<MessageDto> deleteReview(@RequestParam(name = "serial") Long serial) {
		reviewService.deleteReview(serial);
		return ResponseEntity.ok(new MessageDto("Success"));
	}
	
	//타이틀로 검색
	@GetMapping("/search")
	public ResponseEntity<Page<RageResponseDto>> search(@RequestParam(name = "keyword") String keyword,
														@RequestParam(name = "page", defaultValue = "1") int page, // 기본값 0
											            @RequestParam(name = "size", defaultValue = "10") int size, // 페이지 크기를 10으로 설정
	                                                    Pageable pageable) {
		pageable = PageRequest.of(page-1, size, Sort.by(Sort.Order.desc("createdAt")));
		
	    Page<RageResponseDto> searchResult = reviewService.search(keyword, pageable)
	            .map(review -> RageResponseDto.of(review)); // Article을 PageResponseDto로 매핑

	    return ResponseEntity.ok(searchResult);
	}
	
	//닉네임으로 검색
    @GetMapping("/searchByNickname")
    public ResponseEntity<Page<RageResponseDto>> searchByNickname(@RequestParam(name = "nickname") String nickname,
                                                        Pageable pageable) {
        Page<RageResponseDto> searchResult = reviewService.searchByNickname(nickname, pageable)
                .map(review -> RageResponseDto.of(review)); // Article을 PageResponseDto로 매핑

        return ResponseEntity.ok(searchResult);
    }
    
    //타이틀,바디로 검색
    @GetMapping("/searchOr")
    public ResponseEntity<Page<RageResponseDto>> searchByTitleOrBody(@RequestParam(name = "titlekeyword") String titlekeyword,
    		@RequestParam(name = "bodykeyword") String bodykeyword, Pageable pageable) {
    	Page<RageResponseDto> searchResult = reviewService.searchByTitleOrBody(titlekeyword, bodykeyword, pageable)
    			.map(review -> RageResponseDto.of(review));
    
    	return ResponseEntity.ok(searchResult);
    }
}
