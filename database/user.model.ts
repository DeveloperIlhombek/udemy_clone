import { Schema, model, models } from 'mongoose'

const UserSchema = new Schema(
	{
		fullName: String,
		clerkId: String,
		email: String,
		picture: String,
		role: String,
		bio: String,
		phone: String,
		job: String,
		website: String,
		linkedin: String,
		github: String,
		youtube: String,
		customerId: String,
		favouriteCourses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
		archiveCourses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
	},
	{ timestamps: true }
)

const User = models.User || model('User', UserSchema)
export default User
