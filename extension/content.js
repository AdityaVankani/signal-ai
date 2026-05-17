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
        "gemini-2.5-flash"
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

  const posts =
    document.querySelectorAll(
      'span[data-testid="expandable-text-box"]'
    );

  posts.forEach((textBox) => {

    if (
      textBox.parentElement.querySelector(
        ".linkedin-ai-btn"
      )
    ) {
      return;
    }

    const postText =
      textBox.innerText?.trim();

    if (
      !postText ||
      postText.length < 20
    ) {
      return;
    }

    let container =
      textBox.parentElement;

    let level = 0;

    while (
      container &&
      level < 15
    ) {

      const sendButton =
        container.querySelector(
          '[aria-label="Send"]'
        );

      if (sendButton) {

        if (
          container.querySelector(
            ".linkedin-ai-btn"
          )
        ) {
          return;
        }

        const btn =
          document.createElement(
            "button"
          );

        btn.innerText =
          "✨ Analyze";

        btn.className =
          "linkedin-ai-btn";

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

            } catch (err) {}

            btn.innerText =
              "✨ Analyze";

            btn.disabled = false;
          };

        sendButton.insertAdjacentElement(
          "afterend",
          btn
        );

        return;
      }

      container =
        container.parentElement;

      level++;
    }
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