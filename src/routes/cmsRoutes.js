const express = require('express');
const router = express.Router();
const cmsController = require('../controllers/cmsController');

router.get('/pages', cmsController.getPages);
router.get('/pages/:id', cmsController.getPageDetails);
router.get('/pages/slug/:slug', cmsController.getPageBySlug);
router.post('/pages', cmsController.createPage);

router.get('/blocks', cmsController.getBlocks);
router.get('/menus', cmsController.getMenus);
router.get('/banners', cmsController.getBanners);
router.get('/landing-pages', cmsController.getLandingPages);
router.get('/redirects', cmsController.getRedirects);
router.get('/assets', cmsController.getAssets);
router.get('/forms', cmsController.getForms);
router.get('/announcements', cmsController.getAnnouncements);

module.exports = router;
