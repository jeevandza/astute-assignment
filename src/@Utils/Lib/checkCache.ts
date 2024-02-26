import { Request, Response, NextFunction } from "express";
import localCache from "./localCache";
import { Logger } from "@Utils";



/**
 * Update/create cache
 */
export const checkCache = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { baseUrl, method } = req;
    const [, , , cacheKey] = baseUrl.split("/");

    if (method === "GET" && localCache.hasKey(cacheKey!)) {
      const data = localCache.get(cacheKey!);

      return res.status(200).send(data);
    }
    next();
  } catch (error: any) {
    return Logger.error(error.message);
  }
};
