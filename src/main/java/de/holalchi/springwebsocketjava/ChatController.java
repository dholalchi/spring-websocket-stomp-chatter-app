package de.holalchi.springwebsocketjava;

import de.holalchi.springwebsocketjava.model.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ChatController {

    @MessageMapping("/msg")
    @SendTo("/topic/AB")
    public Message hello(Message message) {
        return new Message(message.getSentMessage());
    }

    @GetMapping("/A")
    public String profileA() {
        return "profileA";
    }

    @GetMapping("/B")
    public String profileB() {
        return "profileB";
    }
}
