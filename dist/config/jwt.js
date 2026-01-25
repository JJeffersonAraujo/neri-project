import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET ?? "dev-secret";
export const jwtConfig = {
    secret, // string
    accessTokenOptions: {
        expiresIn: "15m",
    },
    refreshTokenOptions: {
        expiresIn: "7d",
    },
};
export default jwt;
//# sourceMappingURL=jwt.js.map