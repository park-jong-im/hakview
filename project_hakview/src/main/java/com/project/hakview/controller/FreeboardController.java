package com.project.hakview.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.hakview.dto.ChangeFreeboardRequestDto;
import com.project.hakview.dto.CreateFreeboardRequestDto;
import com.project.hakview.dto.FageResponseDto;
import com.project.hakview.dto.FreeboardResponseDto;
import com.project.hakview.dto.MessageDto;
import com.project.hakview.service.FreeboardService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/freeboard")
public class FreeboardController {
	private final FreeboardService freeboardService;
	
	@GetMapping("/page")
    public ResponseEntity<Page<FageResponseDto>> pageFreeboard(@RequestParam(name = "page") int page) {
        return ResponseEntity.ok(freeboardService.pageFreeboard(page));
    }

    @GetMapping("/one")
    public ResponseEntity<FreeboardResponseDto> getOneFreeboard(@RequestParam(name = "serial") Long serial) {
        return ResponseEntity.ok(freeboardService.oneFreeboard(serial));
    }

    @PostMapping("/")
    public ResponseEntity<FreeboardResponseDto> createFreeboard(@RequestBody CreateFreeboardRequestDto request) {
        return ResponseEntity.ok(freeboardService.postFreeboard(request.getTitle(), request.getBody()));
    }

    @GetMapping("/change")
    public ResponseEntity<FreeboardResponseDto> getChangeFreeboard(@RequestParam(name = "serial") Long serial) {
        return ResponseEntity.ok(freeboardService.oneFreeboard((serial)));
    }

    @PutMapping("/")
    public ResponseEntity<FreeboardResponseDto> putChangeFreeboard(@RequestBody ChangeFreeboardRequestDto request) {
        return ResponseEntity.ok(freeboardService.changeFreeboard(
                request.getSerial(), request.getTitle(), request.getBody()
        ));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<MessageDto> deleteFreeboard(@RequestParam(name = "serial") Long serial) {
    	freeboardService.deleteFreeboard(serial);
        return ResponseEntity.ok(new MessageDto("Success"));
    }
	//타이틀로 검색
	@GetMapping("/search")
	public ResponseEntity<Page<FageResponseDto>> search(@RequestParam(name = "keyword") String keyword,
	                                                    Pageable pageable) {
	    Page<FageResponseDto> searchResult = freeboardService.search(keyword, pageable)
	            .map(freeboard -> FageResponseDto.of(freeboard)); // Article을 PageResponseDto로 매핑

	    return ResponseEntity.ok(searchResult);
	}
	
	//닉네임으로 검색
    @GetMapping("/searchByNickname")
    public ResponseEntity<Page<FageResponseDto>> searchByNickname(@RequestParam(name = "nickname") String nickname,
                                                        Pageable pageable) {
        Page<FageResponseDto> searchResult = freeboardService.searchByNickname(nickname, pageable)
                .map(freeboard -> FageResponseDto.of(freeboard)); // Article을 PageResponseDto로 매핑

        return ResponseEntity.ok(searchResult);
    }
    
    //타이틀,바디로 검색
    @GetMapping("/searchOr")
    public ResponseEntity<Page<FageResponseDto>> searchByTitleOrBody(@RequestParam(name = "titlekeyword") String titlekeyword,
    		@RequestParam(name = "bodykeyword") String bodykeyword, Pageable pageable) {
    	Page<FageResponseDto> searchResult = freeboardService.searchByTitleOrBody(titlekeyword, bodykeyword, pageable)
    			.map(freeboard -> FageResponseDto.of(freeboard));
    
    	return ResponseEntity.ok(searchResult);
    }
}




