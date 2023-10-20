package com.project.hakview.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.hakview.entity.MainComment;
import com.project.hakview.entity.Freeboard;

@Repository
public interface CommentRepository extends JpaRepository<MainComment, Long>{
	List<MainComment> findAllByFreeboard(Freeboard freeboard);
}
