// "use client";

// import React, { useState, useEffect, useContext, useCallback } from "react";
// import { useMutation } from "convex/react";
// import { api } from "@/convex/_generated/api";
// import {
//   SandpackProvider,
//   SandpackLayout,
//   SandpackCodeEditor,
//   SandpackPreview,
//   SandpackFileExplorer,
// } from "@codesandbox/sandpack-react";
// import Lookup from "@/data/Lookup";
// import Prompt from "@/data/Prompt";
// import { MessagesContext } from "@/context/MessagesContext";
// import { useConvex } from "convex/react";
// import { useParams } from "next/navigation";
// import { Loader2Icon } from "lucide-react";
// import { countToken } from "./countToken";
// import { UserDetailContext } from "@/context/UserDetailContext";
// import SandpackPreviewClient from "./SandpackPreviewClient";
// import { ActionContext } from "@/context/ActionContext";

// // ✅ import theme hook
// import { useTheme } from "next-themes";

// function CodeView() {
//   const { id } = useParams();
//   const { theme } = useTheme(); // ✅ detect light / dark
//   const { userDetail, setUserDetail } = useContext(UserDetailContext);
//   const [activeTab, setActiveTab] = useState("code");
//   const [files, setFiles] = useState(Lookup?.DEFAULT_FILE || {});
//   const { messages } = useContext(MessagesContext);
//   const updateFiles = useMutation(api.workspace.updateFiles);
//   const UpdateTokens = useMutation(api.users.UpdateToken);
//   const convex = useConvex();
//   const [loading, setLoading] = useState(false);

//   const GetFiles = useCallback(async () => {
//     setLoading(true);
//     const result = await convex.query(api.workspace.GetWorkspace, {
//       workspaceId: id,
//     });
//     const mergedFiles = { ...Lookup.DEFAULT_FILE, ...result?.fileData };
//     setFiles(mergedFiles);
//     setLoading(false);
//   }, [id, convex]);

//   useEffect(() => {
//     id && GetFiles();
//   }, [id, GetFiles]);

//   useEffect(() => {
//     if (messages?.length > 0 && messages[messages.length - 1]?.role === "user") {
//       GenerateAiCode();
//     }
//   }, [messages]);

//   const GenerateAiCode = async () => {
//     setLoading(true);
//     try {
//       const PROMPT = JSON.stringify(messages) + " " + Prompt.CODE_GEN_PROMPT;

//       const result = await fetch("/api/gen-ai-code", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ prompt: PROMPT }),
//       });

//       const aiResp = await result.json();
//       const mergedFiles = { ...Lookup.DEFAULT_FILE, ...aiResp?.files };
//       setFiles(mergedFiles);

//       await updateFiles({ workspaceId: id, file: aiResp?.files });

//       const token = Number(userDetail?.token) - Number(countToken(JSON.stringify(aiResp)));
//       await UpdateTokens({ userId: userDetail?._id, token });
//       setUserDetail(prev => ({ ...prev, token }));

//       setActiveTab("code");
//     } catch (error) {
//       console.error(error);
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="relative">
//       <div className="bg-[#181818] dark:bg-[#181818] bg-white w-full p-2 border">
//         <div className="flex items-center flex-wrap shrink-0 bg-black dark:bg-black bg-gray-200 text-black dark:text-white p-1 justify-center rounded-full w-[140px] gap-3">
//           <h2
//             onClick={() => setActiveTab("code")}
//             className={`text-sm cursor-pointer ${activeTab === "code" && "text-blue-500 p-1 px-2 rounded-full"}`}
//           >
//             Code
//           </h2>
//           <h2
//             onClick={() => setActiveTab("preview")}
//             className={`text-sm cursor-pointer ${activeTab === "preview" && "text-blue-500 p-1 px-2 rounded-full"}`}
//           >
//             Preview
//           </h2>
//         </div>
//       </div>

