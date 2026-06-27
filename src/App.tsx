import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BorderGlow from "./components/BorderGlow";

gsap.registerPlugin(ScrollTrigger);

const works = [
  {
    number: "01",
    title: "精选作品",
    summary: "AI视觉海报、品牌主视觉、动态短片与生成式影像实验。",
    items: ["概念设定", "视觉生成", "后期合成"],
  },
  {
    number: "02",
    title: "创作方法",
    summary: "用AI作为视觉探索引擎，把抽象关键词转化为稳定、可延展的设计系统。",
    items: ["提示词策略", "风格训练", "系列化输出"],
  },
  {
    number: "03",
    title: "联系合作",
    summary: "面向品牌、活动、展览与内容团队，提供AI视觉方向和落地制作。",
    items: ["视觉顾问", "项目合作", "长期共创"],
  },
];

function ArrowIcon() {
  return (
    <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24">
      <path
        d="M5 12h14m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" className="size-4 shrink-0" fill="none" viewBox="0 0 24 24">
      <path
        d="m5 13 4 4L19 7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function App() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.set(".opening-mask", { scaleX: 1, transformOrigin: "left center" });
      gsap.set(".hero-video", { scale: 1.08 });
      gsap.set(".hero-nav", { autoAlpha: 0, y: -18 });
      gsap.set(".hero-kicker", { autoAlpha: 0, y: 26 });
      gsap.set(".hero-title-mask", {
        autoAlpha: 0,
        clipPath: "inset(0 100% 0 0)",
        scaleX: 0.72,
        transformOrigin: "left center",
        x: -46,
      });
      gsap.set(".hero-copy", { autoAlpha: 0, y: 34 });
      gsap.set(".hero-counter", { autoAlpha: 0, scale: 0.86, rotate: -10 });

      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .to(".opening-mask", { scaleX: 0, duration: 1.25, delay: 0.12 })
        .to(".hero-video", { scale: 1, duration: 2.2 }, 0.18)
        .to(".hero-title-mask", { autoAlpha: 1, clipPath: "inset(0 0% 0 0)", scaleX: 1, x: 0, duration: 1.45 }, 0.62)
        .to(".hero-kicker", { autoAlpha: 1, y: 0, duration: 1.05 }, 0.9)
        .to(".hero-copy", { autoAlpha: 1, y: 0, duration: 1.05, stagger: 0.12 }, 1.04)
        .to(".hero-nav", { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.06 }, 1.22)
        .to(".hero-counter", { autoAlpha: 1, scale: 1, rotate: 0, duration: 1.1, ease: "power3.out" }, 1.42);

      gsap.utils.toArray<HTMLElement>(".scroll-section").forEach((section) => {
        const title = section.querySelector(".section-title-reveal");
        const imageReveal = section.querySelectorAll(".image-reveal");
        const cards = section.querySelectorAll(".stagger-card");

        if (title) {
          gsap.fromTo(
            title,
            { autoAlpha: 0, y: 110, scaleY: 0.72, clipPath: "inset(100% 0 0 0)", transformOrigin: "bottom center" },
            {
              autoAlpha: 1,
              y: 0,
              scaleY: 1,
              clipPath: "inset(0% 0 0 0)",
              duration: 1.35,
              ease: "expo.out",
              scrollTrigger: { trigger: section, start: "top 78%", once: true },
            },
          );
        }

        if (imageReveal.length > 0) {
          gsap.fromTo(
            imageReveal,
            { clipPath: "inset(0 0 100% 0)", y: 70 },
            {
              clipPath: "inset(0 0 0% 0)",
              y: 0,
              duration: 1.45,
              ease: "power3.out",
              stagger: 0.16,
              scrollTrigger: { trigger: section, start: "top 76%", once: true },
            },
          );
        }

        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            { autoAlpha: 0, y: 92, scale: 0.94, rotateX: 7 },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              rotateX: 0,
              duration: 1.1,
              ease: "power3.out",
              stagger: 0.14,
              scrollTrigger: { trigger: section, start: "top 72%", once: true },
            },
          );
        }
      });

      gsap.utils.toArray<HTMLElement>(".parallax-image").forEach((image) => {
        gsap.to(image, {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: image,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-black text-primary" ref={rootRef}>
      <section className="bg-black px-8 py-8">
        <div className="relative mx-auto min-h-[calc(100vh-4rem)] max-w-[1700px] overflow-hidden rounded-[36px] bg-black">
          <div className="opening-mask pointer-events-none absolute inset-0 z-30 bg-black" />
          <video
            className="hero-video absolute inset-0 h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            poster="/images/hero-poster.webp"
            preload="metadata"
            width="720"
            height="1280"
          >
            <source src="/videos/001-optimized.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.2),rgba(0,0,0,0.08)_34%,rgba(0,0,0,0.48)_100%)]" />
          <div className="absolute inset-y-0 right-0 w-[46%] bg-white/10 backdrop-blur-[18px]" />
          <div className="absolute inset-y-0 right-[40%] w-[12%] bg-white/10 backdrop-blur-md" />
          <div className="noise-overlay absolute inset-0 opacity-45" />

          <nav className="relative z-10 flex items-center justify-end gap-12 px-12 py-10 text-xs text-white/78">
            <a className="hero-nav transition hover:text-white" href="#about">
              About
            </a>
            <a className="hero-nav transition hover:text-white" href="#works">
              Works
            </a>
            <a className="hero-nav transition hover:text-white" href="#method">
              Method
            </a>
            <a className="hero-nav transition hover:text-white" href="#contact">
              Contact
            </a>
          </nav>

          <div className="relative z-10 grid min-h-[calc(100vh-9.5rem)] grid-cols-[0.92fr_1.08fr] px-16 pb-16">
            <div aria-hidden="true" />

            <div className="flex flex-col justify-center pl-8">
              <p className="hero-kicker mb-7 text-xs uppercase tracking-[0.36em] text-white/75">
                BRAND VISUALS · MOTION CONCEPTS · DIGITAL EXPERIENCES
              </p>
              <h1 className="hero-title-mask text-[118px] font-extrabold uppercase leading-[0.82] tracking-[-0.075em] text-white xl:text-[152px]">
                AI
                <span className="font-serif italic font-normal tracking-[-0.04em]">Visual</span>
              </h1>
              <div className="mt-8 max-w-[660px]">
                <p className="hero-copy text-2xl font-bold leading-tight text-white">
                  陈柏光 / AI视觉设计师
                </p>
                <p className="hero-copy mt-5 text-lg leading-7 text-white/82">
                  专注以生成式工具构建具有强记忆点的
                  <br />
                  品牌视觉、影像概念与数字内容体验。
                </p>
              </div>
            </div>
          </div>

          <div className="hero-counter absolute bottom-12 right-16 z-10 flex size-48 items-center justify-center rounded-full border border-white/35 text-center text-white/88">
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-white/60">Selected</p>
              <p className="mt-2 font-serif text-5xl italic leading-none">06/26</p>
            </div>
          </div>
        </div>
      </section>

      <div className="liquid-field relative overflow-hidden bg-[#050505]">
        <div className="liquid-field__mesh absolute inset-0" aria-hidden="true" />
        <div className="liquid-field__grain absolute inset-0" aria-hidden="true" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.18),rgba(0,0,0,0.54))]" />

      <section className="scroll-section relative z-10 px-8 py-24" id="about">
        <BorderGlow
          animated
          backgroundColor="rgba(8, 7, 6, 0.72)"
          borderRadius={28}
          className="image-reveal mx-auto max-w-[1700px]"
          colors={["#DEDBC8", "#A85E3B", "#7A8062"]}
          edgeSensitivity={24}
          fillOpacity={0.34}
          glowColor="34 72 70"
          glowIntensity={0.9}
          glowRadius={46}
        >
          <img
            alt="AI visual design showcase"
            className="parallax-image block w-full object-cover"
            decoding="async"
            height="941"
            loading="lazy"
            src="/images/profile-showcase.webp"
            width="1672"
          />
        </BorderGlow>
      </section>

      <section className="bg-noise scroll-section relative z-10 px-8 py-24" id="works">
        <div className="mx-auto max-w-[1700px]">
          <div className="mb-12 flex items-end justify-between gap-12">
            <h2 className="section-title-reveal max-w-4xl text-6xl leading-none text-primary">
              面向品牌与内容团队的AI视觉工作流
              <span className="block text-primary/35">从概念到成片，保持风格一致。</span>
            </h2>
            <a
              className="inline-flex shrink-0 items-center gap-3 rounded-full border border-primary/20 px-6 py-4 text-base text-primary/80 transition hover:border-primary/50 hover:text-primary"
              href="mailto:hello@example.com"
            >
              hello@example.com
              <ArrowIcon />
            </a>
          </div>

          <div className="grid grid-cols-4 gap-4" id="method">
            <BorderGlow
              animated
              backgroundColor="#10100d"
              borderRadius={24}
              className="image-reveal stagger-card min-h-[520px]"
              colors={["#DEDBC8", "#A85E3B", "#7A8062"]}
              edgeSensitivity={28}
              fillOpacity={0.28}
              glowColor="36 82 72"
              glowIntensity={0.82}
              glowRadius={34}
            >
              <article className="relative min-h-[520px] overflow-hidden rounded-[24px] bg-graphite">
                <img
                  alt="AI generated visual workspace"
                  className="parallax-image absolute inset-0 h-full w-full object-cover opacity-72"
                  decoding="async"
                  height="1280"
                  loading="lazy"
                  src="/images/hero-poster.webp"
                  width="720"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/85" />
                <div className="absolute bottom-0 p-8">
                  <p className="mb-4 text-sm uppercase tracking-[0.28em] text-primary/60">Visual system</p>
                  <h3 className="text-4xl leading-none text-primary">AI image direction.</h3>
                </div>
              </article>
            </BorderGlow>

            {works.map((work) => (
              <BorderGlow
                backgroundColor="#10100d"
                borderRadius={24}
                className="stagger-card min-h-[520px]"
                colors={["#DEDBC8", "#A85E3B", "#7A8062"]}
                edgeSensitivity={30}
                fillOpacity={0.24}
                glowColor="34 74 70"
                glowIntensity={0.76}
                glowRadius={32}
                key={work.title}
              >
                <article className="flex min-h-[520px] flex-col justify-between rounded-[24px] bg-graphite/92 p-8">
                  <div>
                    <div className="mb-14 flex size-16 items-center justify-center rounded-2xl bg-primary text-xl font-bold text-black">
                      {work.number}
                    </div>
                    <h3 className="mb-5 text-4xl leading-none text-primary">{work.title}</h3>
                    <p className="text-base leading-7 text-gray-400">{work.summary}</p>
                  </div>
                  <div>
                    <ul className="space-y-4">
                      {work.items.map((item) => (
                        <li className="flex items-center gap-3 text-base text-gray-400" key={item}>
                          <span className="text-primary">
                            <CheckIcon />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <a className="mt-10 inline-flex items-center gap-3 text-base text-primary" href="#contact">
                      Learn more <span className="-rotate-45"><ArrowIcon /></span>
                    </a>
                  </div>
                </article>
              </BorderGlow>
            ))}
          </div>
        </div>
      </section>

      <section className="scroll-section relative z-10 px-8 py-20" id="contact">
        <BorderGlow
          backgroundColor="rgba(0, 0, 0, 0.38)"
          borderRadius={28}
          className="stagger-card mx-auto max-w-[1700px]"
          colors={["#DEDBC8", "#A85E3B", "#7A8062"]}
          edgeSensitivity={34}
          fillOpacity={0.18}
          glowColor="38 70 68"
          glowIntensity={0.58}
          glowRadius={30}
        >
        <div className="flex items-center justify-between rounded-[28px] border border-primary/15 bg-black/35 px-12 py-10 backdrop-blur-sm">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary/45">Available for projects</p>
            <h2 className="mt-4 text-5xl text-primary">让AI视觉成为项目的第一记忆点。</h2>
          </div>
          <a className="rounded-full bg-primary px-8 py-5 text-lg font-bold text-black" href="mailto:hello@example.com">
            联系合作
          </a>
        </div>
        </BorderGlow>
      </section>
      </div>
    </main>
  );
}

export default App;
