const chatMessagesSchema = `
CREATE TABLE chat_messages (
    messageId VARCHAR(36) PRIMARY KEY,
    userId VARCHAR(36),
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(userId)
);
`;

module.exports = chatMessagesSchema;
