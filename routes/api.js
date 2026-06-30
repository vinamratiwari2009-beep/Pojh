// ============================================
// SECTION 1: IMPORTS
// ============================================
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const apiController = require('../controllers/apiController');

// ============================================
// SECTION 2: PHONE INTELLIGENCE ROUTES
// ============================================
router.get('/number', auth, apiController.getNumberDetails);
router.get('/email', auth, apiController.getEmailDetails);
router.get('/aadhar', auth, apiController.getAadharDetails);
router.get('/adv', auth, apiController.getAdvDetails);
router.get('/numleak', auth, apiController.getNumLeak);

// ============================================
// SECTION 3: FINANCIAL ROUTES
// ============================================
router.get('/upi', auth, apiController.getUpiDetails);
router.get('/numtoupi', auth, apiController.getNumToUpi);
router.get('/ifsc', auth, apiController.getIfscDetails);
router.get('/pan', auth, apiController.getPanDetails);

// ============================================
// SECTION 4: LOCATION ROUTES
// ============================================
router.get('/pincode', auth, apiController.getPincodeDetails);
router.get('/ip', auth, apiController.getIpDetails);

// ============================================
// SECTION 5: VEHICLE ROUTES
// ============================================
router.get('/vehicle', auth, apiController.getVehicleDetails);
router.get('/veh2num', auth, apiController.getVeh2Num);
router.get('/challan', auth, apiController.getChallanDetails);

// ============================================
// SECTION 6: GAMING ROUTES
// ============================================
router.get('/ff', auth, apiController.getFreeFire);
router.get('/bgmi', auth, apiController.getBgmi);

// ============================================
// SECTION 7: OSINT ROUTES
// ============================================
router.get('/adharfamily', auth, apiController.getAadharFamily);
router.get('/leakinfo', auth, apiController.getLeakInfo);

// ============================================
// SECTION 8: SMS TOOLS
// ============================================
router.get('/bomber', auth, apiController.sendBomber);

// ============================================
// SECTION 9: PAKISTAN ROUTE
// ============================================
router.get('/pk', auth, apiController.getPkDetails);

// ============================================
// SECTION 10: EXPORT
// ============================================
module.exports = router;
