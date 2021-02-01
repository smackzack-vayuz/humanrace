import express from 'express'
import { signup, authUser, otp, uploadImg, location, category, addToBookmark, removeFromBookmark, addToFollowing, removeFromFollowing, getAllUsers, getUserById, forgotOtp } from '../controllers/userControllers.js'
import { protect } from '../middlewares/authMiddlewares.js'
import multer from 'multer'
import path from 'path'
const router = express.Router()

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/ProfileImg')
    },
    filename(req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        )
    },
})

function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if (extname && mimetype) {
        return cb(null, true)
    } else {
        cb('Videos only!')
    }
}

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb)
    },
})

router.route('/signup').post(signup)
router.route('/signin').post(authUser)
router.route('/OTP').post(protect, otp)
router.route('/upload').post(protect, upload.single('image'), uploadImg)
router.route('/location').post(protect, location)
router.route('/category').post(protect, category)
router.route('/forgotOtp').post(protect, forgotOtp)
router.route('/all').get(protect, getAllUsers)
router.route('/:id').get(protect, getUserById)
//router.route('/profile').get(protect, getProfile)
router.route('/save/:id').put(protect, addToBookmark)
router.route('/unsave/:id').put(protect, removeFromBookmark)
router.route('/follow/:id').put(protect, addToFollowing)
router.route('/unfollow/:id').put(protect, removeFromFollowing)

export default router;