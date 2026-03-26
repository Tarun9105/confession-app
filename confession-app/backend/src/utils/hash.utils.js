import crypto from 'crypto';

/**
 * Hashes a device ID using HMAC with a secret key for security.
 * @param {string} deviceId - The raw device ID from headers.
 * @returns {string} - The hashed device ID.
 */
export const hashDeviceId = (deviceId) => {
  if (!deviceId) return '';
  
  // In production, SECRET_HASH_KEY should be an environment variable
  const secret = process.env.DEVICE_ID_SECRET || 'confession-app-secret-default';
  
  return crypto
    .createHmac('sha256', secret)
    .update(deviceId)
    .digest('hex');
};
