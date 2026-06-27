import { readFileSync } from "node:fs";

const app = readFileSync(new URL("../src/App.tsx", import.meta.url), "utf8");
const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");

const expectations = [
  "陈柏光 / AI视觉设计师",
  "专注以生成式工具构建具有强记忆点的",
  "品牌视觉、影像概念与数字内容体验。",
  "BRAND VISUALS · MOTION CONCEPTS · DIGITAL EXPERIENCES",
  "/videos/001-optimized.mp4",
  "/images/hero-poster.webp",
  "/images/profile-showcase.webp",
  "liquid-field",
  "liquid-field__mesh",
  "BorderGlow",
  "colors={[\"#DEDBC8\", \"#A85E3B\", \"#7A8062\"]}",
  "gsap",
  "ScrollTrigger",
  "hero-title-mask",
  "section-title-reveal",
  "stagger-card",
  "image-reveal",
  "parallax-image",
  "bg-black text-primary",
  "max-w-[1700px]",
  "精选作品",
  "创作方法",
  "联系合作",
];

const missing = expectations.filter((text) => !app.includes(text));

if (!html.includes("<title>陈柏光个人作品站</title>")) {
  missing.push("陈柏光个人作品站 title");
}

if (app.includes(">Profile<")) {
  missing.push("Profile text should be removed");
}

if (missing.length > 0) {
  throw new Error(`Missing expected portfolio copy: ${missing.join(", ")}`);
}

console.log("content smoke test passed");
