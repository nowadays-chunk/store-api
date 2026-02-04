const { Page, ContentBlock } = require('../models');

exports.getPages = async (req, res, next) => {
    try {
        const pages = await Page.findAll();
        res.json(pages);
    } catch (error) {
        next(error);
    }
};

exports.getPageBySlug = async (req, res, next) => {
    try {
        const page = await Page.findOne({ where: { slug: req.params.slug } });
        if (!page) return res.status(404).json({ message: 'Page not found' });
        res.json(page);
    } catch (error) {
        next(error);
    }
};

exports.createPage = async (req, res, next) => {
    try {
        const page = await Page.create(req.body);
        res.status(201).json(page);
    } catch (error) {
        next(error);
    }
};

exports.getBlocks = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.getMenus = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.getBanners = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.getLandingPages = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.getRedirects = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.getAssets = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.getForms = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.getAnnouncements = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
exports.getPageDetails = async (req, res, next) => { res.status(501).json({ message: 'Not implemented' }); };
