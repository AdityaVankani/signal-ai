// ========================================
// CONFIG
// ========================================

const API_BASE =
  "https://signal-ai-wi1d.onrender.com";

let authMode = "login";


// ========================================
// AUTH ELEMENTS
// ========================================

const authView =
  document.getElementById(
    "authView"
  );

const dashboardView =
  document.getElementById(
    "dashboardView"
  );

const loginTab =
  document.getElementById(
    "loginTab"
  );

const signupTab =
  document.getElementById(
    "signupTab"
  );

const authBtn =
  document.getElementById(
    "authBtn"
  );

const authStatus =
  document.getElementById(
    "authStatus"
  );

const emailInput =
  document.getElementById(
    "emailInput"
  );

const passwordInput =
  document.getElementById(
    "passwordInput"
  );

  const fullNameGroup =
  document.getElementById(
    "fullNameGroup"
  );
  
  const fullNameInput =
  document.getElementById(
    "fullNameInput"
  );


const userEmailText =
  document.getElementById(
    "userEmailText"
  );

const logoutBtn =
  document.getElementById(
    "logoutBtn"
  );


// ========================================
// SETTINGS ELEMENTS
// ========================================

const toneSelect =
  document.getElementById(
    "toneSelect"
  );

const modeSelect =
  document.getElementById(
    "modeSelect"
  );

const apiKeyGroup =
  document.getElementById(
    "apiKeyGroup"
  );

const modelGroup =
  document.getElementById(
    "modelGroup"
  );

const apiKeyInput =
  document.getElementById(
    "apiKeyInput"
  );

const modelSelect =
  document.getElementById(
    "modelSelect"
  );

const saveBtn =
  document.getElementById(
    "saveBtn"
  );

const saveStatus =
  document.getElementById(
    "saveStatus"
  );

const upgradeBtn =
  document.getElementById(
    "upgradeBtn"
  );



  const currentPlanBadge =
  document.getElementById(
    "currentPlanBadge"
  );

const planDetails =
  document.getElementById(
    "planDetails"
  );

const freeRequestsText =
  document.getElementById(
    "freeRequestsText"
  );



// ========================================
// UPDATE AUTH UI
// ========================================

function updateAuthUI() {

  if (authMode === "login") {

    loginTab.classList.add(
      "active"
    );

    signupTab.classList.remove(
      "active"
    );

    authBtn.innerText =
      "Login";

      fullNameGroup.style.display =

      "none";

  } else {

    signupTab.classList.add(
      "active"
    );

    loginTab.classList.remove(
      "active"
    );

    authBtn.innerText =
      "Create Account";

    fullNameGroup.style.display =
      "flex";
  }
}


// ========================================
// UPDATE SETTINGS UI
// ========================================

function updateSettingsUI() {

  const isBYOK =
    modeSelect.value === "byok";

  apiKeyGroup.style.display =
    isBYOK ? "flex" : "none";

  modelGroup.style.display =
    isBYOK ? "flex" : "none";
}


// ========================================
// SAVE JWT
// ========================================

async function saveAuth(data) {

  await chrome.storage.local.set({

    token:
      data.token,

    userEmail:
      emailInput.value
  });
}


// ========================================
// CHECK AUTH
// ========================================

async function checkAuth() {

  const result =
    await chrome.storage.local.get([
      "token",
      "userEmail"
    ]);

  if (result.token) {

    authView.classList.add(
      "hidden"
    );

    dashboardView.classList.remove(
      "hidden"
    );

    userEmailText.innerText =
      result.userEmail || "";

    loadSettings();
    loadCurrentPlan();
    loadUserPlan();

  } else {

    authView.classList.remove(
      "hidden"
    );

    dashboardView.classList.add(
      "hidden"
    );
  }
}


// ========================================
// HANDLE LOGIN / SIGNUP
// ========================================

async function handleAuth() {

  const fullName =
  fullNameInput.value.trim();

  const email =
    emailInput.value.trim();

  const password =
    passwordInput.value.trim();

  if (!email || !password ||(
    authMode === "signup" &&
    !fullName)) {

    authStatus.innerText =
      "Please fill all fields.";

    return;
  }

  authBtn.disabled = true;

  authBtn.innerText =
    "Please wait...";

  try {

    const endpoint =
      authMode === "login"
        ? "/login"
        : "/signup";

    const response =
      await fetch(
        `${API_BASE}${endpoint}`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            full_name: fullName,
            email,
            password
          })
        }
      );

    const data =
      await response.json();

    if (!response.ok) {

      throw new Error(
        data.detail || "Auth failed"
      );
    }

    await saveAuth(data);

    authStatus.innerText =
      authMode === "login"
        ? "Login successful."
        : "Signup successful.";

    emailInput.value = "";
    passwordInput.value = "";

    checkAuth();

  } catch (err) {

    authStatus.innerText =
      err.message;

  } finally {

    authBtn.disabled = false;

    updateAuthUI();
  }
}


