/**
 * Ahsan Traders — ENTERPRISE WEBSITE INTERACTION ENGINE
 * Consistent Role Tab Formatting, High-Contrast Form Rendering & Live Email Dispatch
 * Developed by Muhammadmohsin.webstudio
 */

let currentRole = "employee";
let currentMode = "login";

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Lucide Icons
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  // 2. Initialize AOS (Animate on Scroll)
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
    });
  }

  // 3. Navbar scroll effect
  const navbar = document.querySelector("nav");
  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 30) {
        navbar.classList.add("shadow-md", "py-2", "bg-ivory/95");
        navbar.classList.remove("py-4");
      } else {
        navbar.classList.remove("shadow-md", "py-2");
        navbar.classList.add("py-4", "bg-ivory/95");
      }
    });
  }

  // 4. Setup Interactive Glass Modal & Form Rendering
  setupAliveAuthModal();
});

function setupAliveAuthModal() {
  if (!document.getElementById("glassy-auth-overlay")) {
    const modalOverlay = document.createElement("div");
    modalOverlay.id = "glassy-auth-overlay";
    modalOverlay.className =
      "fixed inset-0 bg-black/70 backdrop-blur-md hidden items-center justify-center z-50 p-4 transition-opacity duration-300";
    modalOverlay.innerHTML = `
            <div class="glass-modal-card w-full max-w-lg p-8 sm:p-10 rounded-3xl shadow-2xl relative z-10 border border-chocolate/20 transform transition-all scale-95 opacity-0 max-h-[90vh] overflow-y-auto" id="glassy-modal-content">
                
                <button id="close-glassy-modal" class="absolute top-5 right-5 text-charcoal hover:text-chocolate p-2 rounded-full bg-ivory border border-chocolate/20 transition-transform hover:rotate-90">
                    <i data-lucide="x" class="w-5 h-5"></i>
                </button>

                <div class="text-center space-y-2 mb-6">
                    <img src="image.png" alt="Logo" class="w-12 h-12 object-cover rounded-xl border border-chocolate/20 mx-auto mb-1 shadow-md">
                    <h3 id="modal-heading-title" class="text-2xl font-extrabold text-black">Secure Portal Gateway</h3>
                    <p id="modal-subtext" class="text-xs text-black font-semibold">Live Account Creation & Secure Authentication</p>
                </div>

                <!-- Role Selector Tabs -->
                <div class="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-ivory border border-chocolate/20 mb-6 text-xs font-bold">
                    <button type="button" onclick="setModalRole('employee')" id="m-role-employee" class="py-2.5 rounded-xl transition-all shadow-sm">Employee</button>
                    <button type="button" onclick="setModalRole('customer')" id="m-role-customer" class="py-2.5 rounded-xl transition-all shadow-sm">Customer</button>
                    <button type="button" onclick="setModalRole('supplier')" id="m-role-supplier" class="py-2.5 rounded-xl transition-all shadow-sm">Supplier</button>
                </div>

                <!-- Login vs Sign Up Mode Tabs -->
                <div class="flex border-b border-chocolate/20 mb-6 text-sm font-bold">
                    <button type="button" onclick="setModalMode('login')" id="m-tab-login" class="flex-1 pb-3 text-chocolate border-b-2 border-chocolate transition-all">Existing Login</button>
                    <button type="button" onclick="setModalMode('register')" id="m-tab-register" class="flex-1 pb-3 text-black hover:text-chocolate border-b-2 border-transparent transition-all">New Account Sign Up</button>
                </div>

                <!-- Form Container -->
                <form id="glassy-auth-form" onsubmit="handleGlassySubmit(event)" class="space-y-4">
                    <div id="glassy-form-fields" class="space-y-4"></div>
                    <button type="submit" id="glassy-submit-btn" class="w-full py-4 rounded-xl bg-chocolate text-white font-bold text-sm hover:bg-chocolate/90 transition-all shadow-xl flex items-center justify-center space-x-2 transform hover:scale-[1.02] active:scale-95">
                        <span id="glassy-btn-text">Secure Login</span>
                        <i data-lucide="arrow-right" class="w-4 h-4"></i>
                    </button>
                </form>
            </div>
        `;
    document.body.appendChild(modalOverlay);
  }

  const modalOverlay = document.getElementById("glassy-auth-overlay");
  const modalContent = document.getElementById("glassy-modal-content");
  const closeBtn = document.getElementById("close-glassy-modal");

  // Portal Click Listeners (Cards & Trigger Buttons)
  document
    .querySelectorAll('.portal-card, a[href="#portals"], .portal-trigger-btn')
    .forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        // Prevent opening modal if click originated from the contact section
        if (e.target.closest("#contact")) return;

        const card = trigger.closest(".portal-card");
        if (card) {
          const portalType = card.getAttribute("data-portal");
          if (portalType) setModalRole(portalType);
        }

        const targetSection = document.getElementById("portals");
        if (
          targetSection &&
          (trigger.tagName === "A" || trigger.classList.contains("hero-btn"))
        ) {
          e.preventDefault();
          targetSection.scrollIntoView({ behavior: "smooth" });
          setTimeout(() => openModal(), 400);
        } else if (card || trigger.classList.contains("portal-trigger-btn")) {
          e.preventDefault();
          openModal();
        }
      });
    });

  function openModal() {
    modalOverlay.classList.remove("hidden");
    modalOverlay.classList.add("flex");
    if (typeof gsap !== "undefined") {
      gsap.fromTo(
        modalContent,
        { scale: 0.85, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" },
      );
    } else {
      modalContent.classList.remove("scale-95", "opacity-0");
      modalContent.classList.add("scale-100", "opacity-100");
    }
    setModalRole(currentRole);
    if (typeof lucide !== "undefined") lucide.createIcons();
  }

  function closeModal() {
    if (typeof gsap !== "undefined") {
      gsap.to(modalContent, {
        scale: 0.85,
        opacity: 0,
        y: 30,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          modalOverlay.classList.remove("flex");
          modalOverlay.classList.add("hidden");
        },
      });
    } else {
      modalOverlay.classList.remove("flex");
      modalOverlay.classList.add("hidden");
    }
  }

  closeBtn.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });
}

