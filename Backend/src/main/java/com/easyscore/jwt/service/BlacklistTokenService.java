package com.easyscore.jwt.service;


import org.springframework.stereotype.Service;
import java.util.HashSet;
import java.util.Set;

@Service
public class BlacklistTokenService {

    private final Set<String> blacklistedTokens = new HashSet<>();

    public void blacklistToken(String token, String username) {
        blacklistedTokens.add(token);
    }

    public boolean isTokenBlacklisted(String token) {
        return blacklistedTokens.contains(token);
    }
}