//       {/* ✅ Light/Dark Mode Enabled Here */}
//       <SandpackProvider
//         files={files}
//         template="react"
//         theme={theme === "dark" ? "dark" : "light"} // ✅ key line
//         customSetup={{
//           dependencies: { ...Lookup.DEPENDANCY },
//         }}
//         options={{
//           externalResources:['https://cdn.tailwindcss.com']
//         }}
//       >
//         <SandpackLayout>
//           {activeTab === "code" ? (
//             <>
//               <SandpackFileExplorer style={{ height: "80vh" }} />
//               <SandpackCodeEditor style={{ height: "80vh" }} />
//             </>
//           ) : (
//             <SandpackPreviewClient />
//           )}
//         </SandpackLayout>
//       </SandpackProvider>

//       {loading && (
//         <div className="p-10 bg-gray-900 dark:bg-gray-900 bg-gray-200 opacity-80 absolute top-0 rounded-lg w-full h-full flex items-center justify-center">
//           <Loader2Icon className="animate-spin h-10 w-10 text-white" />
//           <h2 className="text-white">Generating your files...</h2>
//         </div>
//       )}
//     </div>
//   );
// }

// export default CodeView;
"use client";

import React, { useState, useEffect, useContext, useCallback } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import Lookup from "@/data/Lookup";
import Prompt from "@/data/Prompt";
import { MessagesContext } from "@/context/MessagesContext";
import { useConvex } from "convex/react";
import { useParams } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import { countToken } from "./countToken";
import { UserDetailContext } from "@/context/UserDetailContext";
import SandpackPreviewClient from "./SandpackPreviewClient";
import { ActionContext } from "@/context/ActionContext";
import { useTheme } from "next-themes";

