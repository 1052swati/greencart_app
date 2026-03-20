// import jwt from "jsonwebtoken";

// const authSeller = async (req, res, next) => {
//   try {
//     let token = null;

//     if (req.cookies?.sellerToken) {
//       token = req.cookies.sellerToken;
//     }

//     if (!token && req.headers.authorization) {
//       token = req.headers.authorization.split(" ")[1];
//     }

//     console.log("TOKEN RECEIVED:", token);

//     if (!token) {
//       return res.status(403).json({
//         success: false,
//         message: "No Token",
//       });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("DECODED:", decoded);

//     next();
//   } catch (error) {
//     console.log("JWT ERROR:", error.message);
//     return res.status(403).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// export default authSeller;


import jwt from "jsonwebtoken";

const authSeller = async (req, res, next) => {
  try {

    const token = req.headers.authorization?.split(" ")[1]; // ✅ direct header

    console.log("TOKEN RECEIVED:", token);

    if (!token) {
      return res.status(403).json({
        success: false,
        message: "No Token",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("DECODED:", decoded);

    req.userId = decoded.id; // ✅ IMPORTANT

    next();

  } catch (error) {
    console.log("JWT ERROR:", error.message);
    return res.status(403).json({
      success: false,
      message: error.message,
    });
  }
};

export default authSeller;