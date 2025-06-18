# Rate Limiting with Cloudflare

This document explains how to replace the current in-memory rate limiting implementation with Cloudflare's built-in features.

## ✅ Advantages of Cloudflare Rate Limiting

- **Global distribution**: Applied at the edge network level
- **Persistence**: Counters survive restarts
- **Performance**: No load on the origin server
- **Synchronization**: Global across all points of presence
- **Flexible configuration**: Graphical interface and API
- **Built-in analytics**: Monitoring and alerts

## 📋 Recommended Configuration

### 1. Basic API Rules

#### Rule 1: General API Protection

```
Matching criteria: http.request.uri.path starts_with "/api/"
Counting characteristic: IP
Rate: 60 requests / 1 minute
Action: Managed Challenge
```

#### Rule 2: Enhanced Protection for Sensitive APIs

```
Matching criteria: http.request.uri.path in {"/api/create" "/api/delete"}
Counting characteristic: IP
Rate: 10 requests / 1 minute
Action: Block
Duration: 5 minutes
```

#### Rule 3: Brute Force Protection

```
Matching criteria: http.request.uri.path eq "/api/retrieve" and http.response.code in {429 401 403}
Counting characteristic: IP
Rate: 5 requests / 1 minute
Action: Block
Duration: 10 minutes
```

### 2. Advanced Configuration (Enterprise)

If you have an Enterprise plan, you can use more sophisticated rules:

#### JA3 Fingerprint Protection

```
Matching criteria: http.request.uri.path starts_with "/api/"
Counting characteristic: JA3 Fingerprint
Rate: 100 requests / 5 minutes
Action: Managed Challenge
```

#### Custom Headers Protection

```
Matching criteria: http.request.uri.path starts_with "/api/" and not http.request.headers["X-API-Key"]
Counting characteristic: IP
Rate: 20 requests / 1 minute
Action: Block
```

## 🛠️ Migration Steps

### Step 1: Cloudflare Configuration

1. **Access the Cloudflare dashboard**

   - Log in to your Cloudflare account
   - Select your zone/domain

2. **Navigate to WAF > Rate limiting rules**

   - Click "Security" in the menu
   - Select "WAF"
   - Go to the "Rate limiting rules" tab

3. **Create the recommended rules**
   - Click "Create rate limiting rule"
   - Configure according to the examples above

### Step 2: Test the Rules

Before removing the old middleware, test the rules:

```bash
# Normal rate limiting test
for i in {1..15}; do curl -s -o /dev/null -w "%{http_code}\n" https://your-domain.com/api/ping; done

# Test with different IPs (if you have proxies)
curl -H "X-Forwarded-For: 192.168.1.100" https://your-domain.com/api/ping
```

### Step 3: Remove Old Middleware

Once Cloudflare rules are tested and functional:

1. **Delete the middleware file**

   ```bash
   rm server/middleware/rate-limit.ts
   ```

2. **Clean up imports if necessary**
   Check that no other files import this middleware.

## 📊 Monitoring and Analytics

### Metrics Visualization

In the Cloudflare dashboard:

- **Security > Events**: View blocked requests
- **Analytics > Security**: Traffic graphs
- **Logs** (Enterprise): Detailed logs

### Recommended Alerts

Configure alerts for:

- Abnormal spike in blocked requests
- High 429 error rate
- Detected attack attempts

## 🔧 Local Development Configuration

For local development (without Cloudflare), you can keep a simplified version:

```typescript
// server/middleware/dev-rate-limit.ts (for dev only)
export default defineEventHandler(async (event) => {
  if (process.env.NODE_ENV === 'production') {
    return; // Cloudflare handles in production
  }

  // Simple rate limiting for dev
  // ... basic implementation
});
```

## 📚 Resources

- [Cloudflare Rate Limiting Documentation](https://developers.cloudflare.com/waf/rate-limiting-rules/)
- [Best Practices](https://developers.cloudflare.com/waf/rate-limiting-rules/best-practices/)
- [Cloudflare API for Automation](https://developers.cloudflare.com/api/)

## 🏷️ Checklist

- [ ] Create basic Cloudflare rules
- [ ] Test rules with real traffic
- [ ] Configure alerts
- [ ] Train team on Cloudflare rule management
