/* =========================================================
   SOPAN PANCHAL — CLASSIC PORTFOLIO JS
========================================================= */

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

/* =========================================================
   YEAR
========================================================= */

const yearElement = $("#year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

/* =========================================================
   CERTIFICATE ACCORDION
========================================================= */

const certificateCards = $$(".certificate-card");

certificateCards.forEach(card => {
    const head = $(".certificate-head", card);

    if (!head) return;

    head.addEventListener("click", () => {
        const open = card.classList.contains("open");

        certificateCards.forEach(item => {
            item.classList.remove("open");

            $(".certificate-head", item)?.setAttribute(
                "aria-expanded",
                "false"
            );
        });

        if (!open) {
            card.classList.add("open");
            head.setAttribute("aria-expanded", "true");
        }
    });
});

/* =========================================================
   IMAGE CERTIFICATE PREVIEW
========================================================= */

const imageModal = $("#imageModal");
const imageModalContent = $("#imageModalContent");
const imageModalTitle = $("#imageModalTitle");

function openImageModal(src, title) {
    if (!imageModal || !imageModalContent || !imageModalTitle) return;

    imageModalContent.src = src;
    imageModalContent.alt = title || "Certificate preview";
    imageModalTitle.textContent = title || "Certificate";

    imageModal.classList.add("open");
    imageModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-lock");
}

function closeImageModal() {
    if (!imageModal) return;

    imageModal.classList.remove("open");
    imageModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-lock");

    if (imageModalContent) {
        imageModalContent.src = "";
    }
}

$$(".certificate-open-image").forEach(button => {
    button.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();

        openImageModal(
            button.dataset.src,
            button.dataset.title
        );
    });
});

$$("[data-close-modal]").forEach(element => {
    element.addEventListener("click", closeImageModal);
});

/* =========================================================
   PDF CERTIFICATE PREVIEW
========================================================= */

const pdfModal = $("#pdfModal");
const pdfModalFrame = $("#pdfModalFrame");
const pdfModalTitle = $("#pdfModalTitle");
const pdfOpenNew = $("#pdfOpenNew");

function openPdfModal(src, title) {
    if (!pdfModal || !pdfModalFrame || !pdfModalTitle) return;

    pdfModalFrame.src = src;
    pdfModalTitle.textContent = title || "Certificate";

    if (pdfOpenNew) {
        pdfOpenNew.href = src;
    }

    pdfModal.classList.add("open");
    pdfModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-lock");
}

function closePdfModal() {
    if (!pdfModal) return;

    pdfModal.classList.remove("open");
    pdfModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-lock");

    if (pdfModalFrame) {
        pdfModalFrame.src = "";
    }
}

$$(".certificate-open-pdf").forEach(button => {
    button.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();

        openPdfModal(
            button.dataset.src,
            button.dataset.title
        );
    });
});

$$("[data-close-pdf]").forEach(element => {
    element.addEventListener("click", closePdfModal);
});

/* =========================================================
   CONTACT FORM — FORMSPREE
=========================================================

   IMPORTANT:
   Replace YOUR_FORM_ID in index.html with the Formspree
   form ID generated for your portfolio.

   Example:
   https://formspree.io/f/abcdwxyz
*/

const contactForm = $("#contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", () => {
        const name = $("#visitorName")?.value.trim() || "";
        const org = $("#visitorOrg")?.value.trim() || "";

        const formSubject = $("#formSubject");

        if (formSubject) {
            formSubject.value =
                `Portfolio enquiry from ${name}${org ? ` - ${org}` : ""}`;
        }

        const submitButton = $(".send-btn", contactForm);

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Sending...";
        }
    });
}

/* =========================================================
   CLOSE MODALS WITH ESC
========================================================= */

document.addEventListener("keydown", event => {
    if (event.key !== "Escape") return;

    closeImageModal();
    closePdfModal();
});

/* =========================================================
   REFRESH POSITION
========================================================= */
if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}
window.addEventListener("load", () => {
    window.scrollTo(0, 0);
});

/* =========================================================
   BASIC CONTENT PROTECTION
========================================================= */
document.addEventListener("contextmenu", function (event) {
    event.preventDefault();
});
document.addEventListener("selectstart", function (event) {
    event.preventDefault();
});
document.addEventListener("keydown", function (event) {
    const key = event.key.toLowerCase();
    if (event.ctrlKey && ["c", "x", "s", "u", "p"].includes(key)) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    }
    if (event.ctrlKey && event.shiftKey && ["i", "j", "c"].includes(key)) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    }
    if (event.key === "F12") {
        event.preventDefault();
        event.stopPropagation();
        return false;
    }
});
document.addEventListener("dragstart", function (event) {
    if (event.target.tagName === "IMG") event.preventDefault();
});
document.querySelectorAll("img").forEach(function (image) {
    image.setAttribute("draggable", "false");
});
document.addEventListener("copy", function (event) {
    event.preventDefault();
});
document.addEventListener("cut", function (event) {
    event.preventDefault();
});
document.addEventListener("paste", function (event) {
    event.preventDefault();
});
/* =====================================================
   RESUME VIEWER
   ===================================================== */

function openResumeViewer() {
    const viewer = document.getElementById("resume-viewer");

    if (viewer) {
        viewer.classList.add("active");
        document.body.style.overflow = "hidden";
    }
}

function closeResumeViewer() {
    const viewer = document.getElementById("resume-viewer");

    if (viewer) {
        viewer.classList.remove("active");
        document.body.style.overflow = "";
    }
}

/* Close by clicking outside the resume panel */

document.addEventListener("click", function(event) {

    const viewer = document.getElementById("resume-viewer");

    if (
        viewer &&
        viewer.classList.contains("active") &&
        event.target === viewer
    ) {
        closeResumeViewer();
    }

});

/* Close with Escape key */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {
        closeResumeViewer();
    }

});
// /* PROJECT COUNTER ANIMATION */

// const projectStats = document.querySelector(".project-stats");

// if (projectStats) {

//     const counters = projectStats.querySelectorAll(".count");
//     let counterStarted = false;

//     const startCounters = () => {

//         if (counterStarted) return;

//         counterStarted = true;

//         counters.forEach(counter => {

//             const target = Number(counter.dataset.target);
//             const duration = 3500;
//             const startTime = performance.now();

//             function updateCounter(currentTime) {

//                 const progress = Math.min(
//                     (currentTime - startTime) / duration,
//                     1
//                 );

//                 /* Smooth counting */
//                 const easedProgress =
//                     1 - Math.pow(1 - progress, 3);

//                 const currentValue =
//                     Math.floor(easedProgress * target);

//                 counter.textContent = currentValue;

//                 if (progress < 1) {

//                     requestAnimationFrame(updateCounter);

//                 } else {

//                     counter.textContent =
//                         target + "+";
//                 }
//             }

//             requestAnimationFrame(updateCounter);
//         });
//     };

//     const statsObserver = new IntersectionObserver(
//         entries => {

//             entries.forEach(entry => {

//                 if (entry.isIntersecting) {
//                     startCounters();
//                     statsObserver.disconnect();
//                 }

//             });

//         },
//         {
//             threshold:0.35
//         }
//     );

//     statsObserver.observe(projectStats);
// }