const messageSchema = `
CREATE TABLE IF NOT EXISTS messages (
  messageId CHAR(36) PRIMARY KEY,
    content TEXT NOT NULL,
    senderName VARCHAR(255) NOT NULL,
    createdBy CHAR(36),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (createdBy) REFERENCES users(userId) ON DELETE SET NULL
);
`;

module.exports = messageSchema;