package com.digtalGateKeeper.back;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import static com.digtalGateKeeper.back.utils.PrintUtils.print;
import java.time.LocalDateTime;
import com.digtalGateKeeper.back.utils.LogUtils;

@SpringBootApplication
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class BackApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackApplication.class, args);
	}

	public BackApplication() {
		print("BackApplication constructor");
		print("application start at " + LocalDateTime.now());
		LogUtils logUtils = new LogUtils();
		logUtils.log("application start at " + LocalDateTime.now());
	}

}
