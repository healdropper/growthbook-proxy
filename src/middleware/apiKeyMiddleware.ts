import {Request, Response, NextFunction} from 'express';

const RE_API_KEY = /(?:api|sub)\/.*?\/?([^\/\?]*)[\/|?]?$/;

export default (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.originalUrl.match(RE_API_KEY)?.[1];
  console.log(req.originalUrl);
  if (!apiKey) {
    return res.status(401).json({message: "API key required"});
  }
  res.locals.apiKey = apiKey;
  next();
}