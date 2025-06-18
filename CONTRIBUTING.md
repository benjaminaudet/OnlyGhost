# Contributing to GhostData

Thank you for your interest in contributing to GhostData! This document provides guidelines and information for contributors.

## 🔐 Security First

Since GhostData handles sensitive data transmission, security is our top priority. Please review our security considerations before contributing.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- Basic understanding of Nuxt.js and Vue.js
- Familiarity with TypeScript

### Setup Development Environment

```bash
# Clone the repository
git clone https://github.com/yourusername/onlyGhost.git
cd onlyGhost

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

## 🛠️ Development Guidelines

### Code Style

- We use ESLint with Nuxt's configuration
- TypeScript is required for all new code
- Use single quotes and avoid trailing commas
- Run `pnpm lint` before committing

### Security Guidelines

- **Never log sensitive data** - even in development
- **Client-side encryption only** - server must never see plaintext
- **Validate all inputs** at API boundaries
- **Use secure headers** and follow OWASP guidelines

### Database Changes

If you modify the database schema:

```bash
# Generate new migration
pnpm drizzle:generate

# Test the migration
pnpm drizzle:push
```

## 📝 Pull Request Process

1. **Fork** the repository
2. **Create a feature branch** from `main`
3. **Make your changes** following our guidelines
4. **Test thoroughly** - especially security-related changes
5. **Update documentation** if needed
6. **Submit a pull request** with a clear description

### PR Requirements

- [ ] Code follows project conventions
- [ ] Security implications considered and documented
- [ ] No hardcoded secrets or sensitive data
- [ ] Documentation updated if needed
- [ ] Commits are clear and descriptive

## 🐛 Reporting Issues

### Security Issues

**⚠️ NEVER report security vulnerabilities through public issues!**

Instead, please email security issues to: [security@yourdomain.com]

### Bug Reports

When reporting bugs, please include:

- Steps to reproduce
- Expected vs actual behavior
- Browser/environment details
- Any error messages

### Feature Requests

We welcome feature suggestions! Please describe:

- The problem you're trying to solve
- Your proposed solution
- Any security implications

## 🏗️ Architecture Notes

### Zero-Knowledge Implementation

- All encryption/decryption happens client-side
- Server never has access to plaintext data
- Access keys are never stored server-side
- URL fragments contain decryption keys

### Rate Limiting

- Production: Cloudflare handles rate limiting
- Development: In-memory fallback implementation
- See `RATE_LIMITING_CLOUDFLARE.md` for details

## 📚 Resources

- [Nuxt.js Documentation](https://nuxt.com/docs)
- [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)
- [OWASP Security Guidelines](https://owasp.org/)

## 📄 License

By contributing to GhostData, you agree that your contributions will be licensed under the MIT License.

---

Questions? Feel free to open a discussion or reach out to the maintainers!
