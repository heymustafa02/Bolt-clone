import dedent from "dedent";

export default {
  SUGGESTIONS: ['Create ToDo App in React', 'Create Budget Track App', 'Create Gym Managment Portal Dashboard', 'Create Quizz App On History', 'Create Login Signup Screen'],
  HERO_HEADING: 'What do you want to build?',
  HERO_DESC: 'Prompt, run, edit, and deploy full-stack web apps.',
  INPUT_PLACEHOLDER: 'What you want to build?',
  SIGNIN_HEADING: 'Continue With Bolty',
  SIGNIN_SUBHEADING: 'To use Bolty you must log into an existing account or create one.',
  SIGNIn_AGREEMENT_TEXT: 'By using Bolty, you agree to the collection of usage data for analytics.',


  DEFAULT_FILE: {
    '/public/index.html': {
      code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React App</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`
    },
    '/App.js': {
      code: `export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-8">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome! 🚀</h1>
        <p className="text-gray-600 text-lg">Start building something amazing...</p>
      </div>
    </div>
  );
}`
    },
    '/index.js': {
      code: `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);`
    }
    // REMOVED: /App.css, /tailwind.config.js, /postcss.config.js
    // These don't work with Sandpack CDN approach
  },
  DEPENDANCY: {
    // REMOVED: "postcss", "tailwindcss", "autoprefixer"
    // These are for build-time compilation, not needed with CDN
    "uuid4": "^2.0.3",
    "tailwind-merge": "^2.4.0",
    "tailwindcss-animate": "^1.0.7",
    "lucide-react": "^0.469.0",
    "react-router-dom": "^7.1.1",
    "firebase": "^11.1.0",
    "@google/generative-ai": "^0.21.0",
    "date-fns": "^4.1.0",
    "react-chartjs-2": "^5.3.0",
    "chart.js": "^4.4.7",
  },
  PRICING_DESC:'Start with a free account to speed up your workflow on public projects or boost your entire team with instantly-opening production environments.',
  PRICING_OPTIONS:[
    {
      name:'Basic',
      tokens:'50K',
      value:50000,
      desc:'Ideal for hobbyists and casual users for light, exploratory use.',
      price:4.99
    },
    {
      name:'Starter',
      tokens:'120K',
      value:120000,
      desc:'Designed for professionals who need to use Bolty a few times per week.',
      price:9.99
    },
    {
      name:'Pro',
      tokens:'2.5M',
      value:2500000,
      desc:'Designed for professionals who need to use Bolty a few times per week.',
      price:19.99
    },
    {
      name:'Unlimited (License)',
      tokens:'Unlimited',
      value:999999999,
      desc:'Designed for professionals who need to use Bolty a few times per week.',
      price:49.99
    }
  ]
}