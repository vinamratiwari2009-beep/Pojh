// ============================================
// SECTION 1: IMPORTS
// ============================================
const axios = require('axios');
const ORIGINAL_API_URL = process.env.ORIGINAL_API_URL;

// ============================================
// SECTION 2: FORWARD REQUEST HELPER
// ============================================
const forwardRequest = async (req, res, endpoint) => {
  try {
    // Remove our key from query
    const params = { ...req.query };
    delete params.key;
    
    // Forward to original API
    const response = await axios.get(`${ORIGINAL_API_URL}${endpoint}`, {
      params: params,
      timeout: 25000
    });

    // Modify response - replace @ftgamer2 with @kingxgodhu
    let data = response.data;
    const jsonString = JSON.stringify(data);
    const modifiedString = jsonString.replace(/@ftgamer2/g, '@kingxgodhu');
    const modifiedData = JSON.parse(modifiedString);

    res.json(modifiedData);
  } catch (error) {
    if (error.response) {
      let errorData = error.response.data;
      const jsonString = JSON.stringify(errorData);
      const modifiedString = jsonString.replace(/@ftgamer2/g, '@kingxgodhu');
      const modifiedError = JSON.parse(modifiedString);
      res.status(error.response.status).json(modifiedError);
    } else {
      res.status(503).json({
        status: false,
        error: 'Upstream timeout - retry in a moment',
        api_by: '@kingxgodhu'
      });
    }
  }
};

// ============================================
// SECTION 3: PHONE INTELLIGENCE ENDPOINTS
// ============================================
exports.getNumberDetails = (req, res) => forwardRequest(req, res, '/api/number');
exports.getEmailDetails = (req, res) => forwardRequest(req, res, '/api/email');
exports.getAadharDetails = (req, res) => forwardRequest(req, res, '/api/aadhar');
exports.getAdvDetails = (req, res) => forwardRequest(req, res, '/api/adv');
exports.getNumLeak = (req, res) => forwardRequest(req, res, '/api/numleak');

// ============================================
// SECTION 4: FINANCIAL ENDPOINTS
// ============================================
exports.getUpiDetails = (req, res) => forwardRequest(req, res, '/api/upi');
exports.getNumToUpi = (req, res) => forwardRequest(req, res, '/api/numtoupi');
exports.getIfscDetails = (req, res) => forwardRequest(req, res, '/api/ifsc');
exports.getPanDetails = (req, res) => forwardRequest(req, res, '/api/pan');

// ============================================
// SECTION 5: LOCATION ENDPOINTS
// ============================================
exports.getPincodeDetails = (req, res) => forwardRequest(req, res, '/api/pincode');
exports.getIpDetails = (req, res) => forwardRequest(req, res, '/api/ip');

// ============================================
// SECTION 6: VEHICLE ENDPOINTS
// ============================================
exports.getVehicleDetails = (req, res) => forwardRequest(req, res, '/api/vehicle');
exports.getVeh2Num = (req, res) => forwardRequest(req, res, '/api/veh2num');
exports.getChallanDetails = (req, res) => forwardRequest(req, res, '/api/challan');

// ============================================
// SECTION 7: GAMING ENDPOINTS
// ============================================
exports.getFreeFire = (req, res) => forwardRequest(req, res, '/api/ff');
exports.getBgmi = (req, res) => forwardRequest(req, res, '/api/bgmi');

// ============================================
// SECTION 8: OSINT ENDPOINTS
// ============================================
exports.getAadharFamily = (req, res) => forwardRequest(req, res, '/api/adharfamily');
exports.getLeakInfo = (req, res) => forwardRequest(req, res, '/api/leakinfo');

// ============================================
// SECTION 9: SMS TOOLS
// ============================================
exports.sendBomber = (req, res) => forwardRequest(req, res, '/api/bomber');

// ============================================
// SECTION 10: PAKISTAN ENDPOINT
// ============================================
exports.getPkDetails = (req, res) => forwardRequest(req, res, '/api/pk');
