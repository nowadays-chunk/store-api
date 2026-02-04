const { User } = require('./src/models');

async function resetUser() {
    try {
        const email = 'h.eljaouhari.code@gmail.com';
        const deleted = await User.destroy({
            where: { email }
        });
        console.log(`Deleted ${deleted} user(s) with email ${email}.`);
    } catch (err) {
        console.error("Error deleting user:", err);
    }
}

resetUser();
