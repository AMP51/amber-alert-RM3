const tipSchema = `
CREATE TABLE IF NOT EXISTS tips (
  tipId CHAR(36) PRIMARY KEY,
  alertId CHAR(36) NOT NULL,
  userId CHAR(36) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (alertId) REFERENCES admin_alerts(alertId) ON DELETE CASCADE,
  FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE
);
`;

module.exports = tipSchema;
