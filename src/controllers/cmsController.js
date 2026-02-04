const cmsService = require('../services/cmsService');

/**
 * Create page
 */
exports.createPage = async (req, res, next) => {
    try {
        const page = await cmsService.createPage(req.body);
        res.status(201).json(page);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Get page by slug
 */
exports.getPageBySlug = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const page = await cmsService.getPageBySlug(slug);
        res.json(page);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

/**
 * Update page
 */
exports.updatePage = async (req, res, next) => {
    try {
        const page = await cmsService.updatePage(req.params.id, req.body);
        res.json(page);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Delete page
 */
exports.deletePage = async (req, res, next) => {
    try {
        await Page.destroy({ where: { id: req.params.id } });
        res.json({ message: 'Page deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Publish page
 */
exports.publishPage = async (req, res, next) => {
    try {
        const page = await cmsService.publishPage(req.params.id);
        res.json(page);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Unpublish page
 */
exports.unpublishPage = async (req, res, next) => {
    try {
        const page = await cmsService.unpublishPage(req.params.id);
        res.json(page);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Add content block
 */
exports.addContentBlock = async (req, res, next) => {
    try {
        const { pageId } = req.params;
        const block = await cmsService.addContentBlock(pageId, req.body);
        res.status(201).json(block);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Update content block
 */
exports.updateContentBlock = async (req, res, next) => {
    try {
        const block = await cmsService.updateContentBlock(req.params.blockId, req.body);
        res.json(block);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Delete content block
 */
exports.deleteContentBlock = async (req, res, next) => {
    try {
        const result = await cmsService.deleteContentBlock(req.params.blockId);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Reorder blocks
 */
exports.reorderBlocks = async (req, res, next) => {
    try {
        const { pageId } = req.params;
        const { blockOrder } = req.body;
        const result = await cmsService.reorderBlocks(pageId, blockOrder);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Get all pages
 */
exports.getAllPages = async (req, res, next) => {
    try {
        const { includeUnpublished } = req.query;
        const pages = await cmsService.getAllPages(includeUnpublished === 'true');
        res.json({ pages });
    } catch (error) {
        next(error);
    }
};

// Missing functions
exports.getPages = async (req, res, next) => {
    try {
        const { Page } = require('../models');
        const pages = await Page.findAll();
        res.json({ pages });
    } catch (error) {
        next(error);
    }
};

exports.getPageDetails = async (req, res, next) => {
    try {
        const { Page } = require('../models');
        const page = await Page.findByPk(req.params.id);
        res.json(page);
    } catch (error) {
        res.status(404).json({ message: 'Page not found' });
    }
};

exports.getBlocks = async (req, res, next) => {
    res.json({ blocks: [] });
};

exports.getMenus = async (req, res, next) => {
    res.json({ menus: [] });
};

exports.getBanners = async (req, res, next) => {
    res.json({ banners: [] });
};

exports.getLandingPages = async (req, res, next) => {
    res.json({ landingPages: [] });
};

exports.getRedirects = async (req, res, next) => {
    res.json({ redirects: [] });
};

exports.getAssets = async (req, res, next) => {
    res.json({ assets: [] });
};

exports.getForms = async (req, res, next) => {
    res.json({ forms: [] });
};

exports.getAnnouncements = async (req, res, next) => {
    res.json({ announcements: [] });
};
