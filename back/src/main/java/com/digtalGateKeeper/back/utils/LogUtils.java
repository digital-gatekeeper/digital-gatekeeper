package com.digtalGateKeeper.back.utils;

import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import static com.digtalGateKeeper.back.utils.PrintUtils.print;

public class LogUtils {
    private static final String logDirectory = "logs";
    private static final String logFileExtension = ".log";
    private static final String filePath;

    static {
        String currentDate = LocalDate.now().format(DateTimeFormatter.ISO_LOCAL_DATE);
        filePath = logDirectory + "/" + currentDate + logFileExtension;

        try {
            java.nio.file.Files.createDirectories(java.nio.file.Paths.get(logDirectory));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public <T> void log(T message) {
        writeLogOnFile(message);
    }

    private <T> void writeLogOnFile(T message) {
        try (FileWriter writer = new FileWriter(filePath, true)) {
            writer.write(message.toString() + "\n");
            print("Data has been written to the file.");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
