import { Request, Response, NextFunction } from 'express';
import { verifyToken, JwtUserPayload } from '../utils/jwt';
import { User, IUser } from '../models/User';
import { sendError } from '../utils/response';

export interface AuthenticatedRequest extends Request {
  user?: IUser;
  jwtPayload?: JwtUserPayload;
}

export async function authenticateUser(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    let token: string | undefined;

    // Check Authorization header: Bearer <token>
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else if (req.cookies && req.cookies.token) {
      // Check httpOnly cookie
      token = req.cookies.token;
    }

    if (!token) {
      sendError(res, 'Authentication required. Please sign in.', 401);
      return;
    }

    // Verify token
    const decoded = verifyToken(token);
    req.jwtPayload = decoded;

    // Fetch user from DB
    const user = await User.findById(decoded.userId);
    if (!user || !user.isActive) {
      sendError(res, 'User session is invalid or has been deactivated.', 401);
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    sendError(res, 'Invalid or expired authentication token.', 401);
  }
}
