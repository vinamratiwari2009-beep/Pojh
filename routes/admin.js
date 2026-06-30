// ============================================
// SECTION 1: IMPORTS
// ============================================
const express = require('express');
const router = express.Router();
const keys = require('../keys');
const crypto = require('crypto');

// ============================================
// SECTION 2: AVAILABLE ENDPOINTS LIST
// ============================================
const AVAILABLE_ENDPOINTS = [
  '/api/number', '/api/email', '/api/aadhar', '/api/adv', '/api/numleak',
  '/api/upi', '/api/numtoupi', '/api/ifsc', '/api/pan',
  '/api/pincode', '/api/ip',
  '/api/vehicle', '/api/veh2num', '/api/challan',
  '/api/ff', '/api/bgmi',
  '/api/adharfamily', '/api/leakinfo',
  '/api/bomber', '/api/pk'
];

// ============================================
// SECTION 3: GENERATE NEW KEY
// ============================================
router.post('/generate-key', (req, res) => {
  try {
    const { name, rateLimit, expiresIn, allowedEndpoints } = req.body;
    
    const newKey = {
      key: `kingxgodhu_${crypto.randomBytes(16).toString('hex')}`,
      name: name || 'Generated Key',
      rateLimit: parseInt(rateLimit) || 1000,
      usageCount: 0,
      isActive: true,
      createdAt: new Date(),
      expiresAt: expiresIn ? new Date(Date.now() + parseInt(expiresIn) * 24 * 60 * 60 * 1000) : null,
      allowedEndpoints: allowedEndpoints || ['all'],
      createdBy: '@kingxgodhu'
    };

    keys[newKey.key] = newKey;
    
    res.json({
      success: true,
      message: 'API key generated successfully',
      api_by: '@kingxgodhu',
      data: newKey
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      api_by: '@kingxgodhu'
    });
  }
});

// ============================================
// SECTION 4: GET ALL KEYS
// ============================================
router.get('/keys', (req, res) => {
  try {
    const allKeys = Object.values(keys);
    res.json({
      success: true,
      total: allKeys.length,
      api_by: '@kingxgodhu',
      data: allKeys
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      api_by: '@kingxgodhu'
    });
  }
});

// ============================================
// SECTION 5: GET STATISTICS
// ============================================
router.get('/stats', (req, res) => {
  try {
    const allKeys = Object.values(keys);
    const totalKeys = allKeys.length;
    const activeKeys = allKeys.filter(k => k.isActive).length;
    const totalUsage = allKeys.reduce((sum, k) => sum + k.usageCount, 0);

    res.json({
      success: true,
      api_by: '@kingxgodhu',
      data: { totalKeys, activeKeys, totalUsage }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      api_by: '@kingxgodhu'
    });
  }
});

// ============================================
// SECTION 6: UPDATE KEY DETAILS
// ============================================
router.put('/update-key/:keyId', (req, res) => {
  try {
    const { keyId } = req.params;
    const { rateLimit, expiresIn, allowedEndpoints, isActive } = req.body;

    if (!keys[keyId]) {
      return res.status(404).json({
        success: false,
        error: 'Key not found',
        api_by: '@kingxgodhu'
      });
    }

    if (rateLimit) keys[keyId].rateLimit = parseInt(rateLimit);
    if (expiresIn) {
      keys[keyId].expiresAt = new Date(Date.now() + parseInt(expiresIn) * 24 * 60 * 60 * 1000);
    }
    if (allowedEndpoints) keys[keyId].allowedEndpoints = allowedEndpoints;
    if (isActive !== undefined) keys[keyId].isActive = isActive;

    res.json({
      success: true,
      message: 'Key updated successfully',
      api_by: '@kingxgodhu',
      data: keys[keyId]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      api_by: '@kingxgodhu'
    });
  }
});

// ============================================
// SECTION 7: TOGGLE KEY STATUS
// ============================================
router.patch('/toggle-key/:keyId', (req, res) => {
  try {
    const { keyId } = req.params;
    
    if (!keys[keyId]) {
      return res.status(404).json({
        success: false,
        error: 'Key not found',
        api_by: '@kingxgodhu'
      });
    }

    keys[keyId].isActive = !keys[keyId].isActive;
    res.json({
      success: true,
      message: `Key ${keys[keyId].isActive ? 'activated' : 'deactivated'} successfully`,
      api_by: '@kingxgodhu',
      data: keys[keyId]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      api_by: '@kingxgodhu'
    });
  }
});

// ============================================
// SECTION 8: DELETE KEY
// ============================================
router.delete('/delete-key/:keyId', (req, res) => {
  try {
    const { keyId } = req.params;
    
    if (!keys[keyId]) {
      return res.status(404).json({
        success: false,
        error: 'Key not found',
        api_by: '@kingxgodhu'
      });
    }

    delete keys[keyId];
    res.json({
      success: true,
      message: 'Key deleted successfully',
      api_by: '@kingxgodhu'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      api_by: '@kingxgodhu'
    });
  }
});

// ============================================
// SECTION 9: GET AVAILABLE ENDPOINTS
// ============================================
router.get('/endpoints', (req, res) => {
  res.json({
    success: true,
    api_by: '@kingxgodhu',
    data: AVAILABLE_ENDPOINTS
  });
});

// ============================================
// SECTION 10: EXPORT
// ============================================
module.exports = router;