function setModalRole(role) {
  currentRole = role;
  ["employee", "customer", "supplier"].forEach((r) => {
    const btn = document.getElementById(`m-role-${r}`);
    if (btn) {
      if (r === role) {
        btn.className =
          "py-2.5 rounded-xl transition-all bg-[#4E342E] text-white font-extrabold shadow-md transform scale-105";
      } else {
        btn.className =
          "py-2.5 rounded-xl transition-all text-black hover:text-chocolate font-bold bg-transparent";
      }
    }
  });
  setModalMode(currentMode);
}

function setModalMode(mode) {
  currentMode = mode;
  const loginTab = document.getElementById("m-tab-login");
  const regTab = document.getElementById("m-tab-register");
  const btnText = document.getElementById("glassy-btn-text");

  if (mode === "login") {
    loginTab.className =
      "flex-1 pb-3 text-chocolate border-b-2 border-chocolate transition-all font-extrabold";
    regTab.className =
      "flex-1 pb-3 text-black hover:text-chocolate border-b-2 border-transparent transition-all font-bold";
    btnText.textContent = `Login to ${capitalize(currentRole)} Portal`;
  } else {
    regTab.className =
      "flex-1 pb-3 text-chocolate border-b-2 border-chocolate transition-all font-extrabold";
    loginTab.className =
      "flex-1 pb-3 text-black hover:text-chocolate border-b-2 border-transparent transition-all font-bold";
    btnText.textContent = `Create New ${capitalize(currentRole)} Account`;
  }
  renderGlassyFields();
}

