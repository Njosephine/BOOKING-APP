import jwt from "jsonwebtoken"

// admin authentication middleware
const authAdmin = async (req, res, next) => {
    try {
        const { atoken } = req.headers
        //Check if token is provided
        if (!atoken) {
            return res.status(401).json({ success: false, message: 'Not Authorized. Login Again' })
        }

        //Verify token 
        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET)

        //Check if the user role is admin
        if (token_decode.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Access denied. Admins only' })
        }

        //If all goes well proceed to the admin dashboard
        next()


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export default authAdmin;