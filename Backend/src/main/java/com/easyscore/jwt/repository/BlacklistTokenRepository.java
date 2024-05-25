package com.easyscore.jwt.repository;

import com.easyscore.jwt.model.BlacklistToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BlacklistTokenRepository extends JpaRepository<BlacklistToken, Long> {
    Optional<BlacklistToken> findByToken(String token);
}
