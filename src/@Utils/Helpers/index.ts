import bcryptJs from 'bcryptjs';
import { Request, Response, NextFunction,  } from 'express';

interface CustomRequest extends Request {
  token?: string;
}

/**
 * To hash user password 
 */
async function hashPassword(password: string): Promise<string> {
  const salt = bcryptJs.genSaltSync(10);
  return bcryptJs.hash(password, salt);
}

/**
 * To verify password 
 */
async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcryptJs.compare(password, hash);
}

/**
 * Verify token during each request
 */
function verifyToken(req: CustomRequest, res: Response, next: NextFunction): void {
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader && bearerHeader.split(" ");
    const bearerToken: string | undefined = bearer[1];
    if (bearerToken) {
      req.token = bearerToken as string
      next();
    } else {
      res.status(403).send({ msg: "Invalid token" });
    }
  } else {
    res.status(403).send({ msg: "Invalid token" });
  }
}

export {
  hashPassword,
  verifyPassword,
  verifyToken,
};
