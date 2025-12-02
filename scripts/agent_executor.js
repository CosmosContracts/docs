(function () {
  document.addEventListener("DOMContentLoaded", function () {
    // -------- STATE --------
    let expanded = false;
    let firstAssistantShown = false;

      let conversationHistory = [];
      let collectedWorkflows = [];

      async function sendToBackend(userText) {
          try {
              const response = await fetch("https://api.thousandmonkeystypewriter.org/chat", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                      query: userText,
                      history: conversationHistory,
                      workflows: collectedWorkflows
                  }),
              });

              if (!response.ok)
                  throw new Error("Bad backend response: " + response.status);

              return await response.json();

          } catch (err) {
              console.error("Backend error:", err);
              return {
                  mode: "error",
                  message: "❌ Error contacting backend: " + err.message,
              };
          }
      }

      // -------- COLLAPSED CHAT STRING --------
    const chatString = document.createElement("div");
    chatString.id = "chat-string";
    Object.assign(chatString.style, {
      position: "fixed",
      top: "110px",
      right: "40px",
      width: "230px",
      borderRadius: "9999px",
      background: "#ffffff",
      border: "1px solid #d1d5db",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "10px 16px",
      cursor: "text",
      zIndex: "2147483647",
      transition: "all 0.3s ease",
    });

    const input = document.createElement("input");
    input.placeholder = "What do you want to run?";
    Object.assign(input.style, {
      flex: "1",
      border: "none",
      outline: "none",
      fontSize: "14px",
      color: "#374151",
      background: "transparent",
    });

    const icon = document.createElement("span");
    icon.textContent = "➤";
    Object.assign(icon.style, {
      color: "#2f855a",
      fontWeight: "bold",
      cursor: "pointer",
      userSelect: "none",
    });

    chatString.appendChild(input);
    chatString.appendChild(icon);
    document.body.appendChild(chatString);

    // -------- EXPANDED SIDEBAR --------
    const sidebar = document.createElement("div");
    Object.assign(sidebar.style, {
      position: "fixed",
      top: "80px",
      right: "0",
      width: "440px",
      height: "calc(100vh - 80px)",
      background: "#fff",
      borderLeft: "1px solid #ddd",
      boxShadow: "-4px 0 12px rgba(0,0,0,0.1)",
      display: "flex",
      flexDirection: "column",
      transform: "translateX(100%)",
      transition: "transform 0.3s ease",
      zIndex: "2147483646",
      fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
    });

    // Header
    const header = document.createElement("div");
    Object.assign(header.style, {
      padding: "12px 16px",
      borderBottom: "1px solid #e5e7eb",
      background: "#f9fafb",
      fontWeight: "600",
      color: "#111827",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontSize: "14px",
    });
    header.textContent = "Docs Assistant";

    const closeBtn = document.createElement("span");
    closeBtn.textContent = "✕";
    closeBtn.style.cursor = "pointer";
    closeBtn.onclick = () => collapseSidebar();
    header.appendChild(closeBtn);
    sidebar.appendChild(header);

    // Chat area
    const chatArea = document.createElement("div");
    Object.assign(chatArea.style, {
      flex: "1",
      overflowY: "auto",
      padding: "16px",
      fontSize: "13px",
      color: "#2d3748",
      display: "flex",
      flexDirection: "column",
      gap: "6px",
    });
    const placeholder = document.createElement("div");
    placeholder.textContent = "Describe what you want to ask or execute...";
    Object.assign(placeholder.style, {
      textAlign: "center",
      color: "#a0aec0",
      marginTop: "40%",
    });
    chatArea.appendChild(placeholder);
    sidebar.appendChild(chatArea);

    // ---- Collapsible Suggestions ----
    const suggestionsWrap = document.createElement("div");
    Object.assign(suggestionsWrap.style, {
      borderTop: "1px solid #e2e8f0",
      background: "#f7faf7",
      padding: "10px 16px",
    });

    // Toggle section container
    let suggestionsOpen = true;

    // Header row with text + toggle arrow
    const suggestionsHeader = document.createElement("div");
    Object.assign(suggestionsHeader.style, {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      cursor: "pointer",
      userSelect: "none",
    });

    const suggestionsLabel = document.createElement("span");
    suggestionsLabel.textContent = "Suggestions";
    Object.assign(suggestionsLabel.style, {
      fontSize: "13px",
      fontWeight: "600",
      color: "#2d3748",
    });

    // Arrow icon
    const arrow = document.createElement("span");
    arrow.textContent = "▼";
    Object.assign(arrow.style, {
      fontSize: "12px",
      marginLeft: "6px",
      color: "#2d3748",
      transition: "transform 0.2s ease",
    });

    suggestionsHeader.appendChild(suggestionsLabel);
    suggestionsHeader.appendChild(arrow);
    suggestionsWrap.appendChild(suggestionsHeader);

    // Container holding suggestion buttons
    const suggestionsBody = document.createElement("div");
    Object.assign(suggestionsBody.style, {
      marginTop: "8px",
      display: "block",
    });

    // Toggle behavior
    suggestionsHeader.onclick = () => {
      suggestionsOpen = !suggestionsOpen;
      suggestionsBody.style.display = suggestionsOpen ? "block" : "none";
      arrow.style.transform = suggestionsOpen ? "rotate(0deg)" : "rotate(-90deg)";
    };


    const makeSugBtn = (text) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = text;
      Object.assign(btn.style, {
        display: "block",
        width: "100%",
        textAlign: "left",
        color: "#2f855a",
        background: "none",
        border: "none",
        fontSize: "13px",
        cursor: "pointer",
        padding: "4px 0",
      });
      btn.onmouseover = () => (btn.style.textDecoration = "underline");
      btn.onmouseout = () => (btn.style.textDecoration = "none");
      btn.onclick = () => {
        footerInput.value = text;
        footerInput.focus();

        // collapse suggestions after click
        suggestionsOpen = false;
        suggestionsBody.style.display = "none";
        arrow.style.transform = "rotate(-90deg)";
      };
      return btn;
    };

    [
      "How do I create and deploy a CosmWasm contract on Juno?",
      "Query a wallet’s bank balances via the REST API",
      "What RPC and REST endpoints should I use for Juno mainnet and testnet?",
      "What is Juno and what makes it different from other Cosmos chains?",
      "Broadcast a pre-signed transaction over gRPC",
      "Set mempool max-txs to -1 in app.toml",
      "Allow p2p port 26656 through ufw",
    ].forEach((s) => suggestionsBody.appendChild(makeSugBtn(s)));

    suggestionsWrap.appendChild(suggestionsBody);

    // Footer input
    const footer = document.createElement("form");
    Object.assign(footer.style, {
      borderTop: "1px solid #e2e2e2",
      padding: "10px",
      display: "flex",
      gap: "6px",
      alignItems: "center",
      background: "#fff",
    });

    const footerInput = document.createElement("input");
    footerInput.placeholder =
      "What do you want to ask about Juno?";
    Object.assign(footerInput.style, {
      flex: "1",
      border: "1px solid #cbd5e0",
      borderRadius: "8px",
      padding: "10px 12px",
      fontSize: "13px",
      outline: "none",
    });

    const execBtn = document.createElement("button");
    execBtn.type = "submit";
    execBtn.textContent = "Send";
    Object.assign(execBtn.style, {
      background: "#2f855a",
      color: "white",
      border: "none",
      borderRadius: "8px",
      padding: "10px 14px",
      cursor: "pointer",
      fontSize: "13px",
      fontWeight: "600",
    });

    footer.appendChild(footerInput);
    footer.appendChild(execBtn);

    // Compose sidebar (order matters)
    sidebar.appendChild(suggestionsWrap);
    sidebar.appendChild(footer);
    document.body.appendChild(sidebar);


    // ========= expand/collapse =========
    const expandSidebar = () => {
      expanded = true;
      sidebar.style.transform = "translateX(0)";
      chatString.style.opacity = "0";
      setTimeout(() => (chatString.style.display = "none"), 300);
      // focus footer input for immediate typing
      setTimeout(() => footerInput.focus(), 120);
    };

    const collapseSidebar = () => {
      expanded = false;
      sidebar.style.transform = "translateX(100%)";
      chatString.style.display = "flex";
      setTimeout(() => (chatString.style.opacity = "1"), 100);
    };

  function hideSuggestions() {
      if (suggestionsWrap) {
          suggestionsWrap.style.display = "none";
      }
  }

    input.addEventListener("focus", expandSidebar);
    icon.addEventListener("click", expandSidebar);
    chatString.addEventListener("click", () => input.focus());


    // ========= message utility ===========
      const addMsg = (role, htmlText) => {
          const msg = document.createElement("div");
          msg.innerHTML = htmlText;

          Object.assign(msg.style, {
              marginBottom: "6px",
              maxWidth: "90%",
              padding: "8px 10px",
              borderRadius: "10px",
              fontSize: "13px",
              whiteSpace: "normal",
              wordBreak: "break-word",
          });

          if (role === "user") {
              msg.style.background = "#dcfce7";
              msg.style.marginLeft = "auto";
          } else {
              msg.style.background = "#edf2f7";
          }

          chatArea.appendChild(msg);
          chatArea.scrollTop = chatArea.scrollHeight;

          // 🔥 NEW: store message in history
          conversationHistory.push({
              role,
              content: htmlText
          });
      };

      function showExecutionModal(result) {
          // Remove old modal if exists
          const existing = document.getElementById("execution-modal");
          if (existing) existing.remove();

          const overlay = document.createElement("div");
          overlay.id = "execution-modal";
          Object.assign(overlay.style, {
              position: "fixed",
              top: 0, left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,0.45)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: "999999"
          });

          const box = document.createElement("div");
          Object.assign(box.style, {
              background: "#fff",
              padding: "22px",
              borderRadius: "12px",
              width: "420px",
              maxHeight: "80vh",
              overflowY: "auto",
              boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
              fontFamily: "Inter, sans-serif"
          });

          // Title
          const title = document.createElement("h3");
          title.textContent = result.status === "success" ? "Execution Summary" : "Execution Failed";
          Object.assign(title.style, {
              fontSize: "18px",
              marginBottom: "10px",
              fontWeight: "600",
          });
          box.appendChild(title);

          // Message
          const msg = document.createElement("p");
          msg.textContent = result.message || "(no message)";
          Object.assign(msg.style, { marginBottom: "12px", fontSize: "14px" });
          box.appendChild(msg);

          // Data block
          if (result.data) {
              const pre = document.createElement("pre");
              pre.textContent = JSON.stringify(result.data, null, 2);
              Object.assign(pre.style, {
                  background: "#1a202c",
                  color: "#f7fafc",
                  padding: "8px",
                  borderRadius: "6px",
                  fontSize: "11px",
                  whiteSpace: "pre-wrap",
                  overflowX: "auto",
                  marginBottom: "10px"
              });
              box.appendChild(pre);
          }

          // Steps list
          if (Array.isArray(result.steps)) {
              const stepsTitle = document.createElement("p");
              stepsTitle.textContent = "Execution Steps:";
              Object.assign(stepsTitle.style, { fontWeight: "600", marginTop: "10px" });
              box.appendChild(stepsTitle);

              const ul = document.createElement("ul");
              result.steps.forEach(s => {
                  const li = document.createElement("li");
                  li.textContent = s;
                  ul.appendChild(li);
              });
              box.appendChild(ul);
          }

          // Close button
          const close = document.createElement("button");
          close.textContent = "Close";
          Object.assign(close.style, {
              marginTop: "16px",
              width: "100%",
              padding: "10px",
              background: "#2b6cb0",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600"
          });
          close.onclick = () => overlay.remove();
          box.appendChild(close);

          overlay.appendChild(box);
          document.body.appendChild(overlay);
      }

      // ========= workflow preview ===========
      const renderWorkflow = (workflowArray, recipeTitle) => {
          const container = document.createElement("div");
          Object.assign(container.style, {
              background: "#f9fafb",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              padding: "12px",
              margin: "6px 6px 10px 6px",
              fontSize: "12px",
              color: "#374151",
          });

          // === Recipe title ===
          const title = document.createElement("div");
          title.textContent = recipeTitle || "Workflow";
          Object.assign(title.style, {
              fontWeight: "600",
              fontSize: "14px",
              marginBottom: "6px",
          });
          container.appendChild(title);

          // 🔥 Store workflow metadata for backend context
          collectedWorkflows.push({
              recipe: recipeTitle,
              workflow: workflowArray
          });

          // === Collapsible workflow body ===
          const body = document.createElement("details");
          body.className = "workflow-body";
          body.open = false; // collapsed by default

          const summary = document.createElement("summary");
          summary.textContent = "Show workflow steps";
          Object.assign(summary.style, {
              cursor: "pointer",
              color: "#2b6cb0",
              fontWeight: "600",
              marginBottom: "8px",
          });
          body.appendChild(summary);

          const bodyContent = document.createElement("div");
          Object.assign(bodyContent.style, {
              paddingTop: "6px",
          });

          // === Steps ===
          workflowArray.forEach((step, idx) => {
              // === Step container (collapsible) ===
              const stepBox = document.createElement("details");
              stepBox.style.marginBottom = "6px";
              stepBox.open = false; // collapsed by default

// summary line
              const stepSummary = document.createElement("summary");
              stepSummary.textContent = `Step ${idx + 1}: ${step.tool || "Unnamed tool"}`;
              Object.assign(stepSummary.style, {
                  cursor: "pointer",
                  fontWeight: "600",
                  color: "#2b6cb0",
              });
              stepBox.appendChild(stepSummary);

// inner content — shown only when expanded
              const inner = document.createElement("div");
              Object.assign(inner.style, {
                  padding: "6px 0 0 4px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
              });

// restore description
              if (step.description) {
                  const desc = document.createElement("p");
                  desc.textContent = step.description;
                  desc.style.fontSize = "12px";
                  inner.appendChild(desc);
              }

// restore metadata
              if (step.type || step.function) {
                  const meta = document.createElement("p");
                  meta.textContent = `${step.type || ""}${step.function ? " • " + step.function : ""}`;
                  Object.assign(meta.style, {
                      fontSize: "12px",
                      color: "#6b7280"
                  });
                  inner.appendChild(meta);
              }

// restore code block
              if (step.code) {
                  const codeBlock = document.createElement("pre");
                  codeBlock.textContent = step.code;
                  Object.assign(codeBlock.style, {
                      background: "#1a202c",
                      color: "#f7fafc",
                      padding: "8px",
                      borderRadius: "6px",
                      fontSize: "11px",
                      overflowX: "auto",
                      whiteSpace: "pre-wrap"
                  });
                  inner.appendChild(codeBlock);
              }

              stepBox.appendChild(inner);

              // Description
              if (step.description) {
                  const desc = document.createElement("p");
                  desc.textContent = step.description;
                  Object.assign(desc.style, { marginBottom: "4px", fontSize: "12px" });
                  inner.appendChild(desc);
              }

              // Type / function metadata
              if (step.type || step.function) {
                  const meta = document.createElement("p");
                  meta.style.fontSize = "12px";
                  meta.style.color = "#6b7280";
                  meta.textContent = `${step.type || ""} ${step.function ? "• " + step.function : ""}`;
                  inner.appendChild(meta);
              }

              // Code block
              if (step.code) {
                  const codeBlock = document.createElement("pre");
                  codeBlock.textContent = step.code;
                  Object.assign(codeBlock.style, {
                      background: "#1a202c",
                      color: "#f7fafc",
                      padding: "8px",
                      borderRadius: "6px",
                      whiteSpace: "pre-wrap",
                      overflowX: "auto",
                      fontSize: "11px",
                  });
                  inner.appendChild(codeBlock);
              }

              // Wrapper for visible output zone
              const wrapper = document.createElement("div");
              wrapper.className = "step-wrapper";
              wrapper.style.marginBottom = "8px";
              wrapper.appendChild(stepBox);
              bodyContent.appendChild(wrapper);
          });

          body.appendChild(bodyContent);
          container.appendChild(body);

          // === Execute button ===
          const controls = document.createElement("div");
          Object.assign(controls.style, {
              marginTop: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
          });

          const mockBtn = document.createElement("button");
          mockBtn.textContent = "Execute";
          Object.assign(mockBtn.style, {
              padding: "8px",
              background: "#2f855a",
              color: "#fff",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
          });

          // ----- Mock Execute Handler -----
          mockBtn.onclick = async () => {
              // addMsg("assistant", "🔄 Executing workflow…");

              let result;
              try {
                  const response = await fetch("https://api.thousandmonkeystypewriter.org/generate", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({query: recipeTitle}),
                  });

                  if (!response.ok) throw new Error("Backend execution failed: " + response.status);
                  result = await response.json();
              } catch (err) {
                  addMsg("assistant", "❌ Execution error: " + err.message);
                  return;
              }

              // --- Now handle response ---
              if (!result.status) {
                  addMsg("assistant", "⚠️ Unexpected backend response format.");
                  console.error(result);
                  return;
              }

              // 1) Show chat status message
              if (result.status === "success") {
                  addMsg(
                      "assistant",
                      `🧪 Executed in simulation mode.<br><br>
       <strong>${result.message}</strong><br><br>
       To execute on-chain, provide these parameters:<br>
       <code>${(result.required || []).join(", ")}</code>`
                  );
                  hideSuggestions(); // user is already in workflow mode
              } else {
                  addMsg("assistant", `❌ Execution failed: ${result.message || "Unknown error"}`);
              }

              // 2) Show popup modal summary
              showExecutionModal(result);
          };

          controls.appendChild(mockBtn);
          container.appendChild(controls);
          chatArea.appendChild(container);
          chatArea.scrollTop = chatArea.scrollHeight;
      };

      // ========= main submit ===========
      footer.onsubmit = async (e) => {
          e.preventDefault();
          const text = footerInput.value.trim();
          if (!text) return;
          footerInput.value = "";

          if (placeholder.parentNode) placeholder.parentNode.removeChild(placeholder);

          addMsg("user", text);

          // Show "thinking" placeholder
          const thinking = document.createElement("div");
          thinking.textContent = "Thinking…";
          Object.assign(thinking.style, {
              padding: "8px 10px",
              borderRadius: "10px",
              background: "#f3f4f6",
              maxWidth: "90%",
              fontSize: "13px",
          });
          chatArea.appendChild(thinking);

          const result = await sendToBackend(text);

          thinking.remove();

          // ===== Branching logic =====
          if (result.mode === "error") {
              addMsg("assistant", result.message);
              return;
          }

          if (result.mode === "answer") {
              addMsg("assistant", result.answer);
              return;
          }

          if (result.mode === "workflow") {
              addMsg("assistant", "⚙️ Executable workflow detected:");
              renderWorkflow(result.workflow);
              return;
          }

          if (result.mode === "mixed") {
              if (result.answer) addMsg("assistant", result.answer);
              if (result.workflow) {
                  // addMsg("assistant", "⚙️ Execution plan:");
                  renderWorkflow(result.workflow, result.recipe);
              }
              return;
          }

          // fallback
          addMsg("assistant", "❓ Unexpected backend format.");
      };
  });
})();