// ========================================
// LOGOUT
// ========================================

async function logout() {

  await chrome.storage.local.remove([
    "token",
    "userEmail"
  ]);

  checkAuth();
}


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

      modeSelect.value =
        result.mode || "hosted";

      apiKeyInput.value =
        result.geminiApiKey || "";

      modelSelect.value =
        result.geminiModel ||
        "gemini-3.1-flash-lite-preview";

      toneSelect.value =
        result.tone ||
        "professional";

      updateSettingsUI();
    }
  );
}

async function loadCurrentPlan() {

  try {

    const storage =
      await chrome.storage.local.get([
        "token"
      ]);

    if (!storage.token) {
      return;
    }

    const response =
      await fetch(
        "https://signal-ai-wi1d.onrender.com/me",
        {
          headers: {

            Authorization:
              `Bearer ${storage.token}`
          }
        }
      );

    if (!response.ok) {
      return;
    }

    const data =
      await response.json();

    currentPlanBadge.classList.remove(
      "hidden"
    );

    currentPlanBadge.innerText =
      `Current Plan: ${data.plan.toUpperCase()}`;

  } catch (err) {

    console.log(
      "Plan fetch failed"
    );
  }
}

// ========================================
// LOAD USER PLAN
// ========================================

async function loadUserPlan() {

  const storage =
    await chrome.storage.local.get([
      "token"
    ]);

  if (!storage.token) return;

  try {

    const response =
      await fetch(
        `${API_BASE}/me`,
        {
          method: "GET",

          headers: {

            Authorization:
              `Bearer ${storage.token}`
          }
        }
      );

    const data =
      await response.json();

    const plan =
      data.plan || "free";

    currentPlanBadge.innerText =
      `Current Plan: ${plan.toUpperCase()}`;


    // =========================
    // PRO USER
    // =========================

    if (
      plan === "pro" &&
      data.subscription_status === "active"
    ) {

      freeRequestsText.innerText =
        "Unlimited AI analysis enabled.";

      planDetails.innerText =
        `Plan expires on: ${new Date(
          data.plan_expires
        ).toLocaleDateString()}`;

      upgradeBtn.style.display =
        "none";
    }

    // =========================
    // FREE USER
    // =========================

    else {

      planDetails.innerText =
        "You are currently on Free Plan.";

      freeRequestsText.innerText =
        `Remaining free analyses: ${data.remaining_free_requests}`;

      upgradeBtn.style.display =
        "block";
    }

  } catch (err) {

    console.error(err);
  }
}

// ========================================
// SUBSCRIBE
// ========================================

async function handleUpgrade() {

  const storage =
    await chrome.storage.local.get([
      "token"
    ]);

  try {

    const response =
      await fetch(
        `${API_BASE}/create-checkout-session`,
        {
          method: "POST",

          headers: {

            Authorization:
              `Bearer ${storage.token}`
          }
        }
      );

    const data =
      await response.json();

    if (data.checkout_url) {

      chrome.tabs.create({

        url: data.checkout_url
      });
    }

  } catch (err) {

    console.error(err);
  }
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

  chrome.storage.local.set(
    settings,

    () => {

      saveStatus.innerText =
        "Settings saved.";

      setTimeout(() => {

        saveStatus.innerText = "";

      }, 2000);
    }
  );
}


// ========================================
// EVENTS
// ========================================

loginTab.addEventListener(
  "click",
  () => {

    authMode = "login";

    updateAuthUI();
  }
);

signupTab.addEventListener(
  "click",
  () => {

    authMode = "signup";

    updateAuthUI();
  }
);

authBtn.addEventListener(
  "click",
  handleAuth
);

logoutBtn.addEventListener(
  "click",
  logout
);

modeSelect.addEventListener(
  "change",
  updateSettingsUI
);

saveBtn.addEventListener(
  "click",
  saveSettings
);


upgradeBtn.addEventListener(
  "click",
  handleUpgrade
);






// ========================================
// INIT
// ========================================

updateAuthUI();

checkAuth();