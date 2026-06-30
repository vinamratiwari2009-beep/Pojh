// ============================================
// SECTION 1: IMPORTS
// ============================================
const keys = require('../keys');

// ============================================
// SECTION 2: AUTHENTICATION MIDDLEWARE
// ============================================
module.exports = (req, res, next) => {
  // Check API key
  const apiKey = req.query.key || req.headers['x-api-key'];
  
  if (!apiKey) {
    return res.status(401).json({
      status: false,
      error: 'No API key provided',
      api_by: '@kingxgodhu'
    });
  }

  const keyData = keys[apiKey];
  
  if (!keyData || !keyData.isActive) {
    return res.status(403).json({
      status: false,
      error: 'Invalid or inactive API key',
      api_by: '@kingxgodhu'
    });
  }

  // Check expiry
  if (keyData.expiresAt && new Date() > new Date(keyData.expiresAt)) {
    return res.status(403).json({
      status: false,
      error: 'API key expired',
      api_by: '@kingxgodhu',
      expiresAt: keyData.expiresAt
    });
  }

  // Check endpoint access
  const endpoint = req.path;
  if (!keyData.allowedEndpoints.includes('all') && 
      !keyData.allowedEndpoints.includes(endpoint)) {
    return res.status(403).json({
      status: false,
      error: 'Endpoint not allowed for this key',
      api_by: '@kingxgodhu',
      allowedEndpoints: keyData.allowedEndpoints
    });
  }

  // Check rate limit
  if (keyData.usageCount >= keyData.rateLimit) {
    return res.status(429).json({
      status: false,
      error: 'Rate limit exceeded',
      api_by: '@kingxgodhu',
      limit: keyData.rateLimit,
      used: keyData.usageCount
    });
  }

  // Increment usage
  keyData.usageCount += 1;
  keys[apiKey] = keyData;

  req.apiKey = keyData;
  next();
};
