const adminAlertSchema = `
CREATE TABLE IF NOT EXISTS admin_alerts (
  alertId CHAR(36) PRIMARY KEY,
  category ENUM('missing_person', 'missing_vehicle', 'suspicious_activity', 'other') NOT NULL,
  status ENUM('active', 'resolved') DEFAULT 'active',
  name VARCHAR(255) NOT NULL,
  timeOfDisappearance DATETIME NOT NULL,
  description TEXT NOT NULL,
  image LONGTEXT,
  address VARCHAR(255),
  location VARCHAR(255),
  createdBy CHAR(36),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (createdBy) REFERENCES users(userId) ON DELETE SET NULL
);
`;

module.exports = adminAlertSchema;
