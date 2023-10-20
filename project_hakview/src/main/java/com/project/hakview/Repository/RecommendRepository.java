package com.project.hakview.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.hakview.entity.Article;
import com.project.hakview.entity.Recommend;

@Repository
public interface RecommendRepository  extends JpaRepository<Recommend, Long>{
   List<Recommend> findAllByArticle(Article article);
   @Query("SELECT CASE WHEN COUNT(r) > 0 THEN true ELSE false END FROM Recommend r WHERE r.ac_user.serial = :member_Id")
    boolean existsByAC_UserSerial(@Param("member_Id") Long memberId);

    @Query("SELECT CASE WHEN COUNT(r) > 0 THEN true ELSE false END FROM Recommend r WHERE r.article.serial = :article_Id")
    boolean existsByArticleSerial(@Param("article_Id") Long articleId);
}
