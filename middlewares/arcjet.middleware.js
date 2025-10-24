import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.checkRequest(req, { requested: 1 });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit())
        return res.status(429).send({ message: "Too many requests - try again later." });

      if (decision.reason.isBot())
        return res.status(403).send({ message: "Access denied - bots detected." });

      return res.status(403).send({ message: "Access denied." });
    }
    next();
  } catch (error) {
    console.log(`Arcjet Middleware Error: ${error.message}`);
    next();
  }
};

export default arcjetMiddleware;
