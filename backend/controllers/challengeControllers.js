import asyncHandler from 'express-async-handler'
import Challenge from '../models/challengeModel.js'
import User from '../models/userModel.js'

// @desc Get all challenge
// route GET challenge
// access Public
const getChallenge = asyncHandler(async (req, res) => {
    const challenge = await Challenge.find({}).populate("creator", 'name image').populate('category', 'name image')
    res.send(challenge)
})

const postChallenge = asyncHandler(async (req, res) => {
    const { title, description, hashtags, category, rewards, rewardDetails, rewardContactNo, rewardEmail, coinAllocated, coinRequired, visibility, reviewAmount, duration, video } = req.body
    const { id } = req.user
    const challenge = await Challenge.create({
        title, description, hashtags, category, rewards, rewardDetails, rewardContactNo, rewardEmail, coinAllocated, coinRequired, visibility, reviewAmount, duration, video, creator: id
    })
    const user = await User.findById(req.user.id)
    if (user) {
        user.myChallenges.push(challenge._id)
        await user.save()
    }
    if (challenge) {
        res.status(201).json({
            _id: challenge._id,
            creator: challenge.creator,
            title: challenge.title,
            description: challenge.description,
            hashtags: challenge.hashtags,
            category: challenge.category,
            rewards: challenge.rewards,
            rewardDetails: challenge.rewardDetails,
            rewardContactNo: challenge.rewardContactNo,
            rewardEmail: challenge.rewardEmail,
            coinAllocated: challenge.coinAllocated,
            coinRequired: challenge.coinRequired,
            visibility: challenge.visibility,
            reviewAmount: challenge.reviewAmount
        })
    } else {
        res.status(400)
        throw new Error("Invalid Challenge Data")
    }
})

// @desc upload challenge video
// route POST challenge/upload
// access Public
const uploadChal = asyncHandler(async (req, res) => {
    res.json({ link: `/${req.file.path}` })
})

export { getChallenge, postChallenge, uploadChal }