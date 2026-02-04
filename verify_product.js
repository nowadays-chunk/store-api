const { ProductVariant, Product, sequelize } = require('./src/models');

async function checkProduct() {
    try {
        await sequelize.authenticate();
        console.log('DB Connected.');

        const productId = '9112e211-f89c-42f3-9c33-80f80ba20e4f';

        const product = await Product.findByPk(productId);
        console.log('Product found:', product ? product.name : 'NO');

        const variant = await ProductVariant.findOne({ where: { productId: productId } });
        console.log('Variant found via productId:', variant ? variant.id : 'NO');

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await sequelize.close();
    }
}

checkProduct();
