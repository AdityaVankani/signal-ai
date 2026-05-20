if (window.signalAIInjected) {
  console.warn("Signal AI already injected");
} else {
  window.signalAIInjected = true;
}

// ========================================
// CREATE RESULT MODAL
// ========================================

function createModal(data) {

  const oldModal =
    document.getElementById(
      "linkedin-ai-modal"
    );

  if (oldModal) {
    oldModal.remove();
  }

  // Overlay
  const overlay =
    document.createElement("div");

  overlay.id =
    "linkedin-ai-modal";

  overlay.className =
    "linkedin-ai-overlay";


  // Modal
  const modal =
    document.createElement("div");

  modal.className =
    "linkedin-ai-modal";


  modal.innerHTML = `

    <div class="ai-header">

      <div>

        <div class="ai-badge">
          AI Signal Analysis
        </div>

        <h2 class="ai-signal">
          ${data.signal}
        </h2>

      </div>

      <div class="ai-confidence">
        ${Math.round(data.confidence * 100)}%
      </div>

    </div>


    <div class="ai-reason-card">

      <div class="ai-section-label">
        Why this matters
      </div>

      <div class="ai-reason-text">
        ${data.reasoning}
      </div>

    </div>


    <div
      class="ai-section-label"
      style="margin-bottom:16px;"
    >
      Suggested Outreach
    </div>


    <div class="ai-message-list">

      ${data.messages.map((msg, i) => `

        <div class="ai-message-card">

          <div class="ai-message-title">
            Message ${i + 1}
          </div>

          <div class="ai-message-text">
            ${msg}
          </div>

          <button
            class="ai-copy-btn"
            data-text="${msg}"
          >
            Copy Message
          </button>

        </div>

      `).join("")}

    </div>


    <button
      id="close-modal"
      class="ai-close-btn"
    >
      Close
    </button>

  `;

  overlay.appendChild(modal);

  document.body.appendChild(
    overlay
  );

  // Close button
  document
    .getElementById(
      "close-modal"
    )
    .onclick = () => {

      overlay.remove();

    };

  // Copy buttons
  document
    .querySelectorAll(".ai-copy-btn")
    .forEach((btn) => {

      btn.onclick = () => {

        navigator.clipboard.writeText(
          btn.dataset.text
        );

        btn.innerText =
          "Copied!";

        setTimeout(() => {

          btn.innerText =
            "Copy Message";

        }, 1500);
      };
    });

  // Outside click
  overlay.onclick = (e) => {

    if (e.target === overlay) {

      overlay.remove();
    }
  };
}


// ========================================
// ANALYZE POST
// ========================================

async function analyzePost(postText) {

  try {

    // ========================================
    // LOAD SETTINGS + TOKEN
    // ========================================

    const settings =
      await new Promise((resolve) => {

        chrome.storage.local.get(
          [
            "mode",
            "geminiApiKey",
            "geminiModel",
            "tone",
            "token"
          ],

          (result) => {

            resolve(result);

          }
        );

      });

    // ========================================
    // BLOCK IF NOT LOGGED IN
    // ========================================

    if (!settings.token) {

      alert(
        "Please login to use Signal AI."
      );

      return;
    }

    // ========================================
    // REQUEST BODY
    // ========================================

    const requestBody = {

      author: "unknown",

      profile_url: "",

      post_text: postText,

      tone:
        settings.tone || "professional",

      mode:
        settings.mode || "hosted",

      api_key:
        settings.geminiApiKey || "",

      model:
        settings.geminiModel ||
        "gemini-3.1-flash-lite-preview"
    };

    // ========================================
    // API CALL
    // ========================================

    const response =
      await fetch(
        "https://signal-ai-wi1d.onrender.com/analyze-post",
        {
          method: "POST",

          headers: {

            "Content-Type":
              "application/json",

            "Authorization":
              `Bearer ${settings.token}`
          },

          body: JSON.stringify(
            requestBody
          )
        }
      );

    // ========================================
    // HANDLE UNAUTHORIZED
    // ========================================

    if (response.status === 401) {

      chrome.storage.local.remove(
        "token"
      );

      alert(
        "Session expired. Please login again."
      );

      return;
    }

    // ========================================
    // HANDLE FAILURE
    // ========================================

    if (!response.ok) {

      throw new Error(
        `Backend Error ${response.status}`
      );
    }

    // ========================================
    // SUCCESS
    // ========================================

    const data =
      await response.json();

    createModal(data);

  } catch (err) {

    console.error(err);

    alert(
      "AI analysis failed."
    );
  }
}


// ========================================
// INJECT BUTTONS
// ========================================

function injectButtons() {

  const textBoxes =
    document.querySelectorAll(
      '[data-testid="expandable-text-box"]'
    );


  textBoxes.forEach((textBox) => {

    // ===================================
    // AVOID DUPLICATES
    // ===================================

    if (
      textBox.dataset.signalInjected
    ) {
      return;
    }

    // ===================================
    // GET POST TEXT
    // ===================================

    const postText =
      textBox.innerText?.trim();

    if (
      !postText ||
      postText.length < 50
    ) {
      return;
    }

    textBox.dataset.signalInjected =
      "true";

    

    // ===================================
    // CREATE WRAPPER
    // ===================================

    const wrapper =
      document.createElement("div");

    wrapper.style.marginTop =
      "12px";

    wrapper.style.display =
      "flex";

    wrapper.style.alignItems =
      "center";

    wrapper.style.gap =
      "10px";

    // ===================================
    // BUTTON
    // ===================================

    const btn =
      document.createElement(
        "button"
      );

    btn.innerText =
      "✨ Analyze";

    btn.style.padding =
      "8px 18px";

    btn.style.border =
      "none";

    btn.style.borderRadius =
      "999px";

    btn.style.background =
      "#0A66C2";

    btn.style.color =
      "#fff";

    btn.style.fontWeight =
      "600";

    btn.style.cursor =
      "pointer";

    btn.style.fontSize =
      "14px";

    btn.style.boxShadow =
      "0 2px 8px rgba(0,0,0,0.15)";

    btn.style.transition =
      "all 0.2s ease";

    btn.onmouseenter = () => {

      btn.style.opacity = "0.9";

    };

    btn.onmouseleave = () => {

      btn.style.opacity = "1";

    };

    // ===================================
    // CLICK
    // ===================================

    btn.onclick =
      async (e) => {

        e.stopPropagation();

        btn.innerText =
          "Analyzing...";

        btn.disabled = true;

        try {

          await analyzePost(
            postText
          );

        } catch (err) {

          console.error(err);

        }

        btn.innerText =
          "✨ Analyze";

        btn.disabled = false;
      };

    // ===================================
    // APPEND
    // ===================================

    wrapper.appendChild(btn);

    textBox.insertAdjacentElement(
      "afterend",
      wrapper
    );

  });
}



// ========================================
// INITIAL LOAD
// ========================================

injectButtons();


// ========================================
// SMART OBSERVER
// ========================================

let injectTimeout = null;

const observer =
  new MutationObserver((mutations) => {

    let shouldInject = false;

    for (const mutation of mutations) {

      if (
        mutation.addedNodes &&
        mutation.addedNodes.length > 0
      ) {
        shouldInject = true;
        break;
      }
    }

    if (!shouldInject) {
      return;
    }

    if (injectTimeout) {
      return;
    }

    injectTimeout =
      setTimeout(() => {

        injectButtons();

        injectTimeout = null;

      }, 1500);

  });

observer.observe(document.body, {
  childList: true,
  subtree: true
});