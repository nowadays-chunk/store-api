const reportService = require('../services/reportService');

/**
 * Generate sales report
 */
exports.generateSalesReport = async (req, res, next) => {
    try {
        const { startDate, endDate } = req.query;
        const report = await reportService.generateSalesReport(new Date(startDate), new Date(endDate));
        res.json(report);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Generate product report
 */
exports.generateProductReport = async (req, res, next) => {
    try {
        const { startDate, endDate } = req.query;
        const report = await reportService.generateProductReport(new Date(startDate), new Date(endDate));
        res.json(report);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Generate customer report
 */
exports.generateCustomerReport = async (req, res, next) => {
    try {
        const { startDate, endDate } = req.query;
        const report = await reportService.generateCustomerReport(new Date(startDate), new Date(endDate));
        res.json(report);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Export report to CSV
 */
exports.exportCSV = async (req, res, next) => {
    try {
        const { reportData } = req.body;
        const csv = await reportService.exportToCSV(reportData);
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=report.csv');
        res.send(csv);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Schedule report
 */
exports.scheduleReport = async (req, res, next) => {
    try {
        const result = await reportService.scheduleReport(req.body);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
