package de.holalchi.springwebsocketjava.model;

public class Message {
    private String sentMessage;

    public Message() {
    }

    public Message(String sentMessage) {
        this.sentMessage = sentMessage;
    }

    public String getSentMessage() {
        return sentMessage;
    }

    public void setSentMessage(String sentMessage) {
        this.sentMessage = sentMessage;
    }
}
