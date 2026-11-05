const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

// Tahun otomatis di footer
$$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

// Jika gambar belum ada, tampilkan placeholder (tanpa ikon gambar rusak)
$$(".card img, .photo-frame img").forEach((img) => {
  const mark = () => img.parentElement.classList.add("no-img");
  img.addEventListener("error", mark);
  if (img.complete && img.naturalWidth === 0) mark();
});

// Menu aktif mengikuti posisi scroll
const links = $$("#menu a");
const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
$$("main section[id]").forEach((s) => spy.observe(s));

// Muncul halus saat di-scroll
const reveal = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        reveal.unobserve(e.target);
      }
    });
  },
  { threshold: 0.15 }
);
$$(".reveal").forEach((el) => reveal.observe(el));

// Angka statistik berjalan naik
const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const end = Number(el.dataset.count);
      const suffix = el.dataset.suffix || "";
      const start = performance.now();
      const dur = 1200;
      const tick = (now) => {
        const p = Math.min((now - start) / dur, 1);
        el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      countObserver.unobserve(el);
    });
  },
  { threshold: 0.6 }
);
$$("[data-count]").forEach((el) => countObserver.observe(el));

// Filter karya
const filterButtons = $$(".filter");
const cards = $$(".card");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const target = btn.dataset.filter;
    cards.forEach((card) => {
      const show = target === "all" || card.dataset.cat === target;
      card.classList.toggle("hide", !show);
    });
  });
});

// Lightbox dengan tombol sebelumnya/berikutnya
const lightbox = $("#lightbox");
const lbImg = $("img", lightbox);
const lbCap = $("figcaption", lightbox);
const lbPrev = $(".lb-prev", lightbox);
const lbNext = $(".lb-next", lightbox);
let list = [];
let idx = 0;

const show = (i) => {
  idx = (i + list.length) % list.length;
  const card = list[idx];
  const img = $("img", card);
  lbImg.src = img.currentSrc || img.src;
  lbImg.alt = img.alt;
  lbCap.textContent = `${$("h3", card).textContent} · ${$("p", card).textContent}`;
};

const open = (card) => {
  list = cards.filter((c) => !c.classList.contains("hide") && !c.classList.contains("no-img"));
  const i = list.indexOf(card);
  if (i === -1) return;
  show(i);
  const multi = list.length > 1;
  lbPrev.style.display = lbNext.style.display = multi ? "" : "none";
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
};

const close = () => {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
};

cards.forEach((card) => {
  card.addEventListener("click", () => {
    if (!card.classList.contains("no-img")) open(card);
  });
});

lbPrev.addEventListener("click", (e) => { e.stopPropagation(); show(idx - 1); });
lbNext.addEventListener("click", (e) => { e.stopPropagation(); show(idx + 1); });
$(".lb-close", lightbox).addEventListener("click", close);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox || e.target === lbImg) close();
});
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape") close();
  if (e.key === "ArrowLeft") show(idx - 1);
  if (e.key === "ArrowRight") show(idx + 1);
});
