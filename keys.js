// ============================================
// SECTION 1: IN-MEMORY STORAGE
// ============================================
const keys = {};

// ============================================
// SECTION 2: DEFAULT ADMIN KEY
// ============================================
keys['admin-key-123'] = {
  key: 'admin-key-123',
  name: 'Admin Key',
  rateLimit: 999999,
  usageCount: 0,
  isActive: true,
  createdAt: new Date(),
  expiresAt: null,
  allowedEndpoints: ['all'],
  createdBy: '@kingxgodhu'
};

// ============================================
// SECTION 3: EXPORT
// ============================================
module.exports = keys;