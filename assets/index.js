// --------------------------------------------------------------------------------------------------------------------
// Trailer element
// --------------------------------------------------------------------------------------------------------------------

const trailer = document.getElementById("trailer");

const animateTrailer = (e, interacting) => {
  const x = e.clientX - trailer.offsetWidth / 2,
    y = e.clientY - trailer.offsetHeight / 2;

  const trailerKeyframes = {
    transform: `translate(${x}px, ${y}px) scale(${interacting ? 5 : 1})`,
    opacity: `${interacting ? 0.5 : 1}`,
  };

  trailer.animate(trailerKeyframes, {
    duration: 800,
    fill: "forwards",
  });
};

window.onmousemove = (e) => {
  const interactible = e.target.closest(".interactible"),
    interacting = interactible !== null;

  animateTrailer(e, interacting);
};

// --------------------------------------------------------------------------------------------------------------------
// Nav scroll display animation
// --------------------------------------------------------------------------------------------------------------------

var prevScrollpos = window.scrollY;
window.onscroll = function () {
  var currentScrollPos = window.scrollY;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
    document.getElementById("navbar").style.opacity = "1";
  } else {
    document.getElementById("navbar").style.top = "-100px";
    document.getElementById("navbar").style.opacity = "0";
  }
  prevScrollpos = currentScrollPos;
};

// --------------------------------------------------------------------------------------------------------------------
// Dark Mode toggler
// --------------------------------------------------------------------------------------------------------------------

const themeToggleBtn = document.querySelector(".theme-toggle");
const iconToggleBtn = document.getElementById("icon-toggle");

const theme = localStorage.getItem("theme");
const icon = localStorage.getItem("icon");

if (icon === null && theme === null) {
  iconToggleBtn.classList.add("fa-moon");
} else if (icon === null && theme !== null) {
  iconToggleBtn.classList.add("fa-sun");
}

theme && document.body.classList.add(theme);
iconToggleBtn.classList.add(icon);

handleThemeToggle = () => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    iconToggleBtn.classList.replace("fa-moon", "fa-sun");
    localStorage.setItem("theme", "dark-mode");
    localStorage.setItem("icon", "fa-sun");
  } else {
    iconToggleBtn.classList.replace("fa-sun", "fa-moon");
    localStorage.removeItem("theme");
    localStorage.setItem("icon", "fa-moon");
  }
};

themeToggleBtn.addEventListener("click", handleThemeToggle);

// --------------------------------------------------------------------------------------------------------------------
// Frog Sound effect
// --------------------------------------------------------------------------------------------------------------------

const frogSVGs = document.getElementsByClassName("fa-frog");

for (i = 0; i < frogSVGs.length; i++) {
  frogSVGs[i].onclick = function () {
    this.setAttribute("style", "animation: gelatine 0.5s;");
    document.getElementById("frog-noise").play();

    setTimeout(() => {
      this.removeAttribute("style", "animation: gelatine 0.5s;");
    }, 1000);
  };
}

// --------------------------------------------------------------------------------------------------------------------
// main animation
// --------------------------------------------------------------------------------------------------------------------

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const enhance = (id) => {
  const element = document.getElementById(id),
    text = element.innerText.split("");

  element.innerText = "";

  text.forEach((value, index) => {
    const outer = document.createElement("span");

    outer.className = "outer";

    const inner = document.createElement("span");

    inner.className = "inner";

    inner.style.animationDelay = `${rand(-5000, 0)}ms`;

    const letter = document.createElement("span");

    letter.className = "letter";

    letter.innerText = value;

    letter.style.animationDelay = `${index * 1000}ms`;

    inner.appendChild(letter);

    outer.appendChild(inner);

    element.appendChild(outer);
  });
};

enhance("tel-link-main");
enhance("mail-link-main");
enhance("github-link-main");

// --------------------------------------------------------------------------------------------------------------------
// FAQ animation
// --------------------------------------------------------------------------------------------------------------------

const faq = document.getElementsByClassName("q-and-a");

for (i = 0; i < faq.length; i++) {
  faq[i].onclick = function () {
    var setClasses = !this.classList.contains("active");
    setClass(faq, "active", "remove");

    if (setClasses) {
      this.classList.toggle("active");
    }
  };
}

function setClass(els, className, fnName) {
  for (i = 0; i < els.length; i++) {
    els[i].classList[fnName](className);
  }
}

// --------------------------------------------------------------------------------------------------------------------
//  title scroll animation
// --------------------------------------------------------------------------------------------------------------------

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
    // else {
    //   entry.target.classList.remove("show");
    // }
  });
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));

// --------------------------------------------------------------------------------------------------------------------
// Time display in Footer
// --------------------------------------------------------------------------------------------------------------------

var getFranceTime = function () {
  document.getElementById("time-display").innerHTML = new Date()
    .toLocaleString("en-FR", {
      timeZone: "Europe/Paris",
      timeStyle: "long",
      hourCycle: "h12",
    })
    .replace(/:\d\d( |$)/, " ");
};
getFranceTime();
setInterval(getFranceTime, 1000);
