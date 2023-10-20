package com.project.hakview.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.hakview.entity.Freeboard;
import com.project.hakview.entity.Recommends;

@Repository
public interface RecommendsRepository  extends JpaRepository<Recommends, Long>{
   List<Recommends> findAllByFreeboard(Freeboard freeboard);
   @Query("SELECT CASE WHEN COUNT(r) > 0 THEN true ELSE false END FROM Recommends r WHERE r.ac_user.serial = :member_Id")
    boolean existsByAC_UserSerial(@Param("member_Id") Long memberId);

    @Query("SELECT CASE WHEN COUNT(r) > 0 THEN true ELSE false END FROM Recommends r WHERE r.freeboard.serial = :freeboard_Id")
    boolean existsByFreeboardSerial(@Param("freeboard_Id") Long freeboardId);
}
