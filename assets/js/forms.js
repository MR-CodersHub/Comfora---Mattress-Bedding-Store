/**
 * AURA LUNA LUXURY SLEEP STUDIO - FORM VALIDATION & APPOINTMENT BOOKING ENGINE
 */

const AuraForms = (function () {
  function init() {
    bindBookingForm();
    bindContactForm();
    bindNewsletterForms();
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validatePhone(phone) {
    return /^[\d\s+\-()]{7,20}$/.test(phone);
  }

  function setError(inputEl, hasError, customMsg) {
    const formGroup = inputEl.closest(".form-group");
    if (!formGroup) return;

    if (hasError) {
      formGroup.classList.add("has-error");
      const errEl = formGroup.querySelector(".error-msg");
      if (errEl && customMsg) errEl.textContent = customMsg;
    } else {
      formGroup.classList.remove("has-error");
    }
  }

  function bindBookingForm() {
    const form = document.getElementById("showroomBookingForm");
    if (!form) return;

    // Set min date to tomorrow
    const dateInput = document.getElementById("bookingDate");
    if (dateInput) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      dateInput.min = tomorrow.toISOString().split("T")[0];
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let isValid = true;

      const name = document.getElementById("bookingName");
      const email = document.getElementById("bookingEmail");
      const phone = document.getElementById("bookingPhone");
      const showroom = document.getElementById("bookingShowroom");
      const date = document.getElementById("bookingDate");
      const time = document.getElementById("bookingTime");
      const interest = document.getElementById("bookingInterest");

      if (!name.value.trim()) {
        setError(name, true, "Please enter your full name");
        isValid = false;
      } else {
        setError(name, false);
      }

      if (!validateEmail(email.value.trim())) {
        setError(email, true, "Please enter a valid email address");
        isValid = false;
      } else {
        setError(email, false);
      }

      if (!validatePhone(phone.value.trim())) {
        setError(phone, true, "Please enter a valid phone number");
        isValid = false;
      } else {
        setError(phone, false);
      }

      if (!showroom.value) {
        setError(showroom, true, "Please select an Studio showroom");
        isValid = false;
      } else {
        setError(showroom, false);
      }

      if (!date.value) {
        setError(date, true, "Please select an appointment date");
        isValid = false;
      } else {
        setError(date, false);
      }

      if (!time.value) {
        setError(time, true, "Please select a preferred time slot");
        isValid = false;
      } else {
        setError(time, false);
      }

      if (!isValid) return;

      // Appointment Booked Successfully
      showBookingConfirmationModal({
        name: name.value.trim(),
        email: email.value.trim(),
        phone: phone.value.trim(),
        showroom: showroom.options[showroom.selectedIndex].text,
        date: date.value,
        time: time.value,
        interest: interest ? interest.value : "General Mattress Consultation"
      });

      form.reset();
    });
  }

  function showBookingConfirmationModal(data) {
    let modal = document.getElementById("bookingSuccessModal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "bookingSuccessModal";
      modal.className = "modal-overlay";
      document.body.appendChild(modal);
    }

    const refNum = "AL-" + Math.floor(100000 + Math.random() * 900000);

    modal.innerHTML = `
      <div class="modal-container" style="max-width: 540px; padding: 2.5rem; text-align: center;">
        <button class="modal-close-btn" onclick="document.getElementById('bookingSuccessModal').classList.remove('open'); document.body.style.overflow='';">✕</button>
        
        <div style="width: 64px; height: 64px; border-radius: 50%; background: linear-gradient(135deg, #C2A177 0%, #8C6A48 100%); color: #FFFFFF; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem auto; box-shadow: 0 8px 25px rgba(194, 161, 119, 0.4);">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        </div>

        <span class="section-tag no-after">VIP Private Consultation Reserved</span>
        <h3 style="font-family: var(--font-serif); font-size: 1.65rem; margin-bottom: 0.5rem;">We Look Forward to Welcoming You, ${data.name}!</h3>
        <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.5rem;">Your private mattress sleep consultation and Champagne welcome has been confirmed.</p>

        <div style="background-color: var(--bg-card-alt); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem; text-align: left; margin-bottom: 1.5rem; font-size: 0.85rem; display: flex; flex-direction: column; gap: 0.5rem;">
          <div><strong>Confirmation ID:</strong> <span style="color: var(--accent-bronze); font-weight: 700;">${refNum}</span></div>
          <div><strong>Location:</strong> ${data.showroom}</div>
          <div><strong>Date & Time:</strong> ${data.date} at ${data.time}</div>
          <div><strong>Consultation:</strong> ${data.interest}</div>
          <div><strong>Confirmation sent to:</strong> ${data.email}</div>
        </div>

        <button class="btn btn-primary btn-sm" onclick="document.getElementById('bookingSuccessModal').classList.remove('open'); document.body.style.overflow='';">Done & Close</button>
      </div>
    `;

    modal.classList.add("open");
    document.body.style.overflow = "hidden";
    if (window.AuraCart) {
      AuraCart.showToast("Showroom Appointment Booked", `Confirmation ref ${refNum} sent to ${data.email}.`, "success");
    }
  }

  function bindContactForm() {
    const form = document.getElementById("generalContactForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let isValid = true;

      const name = document.getElementById("contactName");
      const email = document.getElementById("contactEmail");
      const message = document.getElementById("contactMessage");

      if (!name.value.trim()) {
        setError(name, true, "Please enter your name");
        isValid = false;
      } else {
        setError(name, false);
      }

      if (!validateEmail(email.value.trim())) {
        setError(email, true, "Please enter a valid email");
        isValid = false;
      } else {
        setError(email, false);
      }

      if (!message.value.trim()) {
        setError(message, true, "Please type your message or inquiry");
        isValid = false;
      } else {
        setError(message, false);
      }

      if (!isValid) return;

      if (window.AuraCart) {
        AuraCart.showToast("Message Sent to Concierge", "Thank you! Our Sleep Specialists will respond within 24 hours.", "success");
      }
      form.reset();
    });
  }

  function bindNewsletterForms() {
    document.querySelectorAll(".newsletter-form-trigger").forEach(form => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const input = form.querySelector("input[type='email']");
        if (input && validateEmail(input.value.trim())) {
          if (window.AuraCart) {
            AuraCart.showToast("Subscribed to VIP Studio", "Welcome! Check your inbox for your 15% bespoke welcome voucher.", "success");
          }
          input.value = "";
        } else if (input) {
          if (window.AuraCart) {
            AuraCart.showToast("Invalid Email", "Please enter a valid email address.", "info");
          }
        }
      });
    });
  }

  return {
    init,
    showBookingConfirmationModal
  };
})();

document.addEventListener("DOMContentLoaded", () => {
  AuraForms.init();
});
