package com.project.hakview.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.hakview.entity.RRecommend;
import com.project.hakview.entity.Review;

@Repository
public interface RRecommendRepository extends JpaRepository<RRecommend, Long> {
	List<RRecommend> findAllByReview(Review review);
	   @Query("SELECT CASE WHEN COUNT(r) > 0 THEN true ELSE false END FROM RRecommend r WHERE r.ac_user.serial = :member_Id")
	    boolean existsByAC_UserSerial(@Param("member_Id") Long memberId);

	    @Query("SELECT CASE WHEN COUNT(r) > 0 THEN true ELSE false END FROM RRecommend r WHERE r.review.serial = :review_Id")
	    boolean existsByReviewSerial(@Param("review_Id") Long reviewId);
}
