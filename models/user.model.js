const db = require('../config/db.config');

class UserModel {
    static async create(user) {
        const { full_name, phone, role } = user;
        const [result] = await db.execute(
            `INSERT INTO users (full_name, phone, role)
             VALUES (?, ?, ?)`, [full_name, phone, role]
        );
        return result.insertId;
    }

    static async findByPhone(phone) {
        const [rows] = await db.execute(
            'SELECT * FROM users WHERE phone = ?', [phone]
        );
        return rows[0];
    }

    static async findById(id) {
        const [rows] = await db.execute(
            'SELECT id, full_name, phone, role FROM users WHERE id = ?', [id]
        );
        return rows[0];
    }

    static async getAll() {
        const [rows] = await db.execute(
            'SELECT id, full_name, phone, role FROM users'
        );
        return rows;
    }

    static async update(id, updates) {
        const fields = [];
        const values = [];

        if (updates.full_name) {
            fields.push('full_name = ?');
            values.push(updates.full_name);
        }
        if (updates.phone) {
            fields.push('phone = ?');
            values.push(updates.phone);
        }
        if (updates.role) {
            fields.push('role = ?');
            values.push(updates.role);
        }

        if (fields.length === 0) return null;

        values.push(id);
        const [result] = await db.execute(
            `UPDATE users SET ${fields.join(', ')} WHERE id = ?`,
            values
        );

        return result.affectedRows > 0;
    }

    static async delete(id) {
        const [result] = await db.execute(
            'DELETE FROM users WHERE id = ?', [id]
        );
        return result.affectedRows > 0;
    }
}

module.exports = UserModel;