function CodeView() {
  const { id } = useParams();
  const { theme } = useTheme();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [activeTab, setActiveTab] = useState("code");
  const [files, setFiles] = useState(Lookup?.DEFAULT_FILE || {});
  const { messages } = useContext(MessagesContext);
  const updateFiles = useMutation(api.workspace.updateFiles);
  const UpdateTokens = useMutation(api.users.UpdateToken);
  const convex = useConvex();
  const [loading, setLoading] = useState(false);
  const { action, setAction } = useContext(ActionContext);

  // ----- Normalize AI files into a Vite-friendly structure -----
  const normalizeFiles = (rawFiles = {}) => {
    const f = { ...rawFiles };

    // If AI returned top-level /index.js or /App.js, convert to /src structure for Vite
    // prefer /src/main.jsx and /src/App.jsx
    if (f["/index.js"] && !f["/index.html"]) {
      // create index.html if missing (Vite will look for index.html)
      f["/index.html"] = {
        code: `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <title>Preview</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`,
      };
      // move /index.js => /src/main.jsx (update root id)
      f["/src/main.jsx"] = {
        code: f["/index.js"].code.replace("document.getElementById('root')", "document.getElementById('app')"),
      };
      delete f["/index.js"];
    }

    if (f["/App.js"] && !f["/src/App.jsx"]) {
      f["/src/App.jsx"] = { code: f["/App.js"].code };
      delete f["/App.js"];
    }

    // If the AI created /public/index.html, move to /index.html (Sandpack/Vite expects /index.html root)
    if (f["/public/index.html"] && !f["/index.html"]) {
      f["/index.html"] = { code: f["/public/index.html"].code };
      delete f["/public/index.html"];
    }

    // Ensure we have a /src/main.jsx entry if not present
    if (!f["/src/main.jsx"]) {
      // If there is an /index.js left, convert it; otherwise create a tiny entry
      if (f["/index.js"]) {
        f["/src/main.jsx"] = { code: f["/index.js"].code.replace("document.getElementById('root')", "document.getElementById('app')") };
        delete f["/index.js"];
      } else {
        f["/src/main.jsx"] = {
          code: `import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const root = createRoot(document.getElementById("app"));
root.render(<App />);`,
        };
      }
    }

    // If App exists at root path (like "/App.jsx" or "/App.js"), move to /src/App.jsx
    if (f["/App.jsx"] && !f["/src/App.jsx"]) {
      f["/src/App.jsx"] = { code: f["/App.jsx"].code };
      delete f["/App.jsx"];
    }

    // Ensure at least a basic App
    if (!f["/src/App.jsx"]) {
      f["/src/App.jsx"] = {
        code: `export default function App(){ return (<div className="min-h-screen flex items-center justify-center"> <h1 className="text-2xl font-bold">Empty preview</h1></div>) }`,
      };
    }

    // Add index.html if completely missing (very small)
    if (!f["/index.html"]) {
      f["/index.html"] = {
        code: `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <title>Preview</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`,
      };
    }

    return f;
  };

  const GetFiles = useCallback(async () => {
    setLoading(true);
    const result = await convex.query(api.workspace.GetWorkspace, {
      workspaceId: id,
    });
    const mergedFiles = { ...Lookup.DEFAULT_FILE, ...result?.fileData };
    setFiles(normalizeFiles(mergedFiles));
    setLoading(false);
  }, [id, convex]);

  useEffect(() => {
    id && GetFiles();
  }, [id, GetFiles]);

  useEffect(() => {
    if (messages?.length > 0 && messages[messages.length - 1]?.role === "user") {
      GenerateAiCode();
    }
  }, [messages]);

  const GenerateAiCode = async () => {
    setLoading(true);
    try {
      const PROMPT = JSON.stringify(messages) + " " + Prompt.CODE_GEN_PROMPT;

      const result = await fetch("/api/gen-ai-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: PROMPT }),
      });

      const aiResp = await result.json();
      const mergedFiles = { ...Lookup.DEFAULT_FILE, ...aiResp?.files };
      setFiles(normalizeFiles(mergedFiles));

      await updateFiles({ workspaceId: id, file: aiResp?.files });

      const token = Number(userDetail?.token) - Number(countToken(JSON.stringify(aiResp)));
      await UpdateTokens({ userId: userDetail?._id, token });
      setUserDetail(prev => ({ ...prev, token }));

      setActiveTab("code");
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  // ---- NOTE: here we explicitly add needed deps so Sandpack will install them ----
  const extraDeps = {
    "framer-motion": "^8.0.0",
    "gsap": "^3.12.5",
    "lucide-react": "^0.469.0",
    // keep rest of project's deps too
    ...Lookup.DEPENDANCY,
  };

  return (
    <div className="relative">
      <div className="bg-[#181818] w-full p-2 border">
        <div className="flex items-center flex-wrap shrink-0 bg-black p-1 justify-center rounded-full w-[140px] gap-3">
          <h2 onClick={() => setActiveTab("code")} className={`text-sm cursor-pointer ${activeTab === "code" && "text-blue-500 p-1 px-2 rounded-full"}`}>Code</h2>
          <h2 onClick={() => setActiveTab("preview")} className={`text-sm cursor-pointer ${activeTab === "preview" && "text-blue-500 p-1 px-2 rounded-full"}`}>Preview</h2>
        </div>
      </div>

      <SandpackProvider
        files={files}
        template="vite-react"
        theme={theme === "dark" ? "dark" : "light"}
        customSetup={{
          dependencies: {
            ...extraDeps,
          },
        }}
        options={{
          externalResources: ["https://cdn.tailwindcss.com"],
        }}
      >
        <SandpackLayout>
          {activeTab === "code" ? (
            <>
              <SandpackFileExplorer style={{ height: "80vh" }} />
              <SandpackCodeEditor style={{ height: "80vh" }} />
            </>
          ) : (
            <SandpackPreviewClient files={files} />
          )}
        </SandpackLayout>
      </SandpackProvider>

      {loading && (
        <div className="p-10 bg-gray-900 opacity-80 absolute inset-0 flex items-center justify-center">
          <Loader2Icon className="animate-spin h-10 w-10 text-white" />
          <h2 className="text-white">Generating your files...</h2>
        </div>
      )}
    </div>
  );
}

export default CodeView;
