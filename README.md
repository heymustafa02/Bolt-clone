⚡ Bolty – AI-Powered Code Assistant

A production-ready full-stack platform that turns natural-language prompts into animated React apps with live preview, deploy/export, and token-based tiered pricing.

🎯 What it is

Bolty enables users to:

Enter a natural-language prompt (e.g., “Build a dashboard with Framer Motion animations”)

Instantly generate a full React + Tailwind-CSS app (via CDN) using AI

Preview it live in-browser, edit files, export ZIP or deploy

Choose pricing tiers to unlock tokens, pay via PayPal

Save workspaces, chat with AI, and build production-quality UIs with animation, GSAP/Framer Motion, shadcn/ui, charts, etc.

🧱 Tech Stack
Layer	Technology
Front-end	Next.js (App Router), React
Styling	Tailwind CSS via CDN
Live Preview	Sandpack (codesandbox-react)
Backend & Database	Convex (serverless functions & schema)
AI Integration	Generative-AI API (via configs/AiModel.jsx)
Authentication & Payments	Google OAuth (Clerk or custom) + PayPal Buttons
UI Libraries	Framer Motion, GSAP, shadcn/ui, lucide-react icons
Deployment	Vercel
🗂 Project Structure
/app/                     – Next.js application directory  
/components/             – UI + custom app components  
/configs/                – AI model config, prompts  
/context/                – React context providers (Messages, UserDetail, Action)  
/convex/                 – Schema + backend functions  
/data/                   – Static lookup/prompt files (Lookup.jsx, Prompt.jsx)  
/hooks/                  – Custom hooks  
/lib/                    – Utility functions  
/public/                 – Static assets  
package.json             – Dependencies & scripts  
README.md                – You're here  

🏁 Getting Started (Developer Mode)

Clone the repo

git clone https://github.com/heymustafa02/Bolt-clone.git
cd Bolt-clone


Install dependencies

npm install
# or yarn / pnpm


Add environment variables (create .env.local)

NEXT_PUBLIC_CONVEX_URL=<your convex deployment>
NEXT_PUBLIC_GOOGLE_CLIENT_ID_KEY=<your Google OAuth client ID>
NEXT_PUBLIC_PAYPAL_CLIENT_ID=<your PayPal Client ID>
NEXT_PUBLIC_GEMINI_API_KEY=<your Gemini API Key>


Run in development mode

npm run dev


Visit http://localhost:3000 to preview.

Build for production

npm run build
npm run start

💼 Pricing & Token Model

From data/Lookup.jsx:

[
  { name:'Basic',        tokens:'50 K',    value:50000,   price:4.99  },
  { name:'Starter',      tokens:'120 K',   value:120000,  price:9.99  },
  { name:'Pro',          tokens:'2.5 M',   value:2500000, price:19.99 },
  { name:'Unlimited',    tokens:'Unlimited',value:999999999, price:49.99 }
]


Payments are processed via PayPal; on success the user’s token count is updated in Convex.

✅ Key Features

Prompt-based project generation (React + Tailwind + animation)

Live preview & code editor via Sandpack

Export project as ZIP (via JSZip & file-saver)

Tiered pricing model & token consumption

Authentication via Google OAuth

Light / Dark theme support (via next-themes)

Animated UIs built with Framer Motion & GSAP

Seamless deploy/export UI toggles

🧩 Roadmap & Enhancements

 Direct one-click deploy to user’s Vercel account

 Support for more UI libraries/components (e.g., Material UI, Chakra)

 Multi-tenant workspace saving/sharing

 Autosave drafts & version history

 Additional payment providers (Stripe, crypto)

 Localization & RTL support

🤝 Contribution

Contributions are welcome! Here’s how you can help:

Fork the repository

Create a branch: git checkout -b feature/awesome-feature

Commit your changes: git commit -m "feat: add awesome feature"

Push and open a Pull Request

Ensure your code follows existing conventions (React hooks, Tailwind, etc.)

🧪 License

This project is released under the MIT License — feel free to use, modify, and distribute.
