// api-routes.js
// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});
// Import controller
var weaveController = require('../controllers/weaveController');

// Export API routes
router.route('/weaves')
    .get(weaveController.index)
    .post(weaveController.new)
    .delete(weaveController.delete)
router.route('/weaves/:id')
    .get(weaveController.fetch)
    .delete(weaveController.delete)
    
module.exports = router;