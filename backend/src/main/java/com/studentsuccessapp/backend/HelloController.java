package com.studentsuccessapp.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1") // Base path for all endpoints in this controller
public class HelloController {

    @GetMapping("/hello")
    public String sayHello() {
        return "Hello from the Spring Boot Backend!";
    }

    // We can add another simple endpoint that returns a structured object (JSON)
    record Message(String content) {}

    @GetMapping("/message")
    public Message getMessage() {
        return new Message("This is a structured message from the backend!");
    }
}