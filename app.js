// ============================================
// SECTION 1: IMPORTS
// ============================================
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// ============================================
// SECTION 2: CONFIGURATION
// ============================================
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// ============================================
// SECTION 3: MIDDLEWARE
// ============================================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================
// SECTION 4: ROUTES
// ============================================
app.use('/api', require('./routes/api'));
app.use('/admin-panel', require('./routes/admin'));

// ============================================
// SECTION 5: ADMIN PANEL
// ============================================
app.get('/admin-panel', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'admin', 'index.html'));
});

// ============================================
// SECTION 6: ERROR HANDLING
// ============================================
app.use((req, res) => {
  res.status(404).json({ 
    status: false, 
    error: 'Endpoint not found',
    api_by: '@kingxgodhu'
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    status: false, 
    error: 'Internal server error',
    api_by: '@kingxgodhu'
  });
});

// ============================================
// SECTION 7: SERVER START
// ============================================
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Admin Panel: http://localhost:${PORT}/admin-panel`);
});
