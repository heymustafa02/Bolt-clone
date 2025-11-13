# ⚡ Bolty – AI-Powered Code Assistant

Bolty is a full-stack platform that converts natural-language prompts into fully working animated React applications — complete with live preview, deploy/export options, authentication, and token-based pricing tiers.

---

## 🎯 What It Is

Bolty enables users to:

- Enter natural-language prompts  
  _Example: “Build a dashboard with Framer Motion animations”_
- Instantly generate full **React + Tailwind CSS** apps using AI (via CDN)
- Preview output live in-browser using Sandpack
- Edit files inside the editor
- Export the generated project as a **ZIP** or deploy it
- Access token-based pricing (PayPal payments)
- Login with Google OAuth
- Save workspaces, chat with the AI, and build production-grade UIs using:
  - Framer Motion  
  - GSAP  
  - shadcn/ui  
  - charts  
  - and more…

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|------------|
| **Front-end** | Next.js (App Router), React |
| **Styling** | Tailwind CSS (via CDN) |
| **Live Preview** | Sandpack (codesandbox-react) |
| **Backend & DB** | Convex (serverless functions + schema) |
| **AI Integration** | Generative AI API (configs/AiModel.jsx) |
| **Auth & Payments** | Google OAuth + PayPal Buttons |
| **UI Libraries** | Framer Motion, GSAP, shadcn/ui, lucide-react |
| **Deployment** | Vercel |

---

## 🗂 Project Structure
```bash

/app/                     – Next.js application directory
/components/             – UI + custom app components
/configs/                – AI model configuration
/context/                – React context providers (Messages, UserDetail, Action)
/convex/                 – Schema + backend functions
/data/                   – Static prompt/lookup files (Lookup.jsx, Prompt.jsx)
/hooks/                  – Custom hooks
/lib/                    – Utility functions
/public/                 – Static assets
package.json             – Dependencies & scripts
README.md                – You're here

```

---

## 🏁 Getting Started (Developer Setup)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/heymustafa02/Bolt-clone.git
cd Bolt-clone
```

### 2️⃣ Install Dependencies
```bash
npm install
# or yarn / pnpm
```

### 3️⃣ Add Environment Variables

Create a .env.local file:
```bash
NEXT_PUBLIC_CONVEX_URL=<your convex deployment>
NEXT_PUBLIC_GOOGLE_CLIENT_ID_KEY=<your Google OAuth client ID>
NEXT_PUBLIC_PAYPAL_CLIENT_ID=<your PayPal Client ID>
NEXT_PUBLIC_GEMINI_API_KEY=<your Gemini API key>
```

### 4️⃣ Start Development Server
```bash

npm run dev
Open http://localhost:3000 in your browser.
```
### 5️⃣ Build for Production
```bash
npm run build
npm run start
```

## 💼 Pricing & Token Model
Defined in data/Lookup.jsx:

```bash
[
  { name:'Basic',        tokens:'50 K',     value:50000,      price:4.99  },
  { name:'Starter',      tokens:'120 K',    value:120000,     price:9.99  },
  { name:'Pro',          tokens:'2.5 M',    value:2500000,    price:19.99 },
  { name:'Unlimited',    tokens:'Unlimited',value:999999999,  price:49.99 }
]
Payments are handled through PayPal, and on success, the user's token count is updated in Convex.
```
## ✅ Key Features
🔥 Prompt-based AI project generation (React + Tailwind)

⚡ Live preview via Sandpack

✏️ Built-in code editor

📦 Export project as ZIP (JSZip + file-saver)

💳 Token-based pricing system

🔐 Google OAuth authentication

🌗 Light/Dark theme with next-themes

🎞️ Animated UI support (Framer Motion + GSAP)

🚀 Deploy / Export UI toggles

🧩 Roadmap & Upcoming Enhancements
🔧 One-click deploy to user’s Vercel account

📚 More supported component libraries (MUI, Chakra, etc.)

👥 Multi-tenant workspace sharing

💾 Autosave + version history

💳 Additional payment methods (Stripe, crypto)

🌍 Localization + RTL support

## 🤝 Contribution
Contributions are welcome! To contribute:

### 1. Fork the repo

### 2. Create a new branch
```bash
git checkout -b feature/my-feature
```
### 3. Make your changes and commit
```bash
git commit -m "feat: add awesome feature"
```
### 4. Push the branch
```bash
git push origin feature/my-feature
```
Then open a Pull Request.

Please follow the existing conventions (React hooks, Tailwind classes, folder structure).

## 🧪 License

Licensed under the MIT License — free to use, modify, and distribute.
