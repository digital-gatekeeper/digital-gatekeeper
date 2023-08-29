package com.digtalGateKeeper.back.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.NoHandlerFoundException;

import com.digtalGateKeeper.back.model.CustomErrorResponse;

@ControllerAdvice
public class CustomErrorController {

    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<Object> handleNoHandlerFoundException(NoHandlerFoundException ex) {
        String message = "The requested resource was not found.";
        HttpStatus status = HttpStatus.NOT_FOUND;
        CustomErrorResponse errorResponse = new CustomErrorResponse(status.value(), message);

        return new ResponseEntity<>(errorResponse, status);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleGenericException(Exception ex) {
        String message = "An error occurred while processing your request.";

        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        CustomErrorResponse errorResponse = new CustomErrorResponse(status.value(), message, ex.getMessage());

        return new ResponseEntity<>(errorResponse, status);
    }
}
