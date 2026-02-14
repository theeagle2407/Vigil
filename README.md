# Vigil - Your 24/7 Security Agent

> Autonomous AI security agent that protects your crypto assets 24/7 using NEAR Shade Agents

![Vigil](https://img.shields.io/badge/NEAR-Shade_Agents-purple?style=for-the-badge)
![License](https://img.shields.io/badge/license-Apache_2.0-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/status-hackathon_mvp-orange?style=for-the-badge)

---

##  The Problem

**Billions lost to crypto scams every year** because:
-  Users can't monitor wallets 24/7
-  Phishing attacks are sophisticated
-  Unlimited token approvals become security holes  
-  By the time you notice, it's too late
-  Manual monitoring doesn't scale

**People need autonomous protection that works while they sleep.**

---

##  The Solution: Vigil

**An AI security agent that runs 24/7 in a Trusted Execution Environment (TEE), autonomously protecting your crypto assets.**

### Key Features:

 **24/7 Autonomous Monitoring** - Never stops watching  
 **Real-time Threat Detection** - Identifies suspicious activity instantly  
 **Automatic Protection** - Blocks dangerous transactions before execution  
 **User-Owned Security** - All rules and data encrypted and under your control  
 **Full Audit Trail** - Complete transparency on every action  
 **Multi-Chain Support** - Monitors across chains via NEAR Chain Signatures

---

##  Architecture
```
┌─────────────────┐
│   User Wallet   │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────┐
│   Vigil Dashboard              │
│   - Real NEAR wallet connection │
│   - Live transaction feed       │
│   - Risk score meter            │
│   - Security controls           │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│   Shade Agent (TEE)             │
│   - Persistent monitoring       │
│   - Transaction analysis        │
│   - Threat detection            │
│   - Autonomous blocking         │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│   NEAR Smart Contract           │
│   - Agent registration          │
│   - Permission management       │
│   - Chain Signatures            │
└─────────────────────────────────┘
```

---

##  Live Demo Features

### 1. **Real Wallet Connection**
- Connect your actual NEAR wallet
- View real balance from blockchain
- Manual or popup connection options

### 2. **Live Transaction Monitoring**
- Real-time transaction feed
- Continuous blockchain scanning
- Threat pattern detection

### 3. **Risk Score Meter**
- Animated security score (0-100)
- Dynamic risk assessment
- Visual security status

### 4. **Threat Simulator**
- Demo phishing attack detection
- Shows Vigil blocking threats
- Interactive security testing

### 5. **Security Controls**
- Start/stop monitoring
- Scan token approvals
- Set security rules
- View full audit trail

---

##  Tech Stack

**Frontend:**
- Next.js / Vanilla JS
- NEAR Wallet Selector
- Real-time blockchain data

**Backend (Agent):**
- Hono framework
- TypeScript
- NEAR API integration

**Blockchain:**
- NEAR Protocol (Testnet)
- NEAR Shade Agents (TEE)
- Chain Signatures (Multi-chain)

**Security:**
- Phala Cloud (TEE deployment)
- Encrypted user data
- Verifiable execution

---

##  Quick Start

### Prerequisites
- Node.js 18+
- NEAR Testnet Account
- (Optional) Docker for local development

### Installation
```bash
# Clone repository
git clone https://github.com/YOUR-USERNAME/vigil-security-agent
cd vigil-security-agent

# Install dependencies
npm install

# Set up environment
cp .env.example .env.development.local

# Edit .env.development.local with your NEAR credentials

# Run development server
npm run dev
```

Visit `http://localhost:3000`

---

##  How to Use

1. **Connect Wallet**
   - Click "Connect Wallet" or "Manual Connection"
   - Enter your NEAR testnet account
   - View your real balance

2. **Start Monitoring**
   - Click "Monitor" button
   - Vigil begins 24/7 surveillance
   - Live transaction feed appears

3. **Scan Approvals**
   - Click "Scan" button
   - Vigil checks all token approvals
   - Flags risky permissions

4. **Set Security Rules**
   - Click "Rules" button
   - Configure max transaction amounts
   - Set auto-block preferences

5. **Test Protection**
   - Click "Simulate Attack"
   - Watch Vigil block the threat
   - See stats update in real-time

---

##  Roadmap

### Phase 1: MVP (Hackathon) 
- Basic wallet monitoring
- Transaction analysis framework
- Smart contract approval scanning
- Interactive dashboard
- NEAR wallet integration

### Phase 2: Production (PL Genesis)
- Deploy Shade Agent to TEE
- Implement transaction blocking
- Multi-chain monitoring (Ethereum, Polygon)
- ML-based anomaly detection
- Integration with threat intelligence APIs

### Phase 3: Scale
- Mobile app (iOS/Android)
- Browser extension
- DAO governance for shared threat database
- Insurance integration
- Premium tier with advanced features

---

##  Business Model

**Freemium:**
- Free: Basic monitoring (1 wallet, NEAR only)
- Pro ($9.99/mo): Multi-chain, 5 wallets, advanced rules
- Team ($49/mo): Shared security, DAO treasury protection

**Target Market:**
- 560M+ crypto users worldwide
- $3.8B+ stolen annually
- Massive TAM opportunity

---

##  Why Vigil is important

**1. Real Problem**
- Billions lost to crypto scams
- Everyone needs 24/7 protection
- No existing autonomous solution

**2. Novel Solution**
- First AI agent that actively blocks threats
- Not just alerts - autonomous protection
- User-owned security (privacy + control)

**3. Technical Excellence**
- Uses NEAR Shade Agents correctly
- Working demo with real wallet connection
- Clear path to production

**4. Market Ready**
- Clear business model
- Scalable architecture
- Continuation path (PL Genesis)

---

##  License

Apache-2.0 License - see [LICENSE](LICENSE) file

---

##  Links

- **Live Demo:** Run locally with `npm run dev`
- **NEAR Docs:** https://docs.near.org/ai/shade-agents
- **Chain Signatures:** https://docs.near.org/chain-abstraction/chain-signatures
- **Hackathon:** NEARCON Innovation Sandbox 2026

---

##  Team

Built with love for NEARCON Innovation Sandbox 2026

---

##  Disclaimer

Vigil is in active development as a hackathon MVP. The current version demonstrates the concept and architecture. Full transaction blocking and TEE deployment will be implemented in Phase 2. Always conduct your own security audits before using in production.

**Stay secure. Stay vigilant.** 

---

##  Acknowledgments

- NEAR Foundation for Shade Agents framework
- Phala Cloud for TEE infrastructure
- The amazing NEAR developer community

---

**NEARCON Innovation Sandbox 2026**
```
