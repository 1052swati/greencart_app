// import jwt from 'jsonwebtoken';

// const authUser = async (req, res, next) => {
//     const { token } = req.cookies;

//     if (!token) {
//         return res.json({ success: false, message: 'Not Authorized' });
//     }

//     try {
//         const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

//         if (!tokenDecode.id) {
//             return res.json({ success: false, message: 'Not Authorized' });
//         }

//         req.userId = tokenDecode.id;   // ✅ FIXED HERE

//         next();
//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// };

// export default authUser;

import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    try {

        // ✅ FIRST check header
        let token = req.headers.authorization?.split(" ")[1];

        // ✅ agar header me nahi mila to cookie check karo
        if (!token) {
            token = req.cookies?.token;
        }

        if (!token) {
            return res.status(403).json({ 
                success: false, 
                message: 'Not Authorized' 
            });
        }

        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if (!tokenDecode.id) {
            return res.status(403).json({ 
                success: false, 
                message: 'Not Authorized' 
            });
        }

        req.userId = tokenDecode.id;

        next();

    } catch (error) {
        console.log("AUTH ERROR:", error.message);
        res.status(403).json({ 
            success: false, 
            message: error.message 
        });
    }
};

export default authUser;
