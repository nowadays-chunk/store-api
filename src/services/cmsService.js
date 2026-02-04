const { Page, ContentBlock, sequelize } = require('../models');

class CMSService {
    /**
     * Create page
     */
    async createPage(pageData) {
        const page = await Page.create(pageData);
        return page;
    }

    /**
     * Get page by slug
     */
    async getPageBySlug(slug) {
        const page = await Page.findOne({
            where: { slug, isPublished: true },
            include: [{ model: ContentBlock, as: 'blocks' }]
        });

        if (!page) throw new Error('Page not found');
        return page;
    }

    /**
     * Update page
     */
    async updatePage(pageId, updates) {
        const page = await Page.findByPk(pageId);
        if (!page) throw new Error('Page not found');

        await page.update(updates);
        return page;
    }

    /**
     * Publish page
     */
    async publishPage(pageId) {
        const page = await Page.findByPk(pageId);
        if (!page) throw new Error('Page not found');

        page.isPublished = true;
        page.publishedAt = new Date();
        await page.save();

        return page;
    }

    /**
     * Unpublish page
     */
    async unpublishPage(pageId) {
        const page = await Page.findByPk(pageId);
        if (!page) throw new Error('Page not found');

        page.isPublished = false;
        await page.save();

        return page;
    }

    /**
     * Add content block to page
     */
    async addContentBlock(pageId, blockData) {
        const page = await Page.findByPk(pageId);
        if (!page) throw new Error('Page not found');

        const block = await ContentBlock.create({
            ...blockData,
            pageId
        });

        return block;
    }

    /**
     * Update content block
     */
    async updateContentBlock(blockId, updates) {
        const block = await ContentBlock.findByPk(blockId);
        if (!block) throw new Error('Content block not found');

        await block.update(updates);
        return block;
    }

    /**
     * Delete content block
     */
    async deleteContentBlock(blockId) {
        const block = await ContentBlock.findByPk(blockId);
        if (!block) throw new Error('Content block not found');

        await block.destroy();
        return { message: 'Content block deleted' };
    }

    /**
     * Reorder content blocks
     */
    async reorderBlocks(pageId, blockOrder) {
        const t = await sequelize.transaction();

        try {
            for (let i = 0; i < blockOrder.length; i++) {
                await ContentBlock.update(
                    { order: i },
                    {
                        where: { id: blockOrder[i] },
                        transaction: t
                    }
                );
            }

            await t.commit();
            return { message: 'Blocks reordered' };
        } catch (error) {
            await t.rollback();
            throw error;
        }
    }

    /**
     * Get all pages
     */
    async getAllPages(includeUnpublished = false) {
        const where = includeUnpublished ? {} : { isPublished: true };

        const pages = await Page.findAll({
            where,
            order: [['createdAt', 'DESC']]
        });

        return pages;
    }
}

module.exports = new CMSService();
