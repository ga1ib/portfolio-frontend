import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/User';

dotenv.config();

async function createAdmin() {
  const MONGO_URI = process.env.MONGO_URI || '';
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || '';
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';

  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    // Remove any existing admin users, then create fresh
    const deleted = await User.deleteMany({});
    if (deleted.deletedCount > 0) {
      console.log(`🗑️  Removed ${deleted.deletedCount} existing admin user(s)`);
    }

    await User.create({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD });
    console.log(`✅ Admin user created: ${ADMIN_EMAIL}`);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

createAdmin();
