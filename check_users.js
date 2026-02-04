const { User } = require('./src/models');

async function checkUsers() {
    try {
        const list = await User.findAll();
        console.log(`Found ${list.length} users.`);
        list.forEach(u => console.log(` - ${u.email} (Verified: ${u.isVerified})`));
    } catch (err) {
        console.error("Error querying users:", err);
    }
}

checkUsers();
