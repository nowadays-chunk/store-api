const db = require('../models');
const Dataset = db.Dataset;

const biController = {
    getDatasets: async (req, res, next) => {
        try {
            const datasets = await Dataset.findAll();
            res.json({ success: true, datasets });
        } catch (error) {
            next(error);
        }
    },

    createDataset: async (req, res, next) => {
        try {
            const dataset = await Dataset.create(req.body);
            res.status(201).json({ success: true, data: dataset });
        } catch (error) {
            next(error);
        }
    },

    getQueries: async (req, res, next) => {
        // Queries can be part of Dataset or separate. Mocking for now as separate model 'Query' wasn't created, 
        // maybe store in Dataset.config or just return empty list.
        res.json({ success: true, queries: [] });
    },

    saveQuery: async (req, res, next) => {
        // Mock save
        res.status(201).json({ success: true, message: 'Query saved', queryId: 'QRY-' + Date.now() });
    },

    refreshCache: async (req, res, next) => {
        try {
            const { datasetId } = req.body;
            if (datasetId) {
                const dataset = await Dataset.findByPk(datasetId);
                if (dataset) {
                    await dataset.update({ lastRefreshedAt: new Date() });
                }
            }
            res.json({ success: true, message: 'Cache refreshed' });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = biController;
