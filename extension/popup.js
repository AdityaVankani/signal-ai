// const analyzeBtn = document.getElementById("analyzeBtn");
// const loader = document.getElementById("loader");
// const result = document.getElementById("result");


// // =========================
// // ANALYZE BUTTON CLICK
// // =========================

// analyzeBtn.addEventListener("click", async () => {

//   // Reset UI
//   loader.innerText = "Analyzing...";
//   loader.classList.remove("hidden");

//   result.classList.add("hidden");

//   try {

//     // Get current tab
//     const [tab] = await chrome.tabs.query({
//       active: true,
//       currentWindow: true
//     });

//     console.log("ACTIVE TAB:", tab);

//     // Send message to content script
//     chrome.tabs.sendMessage(
//       tab.id,
//       { type: "GET_POST" },

//       async (response) => {

//         // =========================
//         // CONTENT SCRIPT ERRORS
//         // =========================

//         if (chrome.runtime.lastError) {

//           console.error(
//             "CHROME RUNTIME ERROR:",
//             chrome.runtime.lastError
//           );

//           loader.innerText =
//             "Refresh LinkedIn page and try again.";

//           return;
//         }

//         // =========================
//         // NO RESPONSE
//         // =========================

//         if (!response) {

//           console.error("NO RESPONSE FROM CONTENT SCRIPT");

//           loader.innerText =
//             "No response from LinkedIn page.";

//           return;
//         }

//         // =========================
//         // NO POST TEXT
//         // =========================

//         if (!response.text) {

//           console.error("NO POST TEXT FOUND");

//           loader.innerText =
//             "Could not detect post.";

//           return;
//         }

//         console.log("POST TEXT FOUND:");
//         console.log(response.text);

//         // =========================
//         // BACKEND REQUEST
//         // =========================

//         try {

//           console.log("CALLING BACKEND...");

//           const controller = new AbortController();

//           // 20 second timeout
//           const timeout = setTimeout(() => {

//             controller.abort();

//           }, 60000);

//           const requestBody = {
//             author: "unknown",
//             profile_url: "",
//             post_text: response.text
//           };

//           console.log("REQUEST BODY:");
//           console.log(requestBody);

//           const apiRes = await fetch(
//             "http://127.0.0.1:8000/analyze-post",
//             {
//               method: "POST",

//               headers: {
//                 "Content-Type": "application/json"
//               },

//               body: JSON.stringify(requestBody),

//               signal: controller.signal
//             }
//           );

//           clearTimeout(timeout);

//           console.log("BACKEND RESPONSE RECEIVED");

//           // =========================
//           // CHECK HTTP STATUS
//           // =========================

//           console.log("STATUS:", apiRes.status);

//           if (!apiRes.ok) {

//             const errorText = await apiRes.text();

//             console.error(
//               "BACKEND HTTP ERROR:",
//               errorText
//             );

//             loader.innerText =
//               `Backend error: ${apiRes.status}`;

//             return;
//           }

//           // =========================
//           // PARSE JSON
//           // =========================

//           const data = await apiRes.json();

//           console.log("API RESPONSE:");
//           console.log(data);

//           // =========================
//           // UPDATE UI
//           // =========================

//           loader.classList.add("hidden");

//           result.classList.remove("hidden");

//           document.getElementById("signal").innerText =
//             `${data.signal} (${Math.round(data.confidence * 100)}%)`;

//           document.getElementById("reasoning").innerText =
//             data.reasoning || "No reasoning";

//           document.getElementById("msg1").innerText =
//             data.messages?.[0] || "No message";

//           document.getElementById("msg2").innerText =
//             data.messages?.[1] || "No message";

//         } catch (err) {

//           // =========================
//           // FETCH ERRORS
//           // =========================

//           console.error("FULL FETCH ERROR:", err);

//           console.error("ERROR NAME:", err.name);

//           console.error("ERROR MESSAGE:", err.message);

//           if (err.name === "AbortError") {

//             loader.innerText =
//               "Backend timeout.";

//           } else {

//             loader.innerText =
//               "Backend connection failed.";
//           }
//         }

//       }
//     );

//   } catch (err) {

//     console.error("POPUP ERROR:", err);

//     loader.innerText =
//       "Unexpected extension error.";
//   }

// });


// // =========================
// // COPY BUTTONS
// // =========================

// document.querySelectorAll(".copy-btn").forEach(btn => {

//   btn.addEventListener("click", async () => {

//     try {

//       const target = btn.dataset.target;

//       const text =
//         document.getElementById(target).innerText;

//       await navigator.clipboard.writeText(text);

//       btn.innerText = "Copied!";

//       setTimeout(() => {

//         btn.innerText = "Copy";

//       }, 1500);

//     } catch (err) {

//       console.error("COPY ERROR:", err);
//     }

//   });

// });



// ========================================
// ELEMENTS
// ========================================

const toneSelect =
  document.getElementById(
    "toneSelect"
  );

  
const modeSelect =
  document.getElementById("modeSelect");

const apiKeyGroup =
  document.getElementById("apiKeyGroup");

const modelGroup =
  document.getElementById("modelGroup");

const apiKeyInput =
  document.getElementById("apiKeyInput");

const modelSelect =
  document.getElementById("modelSelect");

const saveBtn =
  document.getElementById("saveBtn");

const saveStatus =
  document.getElementById("saveStatus");


// ========================================
// UPDATE SETTINGS UI
// ========================================

function updateUI() {

  const isBYOK =
    modeSelect.value === "byok";

  // Show BYOK fields only
  apiKeyGroup.style.display =
    isBYOK ? "flex" : "none";

  modelGroup.style.display =
    isBYOK ? "flex" : "none";
}


// ========================================
// LOAD SETTINGS
// ========================================

// ========================================
// LOAD SETTINGS
// ========================================

function loadSettings() {

  chrome.storage.local.get(
    [
      "mode",
      "geminiApiKey",
      "geminiModel",
      "tone"
    ],

    (result) => {

      console.log(
        "LOADED SETTINGS:",
        result
      );

      // AI Mode
      modeSelect.value =
        result.mode || "hosted";

      // API Key
      apiKeyInput.value =
        result.geminiApiKey || "";

      // Model
      modelSelect.value =
        result.geminiModel ||
        "gemini-2.5-flash";

      // Tone
      toneSelect.value =
        result.tone ||
        "professional";

      // Update UI
      updateUI();
    }
  );
}


// ========================================
// SAVE SETTINGS
// ========================================

function saveSettings() {

  const settings = {

    mode:
      modeSelect.value,

    geminiApiKey:
      apiKeyInput.value.trim(),

    geminiModel:
      modelSelect.value,

    tone:
      toneSelect.value
  };

  console.log(
    "SAVING SETTINGS:",
    settings
  );

  chrome.storage.local.set(
    settings,

    () => {

      saveStatus.innerText =
        "Settings saved successfully.";

      console.log(
        "SETTINGS SAVED"
      );

      setTimeout(() => {

        saveStatus.innerText = "";

      }, 2500);
    }
  );
}


// ========================================
// EVENT LISTENERS
// ========================================

// Mode change
modeSelect.addEventListener(
  "change",
  updateUI
);

// Save button
saveBtn.addEventListener(
  "click",
  saveSettings
);

toneSelect.addEventListener(
  "change",
  async () => {

    await chrome.storage.sync.set({
      tone: toneSelect.value
    });

  }
);


// ========================================
// INIT
// ========================================

loadSettings();