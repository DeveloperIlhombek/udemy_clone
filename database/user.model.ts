import { Schema, model, models } from 'mongoose'

const UserSchema = new Schema(
	{
		fullName: { type: String },
		clerkId: { type: String },
		email: { type: String },
		picture: { type: String },
	},
	{ timestamps: true }
)

const User = models.User || model('User', UserSchema)
export default User
