import jwt from 'jsonwebtoken';

export function validateToken(token) {
  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_TOKEN_KEY);
console.log(decoded)
    // Add any additional validation if needed (e.g., match a specific token format)
    if (!decoded || !decoded.role) {
      return false;
    }

    return true; // Return decoded token payload if valid
  } catch (error) {
    return false;
  }
}

export function generateToken() {
    try {
        const newToken = jwt.sign({role:'user'},process.env.JWT_TOKEN_KEY, {
            expiresIn: "2h",
          });
    
  console.log(">>>>>>>>>>>>>>>",newToken)
      return newToken;
    } catch (error) {
      console.log("error on creating token")
    }
  }