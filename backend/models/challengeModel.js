import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema(
    {
        status: {
            type: "String",
            required: true,
            default: "Pending"
        }
    },
    {
        timestamps: true,
    }
)

const participantSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    video: {
        type: String,
        required: true,
    },
    reviews: [reviewSchema],
},
    {
        timestamps: true,
    }
)

const challengeSchema = mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    title: {
        type: String,
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    }],
    totalLikes: {
        type: Number,
        required: true,
        default: "0"
    },
    description: {
        type: String,
        required: true,
    },
    hashtags: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category',
    },
    rewards: {
        type: String,
        required: true,
    },
    rewardDetails: {
        type: String,
        required: true,
    },
    rewardContactNo: {
        type: String,
        required: true,
    },
    rewardEmail: {
        type: String,
        required: true,
    },
    coinAllocated: {
        type: Number,
        required: true,
    },
    coinRequired: {
        type: Number,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    visibility: {
        type: String,
        required: true,
    },
    reviewAmount: {
        type: String,
        required: true,
    },
    reviews: [reviewSchema],
    participant: [participantSchema],
    video: {
        type: String,
        required: true,
    },
    active: {
        type: String,
        required: true,
        default: true
    }
},
    {
        timestamps: true
    }
)


const Challenge = mongoose.model('Challenge', challengeSchema)

export default Challenge;