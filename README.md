# 👻 OnlyGhost

> **Ephemeral Sensitive Data Transmission Service** - Share secrets that disappear without a trace

[![Demo](https://img.shields.io/badge/🌐_Live_Demo-onlyghost.com-blue?style=for-the-badge)](https://onlyghost.com/)
[![Built with Nuxt](https://img.shields.io/badge/Built_with-Nuxt.js-00DC82?style=for-the-badge&logo=nuxt.js)](https://nuxt.com)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/folken)

**🚀 Want to deploy this for your organization or create your own MVP?**  
**📧 Contact me at [FlorianArgaud.com](https://FlorianArgaud.com)**

## Overview

OnlyGhost is a minimalist secure data transmission service designed specifically for sending sensitive information that doesn't belong in regular communication channels.

### Key Features

- ✅ **End-to-end encryption** of sensitive data (passwords, API keys, .env files, credentials)
- 🔐 **Zero knowledge architecture** - we never see your unencrypted data
- ⏱️ **Automatic data destruction** after 24 hours
- 👤 **No account required** - completely anonymous usage
- 📱 **QR Code generation** - instantly share links via QR codes for mobile devices
- 🎨 **Simple, intuitive interface** built with Nuxt and Tailwind CSS
- 📱 **Responsive design** that works on any device

## How It Works

1. Enter your sensitive data into the secure form
2. Get a one-time access link
3. Share the link with your recipient via any channel
4. Once viewed or after 24 hours, the data is permanently destroyed
5. Daily encryption seed rotation ensures forward secrecy

## Technical Stack

- **Frontend**: Nuxt.js with Tailwind CSS for minimal, elegant UI
- **Icons**: Nuxt Icon for intuitive visual elements
- **Security**: AES-256 encryption with rotating keys
- **Storage**: SQLite database with Drizzle ORM

## ⚡ Cloudflare & NuxtHub Ready

This project has been **specially optimized** for deployment on [**NuxtHub**](https://hub.nuxt.com/) - the Cloudflare-powered platform for Nuxt applications.

### 🌐 **Why Cloudflare + NuxtHub?**

- **⚡ Edge Performance**: Lightning-fast response times from 300+ global locations
- **🔒 Enterprise Security**: Leverages Cloudflare's industry-leading security infrastructure
- **💾 Integrated Storage**: Seamless integration with Cloudflare D1 (SQLite) and R2 (file storage)
- **📊 Built-in Analytics**: Monitor your app's performance and usage patterns
- **💰 Cost-Effective**: Pay only for what you use with generous free tiers
- **🔄 Zero Config**: Deploy with a single command - no complex setup required

### 🚀 **One-Click Deploy**

```bash
npm deploy
```

**Perfect for sensitive data applications** - benefit from Cloudflare's security-first approach and global edge network.

## Rate Limiting

This project uses Cloudflare's built-in rate limiting.
See [RATE_LIMITING_CLOUDFLARE.md](./RATE_LIMITING_CLOUDFLARE.md) for configuration.

**Important**: Rate limiting rules are configured at the Cloudflare level,
not in the application code.

## Development

### Setup

```bash
# Install dependencies
pnpm install

# Generate database migrations (if schema changes)
pnpm drizzle:generate

# Start development server
pnpm dev
```

### Build and Deploy

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview

# Deploy to production
pnpm deploy
```

## License

MIT License

This project is open source and free for commercial use, including:

- ✅ **Running as a service** (SaaS, hosting, etc.)
- ✅ **Integrating into commercial products**
- ✅ **Using in enterprise environments**
- ✅ **Selling modifications or derivative works**

See the [LICENSE](./LICENSE) file for full details.
