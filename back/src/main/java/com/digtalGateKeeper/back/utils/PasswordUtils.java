package com.digtalGateKeeper.back.utils;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class PasswordUtils {

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public String encodePassword(String password) {
        return passwordEncoder.encode(password);
    }
}