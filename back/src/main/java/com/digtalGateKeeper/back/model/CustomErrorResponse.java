package com.digtalGateKeeper.back.model;

public class CustomErrorResponse {
    private int errorCode;
    private String errorMessage;
    private String errorDescription;

    public CustomErrorResponse(int status, String message) {
        this.errorCode = status;
        this.errorMessage = message;
    }

    public CustomErrorResponse(int status, String message, String description) {
        this.errorCode = status;
        this.errorMessage = message;
        this.errorDescription = description;
    }

    public void setErrorCode(int errorCode) {
        this.errorCode = errorCode;
    }

    public int getErrorCode() {
        return errorCode;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorDescription(String errorDescription) {
        this.errorDescription = errorDescription;
    }

    public String getErrorDescription() {
        return errorDescription;
    }

}
