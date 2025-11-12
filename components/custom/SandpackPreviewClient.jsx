"use client";

import React, { useRef, useEffect, useContext } from "react";
import { SandpackPreview, useSandpack } from "@codesandbox/sandpack-react";
import { ActionContext } from "@/context/ActionContext";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const SandpackPreviewClient = ({ files: outerFiles }) => {
  const previewRef = useRef();
  const { sandpack } = useSandpack();
  const { action, setAction } = useContext(ActionContext);

  // helper: create a zip from the `files` object (Sandpack file map)
  const downloadZip = async (fileMap) => {
    const zip = new JSZip();

    // fileMap keys are paths like "/src/main.jsx" or "/index.html"
    for (const [path, data] of Object.entries(fileMap || {})) {
      const content = typeof data === "string" ? data : data?.code || "";
      // sanitize leading slash for zip path
      const cleanPath = path.startsWith("/") ? path.slice(1) : path;
      zip.file(cleanPath, content);
    }

    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, "project.zip");
  };

  useEffect(() => {
    if (!action) return;

    (async () => {
      if (action.actionType === "export") {
        // prefer sandpack.files if available, otherwise fallback to outerFiles
        const map = sandpack?.files ?? outerFiles ?? {};
        try {
          await downloadZip(map);
        } catch (e) {
          console.error("Export error:", e);
          alert("Export failed. Check console for details.");
        } finally {
          // clear action if you want
          setAction({ actionType: null, timeStamp: Date.now() });
        }
      }

      if (action.actionType === "deploy") {
        // Best-effort: try to open preview iframe url if Sandpack exposes it.
        try {
          const client = previewRef.current?.getClient?.();
          // earlier you hit issues with getCodeSandboxURL — avoid calling it.
          // If we have a client with `openInNewTab` or `url` props, try them.
          if (client && typeof client.open !== "undefined") {
            // attempt to open the preview (best-effort)
            client.open();
          } else {
            // fallback: open CodeSandbox "Create Sandbox" page with no files
            window.open("https://codesandbox.io/s/new", "_blank");
            alert("Opened CodeSandbox. For direct deploy to Vercel you'd need an OAuth flow (not implemented).");
          }
        } catch (e) {
          console.error("Deploy fallback error:", e);
          window.open("https://codesandbox.io/s/new", "_blank");
          alert("Couldn't open preview directly. Opened codesandbox.io/s/new as fallback.");
        } finally {
          setAction({ actionType: null, timeStamp: Date.now() });
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action]);

  return <SandpackPreview ref={previewRef} style={{ height: "80vh" }} showNavigator />;
};

export default SandpackPreviewClient;


// import { SandpackPreview, useSandpack } from '@codesandbox/sandpack-react';
// import React, { useRef, useEffect } from 'react'; // Import useEffect

// const SandpackPreviewClient = () => {
//     const previewRef = useRef();
//     const { sandpack } = useSandpack();
//     const {action,setAction}=useContext(ActionContext);

//     useEffect(() => {
//         GetSandpackClient();
//     }, [sandpack&&action]); // Dependency array ensures this runs when `sandpack` changes

//     const GetSandpackClient = async() => {
//         const client = previewRef.current?.getClient();
//         if (client) {
//             console.log(client);
//             const result=await client.getCodeSandboxURL();
//             console.log(result);
//         }
//     };

//     return (
//         <SandpackPreview
//             ref={previewRef}
//             style={{ height: '80vh' }}
//             showNavigator={true}
//         />
//     );
// };

// export default SandpackPreviewClient;