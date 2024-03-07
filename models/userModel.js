
import mongoose from 'mongoose';




// Create a Mongoose schema for the user
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    phone: { type: String, required: true }
});

// Create a Mongoose model based on the schema
const User = mongoose.model('User', userSchema);

// Export the User model for use in other files if needed
export default User
