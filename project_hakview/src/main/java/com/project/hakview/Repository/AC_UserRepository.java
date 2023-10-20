package com.project.hakview.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.hakview.entity.AC_User;

@Repository
public interface AC_UserRepository extends JpaRepository<AC_User, Long> {
    Optional<AC_User> findById(String id);
    boolean existsById(String id);
    
    AC_User findByPhoneAndBirth(String phone, String birth);
    
    Optional<AC_User> findByPassword(String password);
}
