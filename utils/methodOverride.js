// utils/methodOverride.js
export default function methodOverride(req, res, next) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      const method = req.body._method.toUpperCase();
      delete req.body._method;
      
      // Store original method for debugging
      req.originalMethod = req.method;
      req.method = method;
      
      console.log(`Method overridden from ${req.originalMethod} to ${method}`);
    }
    next();
  }