function renderGlassyFields() {
  const container = document.getElementById("glassy-form-fields");
  if (!container) return;
  let html = "";

  if (currentMode === "login") {
    html = `
            <div class="space-y-1">
                <label class="block text-xs font-extrabold text-black uppercase tracking-wider">Corporate Email / ID</label>
                <input type="email" required placeholder="name@ahsantraders.com" class="w-full bg-white border border-chocolate/40 rounded-xl px-4 py-3 text-sm text-black font-bold placeholder-black/40 focus:outline-none focus:border-chocolate focus:ring-2 focus:ring-chocolate/20 transition-all shadow-sm">
            </div>
            <div class="space-y-1">
                <label class="block text-xs font-extrabold text-black uppercase tracking-wider">Secure Password</label>
                <input type="password" required placeholder="••••••••••••" class="w-full bg-white border border-chocolate/40 rounded-xl px-4 py-3 text-sm text-black font-bold placeholder-black/40 focus:outline-none focus:border-chocolate focus:ring-2 focus:ring-chocolate/20 transition-all shadow-sm">
            </div>
        `;
  } else {
    if (currentRole === "employee") {
      html = `
                <div class="grid grid-cols-2 gap-3">
                    <div class="space-y-1">
                        <label class="block text-xs font-extrabold text-black uppercase tracking-wider">First Name</label>
                        <input type="text" required placeholder="Ahmed" class="w-full bg-white border border-chocolate/40 rounded-xl px-3 py-2.5 text-sm text-black font-bold placeholder-black/40 focus:outline-none focus:border-chocolate transition-all">
                    </div>
                    <div class="space-y-1">
                        <label class="block text-xs font-extrabold text-black uppercase tracking-wider">Last Name</label>
                        <input type="text" required placeholder="Al-Harbi" class="w-full bg-white border border-chocolate/40 rounded-xl px-3 py-2.5 text-sm text-black font-bold placeholder-black/40 focus:outline-none focus:border-chocolate transition-all">
                    </div>
                </div>
                <div class="space-y-1">
                    <label class="block text-xs font-extrabold text-black uppercase tracking-wider">New Hire Employee / Onboarding ID</label>
                    <input type="text" required placeholder="AT-XXXX" class="w-full bg-white border border-chocolate/40 rounded-xl px-3 py-2.5 text-sm text-black font-bold placeholder-black/40 focus:outline-none focus:border-chocolate transition-all">
                </div>
                <div class="space-y-1">
                    <label class="block text-xs font-extrabold text-black uppercase tracking-wider">Corporate Email</label>
                    <input type="email" required placeholder="ahmed.h@ahsantraders.com" class="w-full bg-white border border-chocolate/40 rounded-xl px-3 py-2.5 text-sm text-black font-bold placeholder-black/40 focus:outline-none focus:border-chocolate transition-all">
                </div>
                <div class="grid grid-cols-2 gap-3">
                    <div class="space-y-1">
                        <label class="block text-xs font-extrabold text-black uppercase tracking-wider">Password</label>
                        <input type="password" required placeholder="••••••••" class="w-full bg-white border border-chocolate/40 rounded-xl px-3 py-2.5 text-sm text-black font-bold placeholder-black/40 focus:outline-none focus:border-chocolate transition-all">
                    </div>
                    <div class="space-y-1">
                        <label class="block text-xs font-extrabold text-black uppercase tracking-wider">Confirm Password</label>
                        <input type="password" required placeholder="••••••••" class="w-full bg-white border border-chocolate/40 rounded-xl px-3 py-2.5 text-sm text-black font-bold placeholder-black/40 focus:outline-none focus:border-chocolate transition-all">
                    </div>
                </div>
            `;
    } else if (currentRole === "customer") {
      html = `
                <div class="space-y-1">
                    <label class="block text-xs font-extrabold text-black uppercase tracking-wider">Company / Customer Name</label>
                    <input type="text" required placeholder="Global Logistics Corp" class="w-full bg-white border border-chocolate/40 rounded-xl px-3 py-2.5 text-sm text-black font-bold placeholder-black/40 focus:outline-none focus:border-chocolate transition-all">
                </div>
                <div class="space-y-1">
                    <label class="block text-xs font-extrabold text-black uppercase tracking-wider">Business Email</label>
                    <input type="email" required placeholder="procurement@globallogistics.com" class="w-full bg-white border border-chocolate/40 rounded-xl px-3 py-2.5 text-sm text-black font-bold placeholder-black/40 focus:outline-none focus:border-chocolate transition-all">
                </div>
                <div class="space-y-1">
                    <label class="block text-xs font-extrabold text-black uppercase tracking-wider">Commercial Tax / VAT Number</label>
                    <input type="text" required placeholder="300XXXXXXXXX0003" class="w-full bg-white border border-chocolate/40 rounded-xl px-3 py-2.5 text-sm text-black font-bold placeholder-black/40 focus:outline-none focus:border-chocolate transition-all">
                </div>
                <div class="grid grid-cols-2 gap-3">
                    <div class="space-y-1">
                        <label class="block text-xs font-extrabold text-black uppercase tracking-wider">Password</label>
                        <input type="password" required placeholder="••••••••" class="w-full bg-white border border-chocolate/40 rounded-xl px-3 py-2.5 text-sm text-black font-bold placeholder-black/40 focus:outline-none focus:border-chocolate transition-all">
                    </div>
                    <div class="space-y-1">
                        <label class="block text-xs font-extrabold text-black uppercase tracking-wider">Confirm Password</label>
                        <input type="password" required placeholder="••••••••" class="w-full bg-white border border-chocolate/40 rounded-xl px-3 py-2.5 text-sm text-black font-bold placeholder-black/40 focus:outline-none focus:border-chocolate transition-all">
                    </div>
                </div>
            `;
    } else if (currentRole === "supplier") {
      html = `
                <div class="space-y-1">
                    <label class="block text-xs font-extrabold text-black uppercase tracking-wider">Supplier Enterprise Name</label>
                    <input type="text" required placeholder="Eastern Cargo Supplies LLC" class="w-full bg-white border border-chocolate/40 rounded-xl px-3 py-2.5 text-sm text-black font-bold placeholder-black/40 focus:outline-none focus:border-chocolate transition-all">
                </div>
                <div class="space-y-1">
                    <label class="block text-xs font-extrabold text-black uppercase tracking-wider">Vendor Contact Email</label>
                    <input type="email" required placeholder="sales@easterncargo.com" class="w-full bg-white border border-chocolate/40 rounded-xl px-3 py-2.5 text-sm text-black font-bold placeholder-black/40 focus:outline-none focus:border-chocolate transition-all">
                </div>
                <div class="space-y-1">
                    <label class="block text-xs font-extrabold text-black uppercase tracking-wider">Primary Trade Category</label>
                    <input type="text" required placeholder="Warehouse Hardware & Pallets" class="w-full bg-white border border-chocolate/40 rounded-xl px-3 py-2.5 text-sm text-black font-bold placeholder-black/40 focus:outline-none focus:border-chocolate transition-all">
                </div>
                <div class="grid grid-cols-2 gap-3">
                    <div class="space-y-1">
                        <label class="block text-xs font-extrabold text-black uppercase tracking-wider">Password</label>
                        <input type="password" required placeholder="••••••••" class="w-full bg-white border border-chocolate/40 rounded-xl px-3 py-2.5 text-sm text-black font-bold placeholder-black/40 focus:outline-none focus:border-chocolate transition-all">
                    </div>
                    <div class="space-y-1">
                        <label class="block text-xs font-extrabold text-black uppercase tracking-wider">Confirm Password</label>
                        <input type="password" required placeholder="••••••••" class="w-full bg-white border border-chocolate/40 rounded-xl px-3 py-2.5 text-sm text-black font-bold placeholder-black/40 focus:outline-none focus:border-chocolate transition-all">
                    </div>
                </div>
            `;
    }
  }

  container.innerHTML = html;

  if (typeof gsap !== "undefined") {
    gsap.fromTo(
      "#glassy-form-fields > div",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, stagger: 0.05, duration: 0.4, ease: "power2.out" },
    );
  }

  if (typeof lucide !== "undefined") lucide.createIcons();
}

