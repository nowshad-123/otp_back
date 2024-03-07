import jwt from 'jsonwebtoken';

export function generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '18000s' });
}

export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);
    console.log(token)
    jwt.verify(token, process.env.TOKEN_SECRET, (err, username) => {
        if (err) {
            return res.sendStatus(403); // Forbidden if the token is invalid
        }

        req.user = username;
        next();
    });
}

