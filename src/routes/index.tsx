import { animate, motion, useMotionValue } from "framer-motion";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Reveal } from "@/components/Reveal";
import heroBg from "@/assets/hero-bg.jpg";
import pattimuraImg from "@/assets/patmura.jpeg";
import marthaImg from "@/assets/martha (2).jpg";
import beverImg from "@/assets/bever.jpg";
import duurstedeImg from "@/assets/duurstede.jpg";
import parangsalawakuImg from "@/assets/parangsalawaku.jpg";
import monumenmImg from "@/assets/monumenm.jpg";
import rumahpatImg from "@/assets/rumahpat.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pahlawan Maluku — Pattimura & Martha Christina Tiahahu" },
      {
        name: "description",
        content:
          "Biografi, timeline perjuangan, dan galeri Kapitan Pattimura serta Martha Christina Tiahahu, pahlawan dari tanah Maluku.",
      },
      { property: "og:title", content: "Pahlawan Maluku — Pattimura & Martha" },
      { property: "og:description", content: "Kisah perjuangan pahlawan Maluku 1817." },
      { property: "og:image", content: heroBg },
      { name: "twitter:image", content: heroBg },
    ],
  }),
  component: Index,
});

const heroes = [
  {
    name: "Thomas Matulessy",
    title: "Kapitan Pattimura",
    born: "1783, Haria, Saparua",
    img: pattimuraImg,
    bio: 'Kapitan Pattimura adalah pahlawan Maluku yang memimpin perlawanan terhadap Belanda pada tahun 1817. Ia pernah menjadi sersan di militer Inggris sebelum memimpin rakyat melawan kebijakan Belanda yang merugikan. Ia terkenal karena berhasil menyerang Benteng Duurstede pada 16 Mei 1817. Pattimura kemudian ditangkap dan dihukum gantung pada 16 Desember 1817 di Ambon. Semboyan: "Lebih baik mati daripada dijajah!".',
  },
  {
    name: "Martha Christina Tiahahu",
    title: "Srikandi Maluku",
    born: "4 Januari 1800, Nusalaut",
    img: marthaImg,
    bio: "Martha Christina Tiahahu adalah pahlawan wanita Maluku yang berjuang bersama Pattimura pada tahun 1817. Di usia 17 tahun, ia memimpin pasukan perempuan menyerbu Benteng Beverwijk dengan keberanian luar biasa. Setelah ditangkap, ia wafat pada 2 Januari 1818 di atas kapal Eversten akibat aksi mogok makan sebagai bentuk perlawanan terakhir. Martha adalah simbol kesetiaan dan keberanian yang lebih memilih gugur daripada tunduk kepada penjajah.",
  },
];

const timeline = [
  { year: "Mei 1817", title: "Perlawanan Dimulai", desc: "Rakyat Saparua mengangkat Thomas Matulessy sebagai Kapitan Besar." },
  { year: "16 Mei 1817", title: "Benteng Duurstede Direbut", desc: "Pasukan Pattimura menyerbu dan menguasai benteng kolonial Belanda." },
  { year: "Agustus 1817", title: "Martha Bertempur", desc: "Martha Christina Tiahahu, 17 tahun, memimpin pertempuran di Nusalaut." },
  { year: "11 November 1817", title: "Pattimura Ditangkap", desc: "Pengkhianatan membuat Pattimura tertangkap pasukan Belanda." },
  { year: "16 Desember 1817", title: "Pattimura Dihukum Gantung", desc: "Di depan Benteng Victoria, Ambon — gugur sebagai pahlawan." },
  { year: "2 Januari 1818", title: "Martha Wafat di Laut", desc: "Setelah mogok makan, ia wafat di Laut Banda, jenazahnya dilarung." },
];

