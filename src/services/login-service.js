const { LoginHistory } = require('../models/LoginHistory');

async function createLoginHistory(userId, ipAddress, userAgent) {
  try {
    await LoginHistory.create({
      userId,
      ipAddress,
      userAgent,
      loginAt: new Date()
    });
  } catch (err) {
    console.error('Failed to store login history:', err);
  }
}

module.exports = {createLoginHistory}
