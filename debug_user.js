const { User } = require('./src/models');

async function debugUser() {
    try {
        const email = 'h.eljaouhari.code@gmail.com';
        const user = await User.findOne({ where: { email } });
        if (!user) {
            console.log("User NOT found. Please register.");
        } else {
            console.log("User found.");
            console.log("User ID:", user.id);
            console.log("Email:", user.email);
            console.log("Stored Password Hash:", user.password);
            console.log("Hash Length:", user.password.length);

            // Is it a bcrypt hash?
            const isBcrypt = user.password.startsWith('$2b$') || user.password.startsWith('$2a$');
            console.log("Is Bcrypt format:", isBcrypt);

            // Optional: Manual compare test if we knew the password, but we don't.
            // We'll assume the user is using the password they registered with.
        }
    } catch (err) {
        console.error("Error debugging user:", err);
    }
}

debugUser();
