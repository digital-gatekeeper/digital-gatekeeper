package com.digtalGateKeeper.back;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackApplication.class, args);
		System.out.println("Application started successfully.");
		System.out.println("try modify this value to check if it will be updated in the server.");
	}
	
}
