package com.etf.ppis.lambda.telenash.controller.errors;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class IncidentNotFoundException extends RuntimeException
{
    public IncidentNotFoundException(String id)
    {
        super("Incident with id: " + id + " not found.");
    }
}