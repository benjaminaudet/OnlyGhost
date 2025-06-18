// Simple in-memory rate limiting for development/fallback
// In production, Cloudflare should handle rate limiting
const requests = new Map<string, { count: number; resetTime: number }>();

// Cleanup expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of requests.entries()) {
    if (now > data.resetTime) {
      requests.delete(ip);
    }
  }
}, 5 * 60 * 1000);

export default defineEventHandler(async (event) => {
  // Only apply to API routes
  if (!event.node.req.url?.startsWith('/api/')) {
    return;
  }

  // Skip rate limiting in development if Cloudflare is expected to handle it
  if (
    process.env.NODE_ENV === 'production' &&
    process.env.CLOUDFLARE_RATE_LIMITING === 'true'
  ) {
    return;
  }

  // Get client IP
  const forwarded = getHeader(event, 'x-forwarded-for');
  const clientIP = forwarded
    ? forwarded.toString().split(',')[0].trim()
    : event.node.req.socket.remoteAddress || 'unknown';

  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute window
  const maxRequests = 20; // 20 requests per minute for fallback

  // Get or create request tracking for this IP
  let ipData = requests.get(clientIP);

  if (!ipData || now > ipData.resetTime) {
    // Reset or create new window
    ipData = { count: 0, resetTime: now + windowMs };
    requests.set(clientIP, ipData);
  }

  // Increment request count
  ipData.count++;

  // Check if limit exceeded
  if (ipData.count > maxRequests) {
    throw createError({
      statusCode: 429,
      statusMessage: 'Too Many Requests',
      data: {
        error: 'Rate limit exceeded. Please try again later.',
        resetTime: ipData.resetTime,
      },
    });
  }

  // Add rate limit headers
  setHeader(event, 'X-RateLimit-Limit', maxRequests.toString());
  setHeader(
    event,
    'X-RateLimit-Remaining',
    (maxRequests - ipData.count).toString()
  );
  setHeader(
    event,
    'X-RateLimit-Reset',
    Math.ceil(ipData.resetTime / 1000).toString()
  );
});
