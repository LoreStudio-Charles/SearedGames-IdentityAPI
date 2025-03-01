import Group from '@db/models/common/group';
import Role from '@db/models/common/role';
import User from '@db/models/common/user';
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export default class AuthMiddleware {
    verify(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers['authorization'];
        const accessToken = authHeader?.replace('Bearer ', '');

        if(accessToken == null) {
            return res.status(401).send("Requires authentication.");
        } else {
            jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string, (error, user) => {
                if(error) {
                    return res.status(403).send("Access denied.");
                } else {
                    req.headers.user = user as string;
                    next();
                }
            });
        }
    }

    /**
     * 
     * @param role Should always be passed from the constants included in GroupRole class.
     * @returns 
     */
    verifyRole(role: string) {
        return async (req: Request, res: Response, next: NextFunction) => {
            const authHeader = req.headers['authorization'];
            const accessToken = authHeader?.replace('Bearer ', '');

            if(accessToken == null) {
                return res.status(401).send("Requires authentication.");
            } else {
                const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string, async (error, payload) => {
                    if(error) {
                        return res.status(403).send("Access denied.");
                    } else {
                        const user = payload as JwtPayload;
                        const username = user.username as string;
                        const current_user = await User.findOne({
                                where: { name: username}, 
                                include: [{
                                    model: Group,
                                    include: [
                                        Role
                                    ]
                                }
                            ]
                        });
                        
                        if(current_user?.Group?.Roles.some(r => r.name.toLowerCase() === role.toLowerCase()))
                        {
                            req.headers.user = username;
                            next();
                        } else
                        {
                            return res.status(403).send("Access denied.");
                        }
                    }
                });
            }
        };
    }
}