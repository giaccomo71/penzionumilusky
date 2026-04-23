// ===========================
// HAMBURGER MENU
// ===========================
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", function () {
    const isOpen = navMenu.classList.toggle("open");
    hamburger.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", isOpen);
  });

  // Zatvorenie menu po kliknutí na odkaz
  navMenu.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      hamburger.classList.remove("open");
      hamburger.setAttribute("aria-expanded", false);
    });
  });
}

// ===========================
// SCROLL REVEAL ANIMÁCIA
// ===========================
function reveal() {
  var reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    }
  }
}

window.addEventListener("scroll", reveal);
reveal(); // Spustiť hneď po načítaní

// ===========================
// PLYNULÝ SCROLL PRE MENU
// ===========================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ===========================
// VALIDÁCIA DÁT FORMULÁRA
// ===========================
const arrivalInput = document.getElementById("arrival");
const departureInput = document.getElementById("departure");

if (arrivalInput && departureInput) {
  // Nastav minimálny dátum príchodu na dnešok
  const today = new Date().toISOString().split("T")[0];
  arrivalInput.setAttribute("min", today);

  arrivalInput.addEventListener("change", function () {
    // Odchod musí byť aspoň 1 deň po príchode
    const arrivalDate = new Date(this.value);
    arrivalDate.setDate(arrivalDate.getDate() + 1);
    const minDeparture = arrivalDate.toISOString().split("T")[0];
    departureInput.setAttribute("min", minDeparture);

    // Ak je zvolený odchod pred príchodom, vyresetuj ho
    if (departureInput.value && departureInput.value <= this.value) {
      departureInput.value = minDeparture;
    }
  });
}

// ===========================
// ODOSLANIE REZERVAČNÉHO FORMULÁRA
// ===========================
const bookingForm = document.getElementById("reservation-form");
const formStatus = document.getElementById("form-status");

if (bookingForm) {
  bookingForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const submitBtn = bookingForm.querySelector(".btn-submit");
    submitBtn.textContent = "Odosielam...";
    submitBtn.disabled = true;

    const data = new FormData(e.target);

    try {
      const response = await fetch(e.target.action, {
        method: bookingForm.method,
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        formStatus.style.color = "#27ae60";
        formStatus.textContent =
          "Ďakujeme! Vaša rezervácia bola úspešne odoslaná. Čoskoro sa vám ozveme.";
        bookingForm.reset();
      } else {
        formStatus.style.color = "#e74c3c";
        formStatus.textContent =
          "Ups! Nastala chyba pri odosielaní. Skúste to prosím znova neskôr.";
      }
    } catch (error) {
      formStatus.style.color = "#e74c3c";
      formStatus.textContent =
        "Chyba pripojenia. Skontrolujte internet a skúste znova.";
    } finally {
      submitBtn.textContent = "Odoslať dopyt";
      submitBtn.disabled = false;
    }

    setTimeout(() => {
      formStatus.textContent = "";
    }, 6000);
  });
}
