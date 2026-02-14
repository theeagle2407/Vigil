# Vigil - Your 24/7 Security Agent

> AI security agent that protects your crypto assets autonomously using NEAR Shade Agents

![Vigil Banner](https://via.placeholder.com/1200x300/000000/00C1DE?text=Vigil+-+Your+24/7+Security+Agent)

##  What is Vigil?

Vigil is an autonomous security agent that monitors your crypto wallets and transactions 24/7, detecting threats and taking protective action even while you sleep. Built on NEAR's Shade Agent framework, Vigil provides:

- **24/7 Autonomous Monitoring** - Never stops watching your assets
- **Real-time Threat Detection** - Identifies suspicious transactions instantly
- **Automatic Protection** - Blocks dangerous transactions before they execute
- **User-Owned Security** - All your security rules and data belong to you
- **Full Audit Trail** - Complete transparency on every action taken

##  Key Features

### 1. Wallet Monitoring
- Tracks all transactions across multiple chains (via NEAR Chain Signatures)
- Detects unusual patterns (odd amounts, new addresses, suspicious timing)
- Real-time alerts for high-risk activity

### 2. Smart Contract Security
- Scans active token approvals
- Flags unlimited or risky approvals
- Auto-revokes dangerous permissions (with your rules)

### 3. Threat Intelligence
- Monitors known scam addresses
- Checks contracts against security databases
- Detects phishing attempts

### 4. Autonomous Response
- Blocks suspicious transactions instantly
- Moves funds to safe wallet if breach detected
- Executes protective actions based on your rules
- Full audit trail of all actions

### 5. User-Owned Security Profile
- Your security rules (what to block, when to alert)
- All threat history inspectable and exportable
- Encrypted data, fully under your control

##  Architecture

Vigil is built using NEAR's Shade Agent framework:
```
┌─────────────────┐
│   User Wallet   │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────┐
│   Vigil Frontend (Next.js)     │
│   - Dashboard                   │
│   - Security Rules Config       │
│   - Audit Trail Viewer          │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│   Shade Agent (TEE)             │
│   - Persistent Monitoring       │
│   - Transaction Analysis        │
│   - Threat Detection            │
│   - Autonomous Actions          │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│   NEAR Smart Contract           │
│   - Agent Registration          │
│   - Permission Management       │
│   - Chain Signatures            │
└─────────────────────────────────┘
```

##  Quick Start

### Prerequisites

- Node.js 18+
- Docker Desktop
- NEAR Testnet Account
- Phala Cloud Account (for TEE deployment)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/YOUR-USERNAME/vigil-security-agent
cd vigil-security-agent
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.development.local
```

Edit `.env.development.local` with your:
- NEAR account ID
- NEAR seed phrase
- Phala Cloud API key

4. **Start local development**
```bash
# Terminal 1: Start Shade Agent CLI
shade-agent-cli

# Terminal 2: Start development server
npm run dev
```

Visit `http://localhost:3000` to see Vigil in action!

## 📖 How It Works

### 1. Connect Your Wallet
Link your NEAR wallet to Vigil. The agent will begin monitoring immediately.

### 2. Set Security Rules
Configure your protection preferences:
- Transaction amount limits
- Allowed recipient addresses
- Auto-block rules for suspicious activity
- Alert thresholds

### 3. Vigil Watches 24/7
The Shade Agent runs persistently in a Trusted Execution Environment (TEE):
- Monitors all transactions
- Analyzes patterns and risks
- Takes action based on your rules
- Logs everything for transparency

### 4. Review & Adjust
Check the audit trail anytime:
- See what Vigil blocked and why
- Review threat detections
- Adjust rules as needed
- Export your security data

## 🛡️ Security & Privacy

### User-Owned Data
- All security rules stored encrypted
- You control who accesses your data
- Export or delete anytime

### Verifiable Execution
- Agent runs in TEE (Trusted Execution Environment)
- Code is verifiable from source
- Actions are auditable on-chain

### Non-Custodial
- Vigil never holds your keys
- Uses NEAR Chain Signatures for cross-chain actions
- You maintain full control

##  Demo Scenarios

### Scenario 1: Phishing Protection
```
1. User clicks malicious link
2. Phishing site requests token approval
3. Vigil detects: unknown contract + unlimited approval
4. Action: BLOCKS transaction instantly
5. Alert: "Blocked suspicious approval to 0xabc..."
```

### Scenario 2: Suspicious Transfer
```
1. Compromised device initiates transfer
2. Amount: $5,000 (above user's $1k daily limit)
3. Recipient: New address (not in allowlist)
4. Vigil detects: multiple red flags
5. Action: BLOCKS + alerts user for approval
```

### Scenario 3: Smart Contract Audit
```
1. User has 15 active token approvals
2. Vigil scans all contracts
3. Finds: 3 unlimited approvals to risky contracts
4. Action: Flags for review + offers auto-revoke
5. User confirms → Vigil revokes permissions
```

##  Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Agent**: Hono framework, TypeScript
- **Blockchain**: NEAR Protocol (Chain Signatures for multi-chain)
- **TEE**: Phala Cloud (Trusted Execution Environment)
- **Smart Contract**: Rust (NEAR)

##  Roadmap

### Phase 1: MVP (Hackathon) 
- Basic wallet monitoring
- Transaction blocking
- Smart contract approval scanning
- Simple dashboard

### Phase 2: Enhanced Detection
- ML-based anomaly detection
- Multi-chain monitoring
- Integration with security databases (Forta, Certik)
- Advanced threat intelligence

### Phase 3: Community Features
- Shared threat database
- Community-driven security rules
- Insurance integration
- DAO governance

##  Contributing

Vigil is built for NEARCON Innovation Sandbox and will continue development in PL Genesis: Frontiers of Collaboration.

Want to contribute? Check out our [CONTRIBUTING.md](CONTRIBUTING.md) guide!

## 📄 License

Apache-2.0 License - see [LICENSE](LICENSE) file for details.

## 🔗 Links

- [NEAR Documentation](https://docs.near.org)
- [Shade Agents Guide](https://docs.near.org/ai/shade-agents)
- [Chain Signatures](https://docs.near.org/chain-abstraction/chain-signatures)
- [Hackathon Details](https://near-innovation-sandbox.devspot.app)

## 👥 Team

Built with love for NEARCON Innovation Sandbox 2026

---

** Disclaimer**: Vigil is in active development. Always conduct your own security audits before using in production. Not yet formally audited.

**Stay secure. Stay vigilant.** 🛡️
Add README
