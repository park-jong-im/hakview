package com.project.hakview.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.hakview.entity.RComment;
import com.project.hakview.entity.Review;

@Repository
public interface RCommentRepository extends JpaRepository<RComment, Long>{
	List<RComment> findAllByReview(Review review);
}