function handleGlassySubmit(event) {
  event.preventDefault();
  const actionDesc =
    currentMode === "login" ? "Authentication" : "New Account Sign Up";
  alert(
    `Successfully completed ${actionDesc} for ${capitalize(currentRole)}! Welcome to Ahsan Traders.`,
  );
  const overlay = document.getElementById("glassy-auth-overlay");
  if (overlay) {
    overlay.classList.add("hidden");
    overlay.classList.remove("flex");
  }
}

/**
 * Live Email Dispatch Handler via Formspree API (Dispatched to Muhammadmohsintallat@gmail.com)
 */
async function handleLiveContactSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const btn = document.getElementById("contact-submit-btn");
  const btnText = document.getElementById("contact-btn-text");
  const successBox = document.getElementById("contact-success-msg");

  if (!btn || !successBox || !form) return;

  // Loading State Animation
  btn.disabled = true;
  btn.classList.add("opacity-80", "cursor-not-allowed");
  btnText.textContent = "Transmitting Live Email...";

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      if (typeof gsap !== "undefined") {
        gsap.fromTo(
          successBox,
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" },
        );
      }
      successBox.classList.remove("hidden");
      btn.classList.add("hidden");
      form.reset();

      setTimeout(() => {
        successBox.classList.add("hidden");
        btn.classList.remove("hidden", "opacity-80", "cursor-not-allowed");
        btn.disabled = false;
        btnText.textContent = "Send Live Inquiry to Email";
      }, 6000);
    } else {
      alert(
        'Oops! There was a problem submitting your form. Please verify your Formspree endpoint URL in action="".',
      );
      btn.disabled = false;
      btn.classList.remove("opacity-80", "cursor-not-allowed");
      btnText.textContent = "Send Live Inquiry to Email";
    }
  } catch (error) {
    alert("Network connection error. Please check your internet connection.");
    btn.disabled = false;
    btn.classList.remove("opacity-80", "cursor-not-allowed");
    btnText.textContent = "Send Live Inquiry to Email";
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
