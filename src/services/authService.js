const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const SECRET_KEY = process.env.JWT_SECRET || 'dev_secret_key_123';
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

class AuthService {
    async register(userData) {
        const { email, password, firstName, lastName } = userData;

        // Check if user exists
        const existing = await User.findOne({ where: { email } });
        if (existing) {
            throw new Error('User already exists');
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            email,
            passwordHash,
            firstName,
            lastName,
            role: 'customer' // default role
        });

        // Generate token
        const token = this.generateToken(user);

        return { user, token };
    }

    async login(email, password) {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        const token = this.generateToken(user);
        return { user, token };
    }

    generateToken(user) {
        // Ideally payload has id, role, etc.
        return jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            SECRET_KEY,
            { expiresIn: EXPIRES_IN }
        );
    }
}

module.exports = new AuthService();