const gallery = [
  { src: beverImg, caption: "Benteng Beverwijk, Nusalaut", desc: "Benteng pertahanan yang diserang Martha Christina Tiahahu dengan keberanian luar biasa pada 1817." },
  { src: duurstedeImg, caption: "Benteng Duurstede, Saparua", desc: "Benteng kolonial yang berhasil direbut oleh pasukan Pattimura pada 16 Mei 1817 dalam pertempuran heroik." },
  { src: parangsalawakuImg, caption: "Parang Salawaku — Senjata Pattimura", desc: "Senjata tradisional Maluku yang menjadi simbol perlawanan dan semangat kemerdekaan Pattimura." },
  { src: monumenmImg, caption: "Monumen Martha Christina Tiahahu", desc: "Peringatan akan jasa Martha, srikandi Maluku yang memilih gugur demi tanah air." },
  { src: rumahpatImg, caption: "Kediaman Kapitan Pattimura, Haria", desc: "Rumah bersejarah tempat tinggal Kapitan Pattimura di kampung halaman Haria, Saparua." },
];

function GallerySlider({ items }: { items: { src: string; caption: string; desc: string }[] }) {
  const [offset, setOffset] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const touchX = useRef(0);
  const PER = 3;
  const maxOffset = items.length - PER;

  const go = (idx: number) => {
    const clamped = Math.max(0, Math.min(maxOffset, idx));
    setOffset(clamped);
    if (trackRef.current) {
      const cardW = trackRef.current.children[0]?.getBoundingClientRect().width ?? 0;
      trackRef.current.style.transform = `translateX(-${clamped * (cardW + 16)}px)`;
    }
  };

 return (
  <div className="select-none flex items-center gap-3">
    {/* Tombol Kiri */}
    <button
      onClick={() => go(offset - 1)} disabled={offset === 0}
      className="flex-shrink-0 w-10 h-10 rounded-full border border-gold/40 text-gold flex items-center justify-center disabled:opacity-20 disabled:cursor-not-allowed hover:bg-gold/10 hover:border-gold/70 hover:scale-105 transition-all"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 18 9 12 15 6" />
      </svg>
    </button>

    {/* Track + Dots */}
    <div className="flex-1 min-w-0">
      <div
        className="overflow-hidden rounded-2xl"
        onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) go(dx < 0 ? offset + 1 : offset - 1);
        }}
      >
        <div
          ref={trackRef}
          className="flex gap-4"
          style={{ transition: "transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)" }}
        >
          {items.map((g, i) => (
            <figure
              key={i}
              className="flex-shrink-0 rounded-2xl overflow-hidden relative border border-gold/20 group"
              style={{ width: "calc(33.333% - 11px)", aspectRatio: "4/5" }}
            >
              <img
                src={g.src} alt={g.caption} loading="lazy" draggable={false}
                className="w-full h-full object-cover pointer-events-none transition-transform duration-600 group-hover:scale-[1.07]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/35 to-black/4 transition-all duration-400 group-hover:from-black/95 group-hover:via-black/65 group-hover:to-black/10" />
              <figcaption className="absolute bottom-0 left-0 right-0 p-[1.1rem]">
                <p className="text-beige font-serif-display text-[15px] leading-snug transition-transform duration-380 group-hover:-translate-y-11">
                  {g.caption}
                </p>
                <p className="absolute bottom-[1.1rem] left-[1.1rem] right-[1.1rem] text-beige/78 text-xs leading-relaxed opacity-0 translate-y-2 transition-all duration-320 delay-[60ms] group-hover:opacity-100 group-hover:translate-y-0">
                  {g.desc}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {Array.from({ length: maxOffset + 1 }).map((_, i) => (
          <button
            key={i} onClick={() => go(i)} aria-label={`Posisi ${i + 1}`}
            className={`rounded-full transition-all duration-320 ${i === offset ? "w-6 h-2 bg-gold" : "w-[7px] h-[7px] bg-gold/25 hover:bg-gold/50"}`}
          />
        ))}
      </div>
    </div>

    {/* Tombol Kanan */}
    <button
      onClick={() => go(offset + 1)} disabled={offset >= maxOffset}
      className="flex-shrink-0 w-10 h-10 rounded-full border border-gold/40 text-gold flex items-center justify-center disabled:opacity-20 disabled:cursor-not-allowed hover:bg-gold/10 hover:border-gold/70 hover:scale-105 transition-all"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 6 15 12 9 18" />
      </svg>
    </button>
  </div>
);
}

function Index() {
  const [scrollY, setScrollY] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [timelineProgress, setTimelineProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
      const el = timelineRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const wh = window.innerHeight;
        const total = rect.height + wh * 0.6;
        const scrolled = wh - rect.top;
        const p = Math.max(0, Math.min(100, (scrolled / total) * 130));
        setTimelineProgress(p);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* HERO */}
      <section className="relative h-[92vh] overflow-hidden flex items-center justify-center">
        <div
          className="absolute inset-0 will-change-transform"
          style={{
            transform: `translateY(${scrollY * 0.4}px) scale(1.1)`,
            backgroundImage: `url(${heroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-maroon-deep/60 via-background/70 to-background" />
        <div className="absolute inset-0 paper-texture opacity-60" />

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <p className="animate-hero-fade text-gold tracking-[0.4em] text-xs sm:text-sm mb-6 font-medium">
            ★ SEJARAH NUSANTARA ★
          </p>
          <h1
            className="animate-hero-fade font-serif-display text-5xl sm:text-7xl md:text-8xl font-bold text-beige leading-[1.05] drop-shadow-2xl"
            style={{ animationDelay: "0.2s" }}
          >
            Pahlawan <span className="text-gold">Maluku</span>
          </h1>
          <p
            className="animate-hero-fade mt-6 text-lg sm:text-2xl text-beige/85 font-light max-w-3xl mx-auto"
            style={{ animationDelay: "0.5s" }}
          >
            Perjuangan Pattimura & Martha Christina Tiahahu melawan kolonialisme di tanah Maluku, 1817.
          </p>
          <div
            className="animate-hero-fade mt-10 flex items-center justify-center gap-4 flex-wrap"
            style={{ animationDelay: "0.8s" }}
          >
            <a
              href="#biografi"
              className="px-7 py-3.5 rounded-full bg-gradient-maroon text-beige font-medium shadow-glow hover:scale-105 transition-transform"
            >
              Jelajahi Kisahnya
            </a>
            <Link
              to="/kuis"
              className="px-7 py-3.5 rounded-full border border-gold/60 text-gold font-medium hover:bg-gold/10 transition-colors"
            >
              Mulai Kuis →
            </Link>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-beige/60 text-xs tracking-widest animate-ember">
          ▼ SCROLL
        </div>
      </section>

      {/* QUOTE */}
      <section className="py-20 px-6 bg-maroon-deep border-y border-border">
        <Reveal>
          <blockquote className="max-w-4xl mx-auto text-center">
            <p className="font-serif-display text-2xl sm:text-4xl text-beige italic leading-relaxed">
              "Lebih baik mati berkalang tanah daripada hidup dijajah."
            </p>
            <footer className="mt-6 text-gold tracking-widest text-sm">SEMANGAT PERJUANGAN MALUKU.</footer>
          </blockquote>
        </Reveal>
      </section>

      {/* BIOGRAFI */}
      <section id="biografi" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <p className="text-gold tracking-[0.3em] text-xs mb-3">— BIOGRAFI —</p>
              <h2 className="font-serif-display text-4xl sm:text-5xl text-beige">Dua Pahlawan, Satu Tekad</h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            {heroes.map((h, i) => {
              const route = i === 0 ? "/pattimura" : "/martha";
              return (
                <Reveal key={h.name} direction={i === 0 ? "left" : "right"} delay={i * 150}>
                  <Link
                    to={route}
                    className="group bg-card rounded-2xl p-8 border border-border shadow-classic hover:border-gold/50 transition-all hover:-translate-y-1 duration-500 block cursor-pointer"
                  >
                    <div className="relative w-40 h-40 mx-auto mb-6">
                      <div className="absolute inset-0 rounded-full bg-gradient-maroon blur-xl opacity-60 group-hover:opacity-100 transition-opacity" />
                      <img
                        src={h.img}
                        alt={h.name}
                        width={768}
                        height={768}
                        loading="lazy"
                        className="relative w-40 h-40 rounded-full object-cover border-4 border-gold/70 shadow-classic group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <h3 className="font-serif-display text-2xl text-beige text-center">{h.name}</h3>
                    <p className="text-gold text-center text-sm tracking-wider mt-1">{h.title}</p>
                    <p className="text-muted-foreground text-center text-sm mt-2">Lahir: {h.born}</p>
                    <p className="mt-5 text-beige/80 leading-relaxed text-center">{h.bio}</p>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-24 px-6 bg-brown-deep/40">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center mb-20">
              <p className="text-gold tracking-[0.3em] text-xs mb-3">— TIMELINE —</p>
              <h2 className="font-serif-display text-4xl sm:text-5xl text-beige">Perjalanan Perjuangan</h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                Tahun 1817 — ketika api perlawanan menyala di tanah Maluku.
              </p>
            </div>
          </Reveal>

          <div className="relative" ref={timelineRef}>
            <div className="absolute left-1/2 top-0 bottom-0 w-[3px] -translate-x-1/2 bg-gold/15 rounded-full" />
            <div
              className="absolute left-1/2 top-0 w-[3px] -translate-x-1/2 rounded-full overflow-visible"
              style={{
                height: `${timelineProgress}%`,
                background:
                  "linear-gradient(to bottom, transparent, oklch(0.78 0.14 75) 10%, oklch(0.88 0.16 80) 50%, oklch(0.78 0.14 75) 90%, transparent)",
                transition: "height 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
                boxShadow: "0 0 20px oklch(0.78 0.14 75 / 0.6)",
              }}
            >
              <div
                className="absolute -left-2 -bottom-6 w-[18px] h-[40px] rounded-full pointer-events-none animate-pulse"
                style={{
                  background:
                    "radial-gradient(ellipse at center, oklch(0.92 0.16 80 / 0.9) 0%, oklch(0.78 0.14 75 / 0.4) 40%, transparent 70%)",
                  filter: "blur(2px)",
                }}
              />
            </div>
            <div className="space-y-16">
              {timeline.map((t, i) => {
                const left = i % 2 === 0;
                return (
                  <Reveal key={i} direction={left ? "left" : "right"}>
                    <div className={`relative flex items-center ${left ? "justify-start" : "justify-end"}`}>
                      <div className={`w-full md:w-[45%] ${left ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                        <div className="bg-card border border-border rounded-xl p-6 shadow-classic hover:border-gold/60 hover:shadow-glow transition-all duration-500">
                          <p className="text-gold font-serif-display text-xl">{t.year}</p>
                          <h3 className="text-beige text-lg font-semibold mt-1">{t.title}</h3>
                          <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{t.desc}</p>
                        </div>
                      </div>
                      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-gradient-gold border-4 border-background shadow-glow z-10 animate-pulse" />
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <p className="text-gold tracking-[0.3em] text-xs mb-3">— GALERI —</p>
              <h2 className="font-serif-display text-4xl sm:text-5xl text-beige">Jejak Sejarah</h2>
            </div>
          </Reveal>

          <GallerySlider items={gallery} />
        </div>
      </section>

      {/* CTA KUIS */}
      <section className="py-24 px-6 bg-maroon-deep">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <p className="text-gold tracking-[0.3em] text-xs mb-3">— UJI PEMAHAMAN —</p>
            <h2 className="font-serif-display text-4xl sm:text-5xl text-beige">
              Sudah siap menguji pengetahuanmu?
            </h2>
            <p className="mt-5 text-beige/80 text-lg leading-relaxed">
              Seberapa dalam kamu mengenal Kapitan dan Srikandi Maluku? Buktikan pengetahuanmu sekarang.
            </p>
            <Link
              to="/kuis"
              className="inline-block mt-10 px-8 py-3.5 rounded-full bg-gradient-gold text-maroon-deep font-semibold shadow-glow hover:scale-105 transition-transform"
            >
              Mulai Kuis →
            </Link>
          </Reveal>
        </div>
      </section>

      <footer className="py-10 border-t border-border text-center text-muted-foreground text-sm">
        © {new Date().getFullYear()} Knftspt & Sofus - Sejarah Perjuangan Maluku.
      </footer>
    </div>
  );
}