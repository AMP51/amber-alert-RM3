const adminAlertSchema = `
CREATE TABLE IF NOT EXISTS admin_alerts (
category ENUM('missing_person', 'missing_vehicle', 'suspicious_activity') NOT NULL,
  alertId CHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  timeOfDisappearance DATETIME NOT NULL,
  description TEXT NOT NULL,
  image LONGTEXT, 
  createdBy CHAR(36),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (createdBy) REFERENCES users(userId) ON DELETE SET NULL
);
`;

module.exports = adminAlertSchema;
