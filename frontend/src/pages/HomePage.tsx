import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Search,
  FileText,
  Lightbulb,
  BookOpen,
  Users,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import MorphSlider from "../Effects/Morph-Slider";
import { getStats, getFeatured, getDepartments } from "../data/researchService";
import { Stats, FeaturedRecords, Department } from "../types";

gsap.registerPlugin(ScrollTrigger);

const sliderItems = [
  {
    image: "Images/J1.png",
    title: "Research Environment",
    caption: "Research papers.",
  },
  {
    image: "Images/J2.png",
    title: "Biosciences",
    caption: "Research papers.",
  },
];

interface HomePageProps {
  onSearchOpen?: () => void;
}

function HomePage({ onSearchOpen }: HomePageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const patronsRef = useRef<HTMLDivElement>(null);
  const coPatronsRef = useRef<HTMLDivElement>(null);
  const institutesRef = useRef<HTMLDivElement>(null);

  const [stats, setStats] = useState<Stats | null>(null);
  const [, setFeatured] = useState<FeaturedRecords>({
    papers: [],
    indexed: [],
    books: [],
  });
  const [, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeProfile] = useState("message");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const profileData = [
    {
      key: "message",
      label: "R&C Cell Message",
      title: "Research & Consultancy Cell",
      designation: "R&C Cell",
      image: "Images/CEO-1.jpg",
      excerpt:
        "At Shri Ramswaroop Memorial University (SRMU) Barabanki, we believe that research and innovation are fundamental drivers of academic excellence, technological advancement, and societal progress.",
      fullContent: [
        <h1
          key="welcome"
          className="text-2xl font-bold text-charcoal-navy"
        >
          Welcomes you all!
        </h1>,
        "At Shri Ramswaroop Memorial University (SRMU) Barabanki, we believe that research and innovation are fundamental drivers of academic excellence, technological advancement, and societal progress. Our commitment is to cultivate a dynamic research ecosystem that empowers students, faculty members, and research scholars to transform ideas into impactful solutions.",
        "The University has established state-of-the-art research and innovation facilities, including the AI Center of Excellence, Virtual Instrumentation Laboratory, Cadence Design Laboratory, PCB design Lab, Centre of Excellence (EV Lab), and the Innovation & Incubation Hub, which provide a robust platform for experimentation, product development, entrepreneurship, and interdisciplinary research. These facilities enable our researchers to engage with emerging technologies and address real-world challenges through innovative approaches.",
        "A distinctive feature of SRMU's research framework is its emphasis on Experiment-Based Research. By integrating research-oriented projects into the learning process, we encourage researchers to develop critical thinking, problem-solving abilities, teamwork, and innovation skills. This approach bridges the gap between theoretical knowledge and practical application, preparing researchers to excel in both industry and academia.",
        "The R&C cell actively promotes quality publications, industry collaborations, intellectual property creation, and startup incubation. R&C cell continuously strives to strengthen partnerships with academic institutions, research organizations, government agencies, and industry leaders to create opportunities for knowledge exchange and collaborative innovative research.",
        "As we move forward in an era defined by rapid technological transformation, our focus remains on nurturing a culture of inquiry, creativity, ethical research practices, and entrepreneurial thinking. R&C Cell encourages research scholars and faculty members to explore new frontiers of knowledge and contribute meaningfully to national development and global progress.",
        "R&C Cell invites you to explore the diverse research opportunities available at SRMU, Barabanki and become part of a community dedicated to excellence, innovation, and lifelong learning.",
        "Together, let us create knowledge, inspire innovation, and shape a better future.",
        <h1
          key="research-cell"
          className="text-2xl font-bold text-charcoal-navy"
        >
          Research and Consultancy Cell
        </h1>,
        "Shri Ramswaroop Memorial University, Barabanki",
      ],
    },
  ];

  const activeProfileData =
    profileData.find((profile) => profile.key === activeProfile) ||
    profileData[0];

  /* ----------------------------------
     Data Loading
  ---------------------------------- */
  useEffect(() => {
    try {
      const statsData = getStats();
      const featData = getFeatured();
      const deptData = getDepartments();

      setStats(statsData);
      setFeatured(featData);
      setDepartments(deptData);
    } catch (err) {
      console.error("Failed to load home page data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  /* ----------------------------------
     Modal Escape Key
  ---------------------------------- */
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  /* ----------------------------------
     GSAP Animations Setup
  ---------------------------------- */
  useEffect(() => {
    if (loading || !containerRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Hero Entrance Animation
      const heroTl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          gsap.set(
            ".hero-badge-reveal, .hero-title-reveal, .hero-message-reveal, .hero-slider-reveal",
            { clearProps: "all" }
          );
        },
      });

      heroTl
        .fromTo(
          ".hero-badge-reveal",
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, delay: 0.1 }
        )
        .fromTo(
          ".hero-title-reveal",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75 },
          "-=0.4"
        )
        .fromTo(
          ".hero-message-reveal",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75 },
          "-=0.45"
        )
        .fromTo(
          ".hero-slider-reveal",
          { scale: 0.94, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.9 },
          "-=0.6"
        );

      // Stats Strip ScrollTrigger
      if (statsRef.current) {
        gsap.fromTo(
          ".stat-item-reveal",
          { y: 30, opacity: 0 },
          {
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 85%",
              once: true,
            },
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            clearProps: "all",
          }
        );
      }

      // Patrons ScrollTrigger
      if (patronsRef.current) {
        gsap.fromTo(
          ".patron-card-reveal",
          { y: 35, opacity: 0 },
          {
            scrollTrigger: {
              trigger: patronsRef.current,
              start: "top 80%",
              once: true,
            },
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: "power2.out",
            clearProps: "all",
          }
        );
      }

      // Co Patrons ScrollTrigger
      if (coPatronsRef.current) {
        gsap.fromTo(
          ".copatron-card-reveal",
          { y: 35, opacity: 0 },
          {
            scrollTrigger: {
              trigger: coPatronsRef.current,
              start: "top 80%",
              once: true,
            },
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: "power2.out",
            clearProps: "all",
          }
        );
      }

      // Institutes ScrollTrigger
      if (institutesRef.current) {
        gsap.fromTo(
          ".institute-card-reveal",
          { y: 35, opacity: 0 },
          {
            scrollTrigger: {
              trigger: institutesRef.current,
              start: "top 78%",
              once: true,
            },
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "power2.out",
            clearProps: "all",
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [loading]);

  if (loading) {
    return (
      <div className="loading-state">
        <span className="loading-dot" />
        Loading the research archive
      </div>
    );
  }

  const institutes = [
    {
      src: "Images/c1.webp",
      title: "Institute of Technology",
      text: "The Institute of Technology is committed to provide focused learning in the fields of engineering with an aim of creating human resources with knowledge and skills to contribute successfully to a complex world.",
      department: "5 DEPARTMENTS",
    },
    {
      src: "Images/c2.jpg",
      title: "Institute of Biosciences and Technology",
      text: "Biotechnology encompasses the applications of understanding of the biological systems to improve human life by addressing challenges and issues facing agricultural sciences, medical sciences, food sciences, etc.",
      department: "2 DEPARTMENTS",
    },
    {
      src: "Images/c3.webp",
      title: "Institute of Management, Commerce and Economics",
      text: "The Institute of Management, Commerce and Economics (IMCE) was started in the year 2012. IMCE seeks to be a trailblazer in management education through strong academic-industry collaboration for international alliances.",
      department: "2 DEPARTMENTS",
    },
    {
      src: "Images/c4.jpg",
      title: "Institute of Media Studies",
      text: "Journalism and Mass Communication study is an encouragement to think about the forces involved in giving it shape. Mass Media industry is one of the fastest growing industries with the mission of social conscience.",
      department: "1 DEPARTMENT",
    },
    {
      src: "Images/c5.webp",
      title: "Institute of Natural Sciences and Humanities",
      text: "The Institute boasts of being the heart and soul of the University as its various disciplines of knowledge is essentially required with all the academic programs that run across the University.",
      department: "4 DEPARTMENTS",
    },
    {
      src: "Images/c6.webp",
      title: "Institute of Pharmaceutical Sciences",
      text: "Due to its integration of chemistry and health sciences, pharmaceutical science is both a unique field and extremely important to human survival.",
      department: "1 DEPARTMENT",
    },
    {
      src: "Images/c7.webp",
      title: "Institute of Agricultural Sciences and Technology",
      text: "The Indian Council of Agricultural Sciences has already recognized the B.Sc.(Hons.) Agriculture 4 Years as a professional Degree with consequential benefits to the Students.",
      department: "1 DEPARTMENT",
    },
    {
      src: "Images/c8.avif",
      title: "Institute of Legal Studies",
      text: "The Institute of Legal Studies is a convergence of academic, cultural and intellectual resources. It aims at achieving the highest levels of distinction in the innovation and transmission of knowledge and understanding.",
      department: "1 DEPARTMENT",
    },
    {
      src: "Images/c9.webp",
      title: "Institute of Pharmacy",
      text: "Pharmacy is one of the unique professions and also very vital for the sustenance of human lives as it involves the combination of chemical science with health sciences.",
      department: "1 DEPARTMENT",
    },
  ];

  return (
    <div ref={containerRef} className="home-page-container relative overflow-x-hidden">

      {/* ── HERO SECTION ─────────────────────────────────── */}
      <section ref={heroRef} className="max-w-[1240px] mx-auto px-4 sm:px-6 pt-10 pb-12 sm:pt-14 sm:pb-16 relative">

        {/* Background Building & Decorative Watermarks */}
        <div className="absolute -top-6 right-2 sm:right-6 lg:right-8 w-[340px] sm:w-[420px] lg:w-[480px] opacity-40 pointer-events-none z-0 select-none">
          <img
            src="https://srmu.ac.in/assets/about-hero-D9xX7t0N.png"
            alt="SRMU Building"
            className="w-full h-auto object-contain"
            onError={(e) => {
              (e.currentTarget as HTMLElement).style.display = 'none';
            }}
          />
        </div>

        {/* Right Top Motto Badge */}
        <div className="hidden lg:flex absolute top-2 right-6 flex-col items-end pointer-events-none select-none z-10">
          <span className="font-serif italic text-lg lg:text-xl text-[#0A4A8F] font-bold tracking-tight">
            Research
          </span>
          <span className="font-serif italic text-lg lg:text-xl text-[#FFB703] font-bold tracking-tight">
            For A Brighter
          </span>
          <span className="font-serif italic text-lg lg:text-xl text-[#0A4A8F] font-bold tracking-tight">
            Tomorrow
          </span>
        </div>

        {/* Left Faint Watermark Callout */}
        <div className="hidden xl:block absolute -left-16 top-40 font-serif italic text-slate-300 text-base leading-relaxed select-none pointer-events-none z-0">
          Ideas<br />
          Research<br />
          People<br />
          Change
        </div>

        {/* Right Faint Watermark Callout */}
        <div className="hidden xl:block absolute -right-16 bottom-8 font-mono text-[10px] uppercase tracking-widest text-slate-300 select-none pointer-events-none text-right z-0">
          INNOVATION<br />
          COLLABORATION<br />
          IMPACT
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Left Column: Hero Copy & Message */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">

            {/* Eyebrow badge */}
            <div className="hero-badge-reveal inline-flex items-center gap-2 mb-3">
              <span className="w-5 h-[2px] bg-[#FFB703]" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0A4A8F]">
                MESSAGE
              </span>
            </div>

            {/* Title */}
            <h1 className="hero-title-reveal font-serif text-4xl sm:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-[#0F172A] leading-[1.12] mb-5">
              The Research and <br />
              Consultancy Cell <br />
              <span className="text-[#0A4A8F]">
                (R&amp;C)
              </span>
            </h1>

            {/* Message Box */}
            <div className="hero-message-reveal w-full p-6 sm:p-7 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-sm mb-5">
              <p className="text-[14px] sm:text-[15px] text-slate-600 leading-relaxed m-0 mb-4">
                At Shri Ramswaroop Memorial University (SRMU) Barabanki, we believe that research
                and innovation are fundamental drivers of academic excellence, technological
                advancement, and societal progress. Our commitment is to cultivate a dynamic research
                ecosystem that empowers students, faculty members, and research scholars to transform
                ideas into impactful solutions.
              </p>
              <p className="text-[14px] sm:text-[15px] text-slate-600 leading-relaxed m-0">
                The University has established state-of-the-art research and innovation facilities, including
                the AI Center of Excellence, Virtual Instrumentation Laboratory, Cadence Design
                Laboratory, PCB design Lab, Centre of Excellence (EV Lab), and the Innovation &amp;
                Incubation Hub, which provide a robust platform for experimentation, product development,
                entrepreneurship, and interdisciplinary research.
              </p>
            </div>

            {/* Solid Navy Pill Button */}
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="hero-badge-reveal inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-[#0A4A8F] hover:bg-[#0C5CA8] text-white font-medium text-sm transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer hover:-translate-y-0.5"
            >
              <span>VIEW MORE</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Right Column: Morph Slider in white frame */}
          <div className="lg:col-span-5 hero-slider-reveal flex flex-col items-center justify-start w-full lg:pt-4">
            <div className="w-full max-w-[500px] rounded-3xl overflow-hidden shadow-2xl border border-white bg-white p-3 backdrop-blur-xl relative">
              <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden relative shadow-inner bg-zinc-900">
                <MorphSlider
                  items={sliderItems}
                  transition="melt"
                  intensity={0.4}
                  aberration={0.35}
                  drift={0.55}
                  autoplay
                  overlayColor="rgba(10, 74, 143, 0.15)"
                  duration={0.9}
                  ease="power2.inOut"
                  scale={2.3}
                  autoplayDelay={4}
                  loop
                  radius={18}
                  fit="cover"
                  showCaptions
                  showControls
                  showIndicators
                />
              </div>

              {/* Slider Pagination Indicator Mockup */}
              <div className="pt-3 pb-1 flex items-center justify-center gap-1.5">
                <span className="w-6 h-1 rounded-full bg-[#FFB703]" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── STATISTICS STRIP (4 Columns with Circular Icons) ── */}
      <section ref={statsRef} className="max-w-[1100px] mx-auto px-4 sm:px-6 my-6 sm:my-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-7 rounded-3xl bg-white shadow-lg border border-slate-100">

          {/* Stat 1 */}
          <div className="stat-item-reveal flex items-center gap-3.5 p-2 justify-center sm:justify-start">
            <div className="w-12 h-12 rounded-full bg-[#FFF8E7] flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-[#FFB703]" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-2xl sm:text-3xl font-bold text-[#0A4A8F] leading-tight">
                {stats?.totalIndexed || 195}
              </span>
              <span className="text-[10px] font-mono font-medium text-slate-500 uppercase tracking-wider">
                Research Publications
              </span>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="stat-item-reveal flex items-center gap-3.5 p-2 justify-center sm:justify-start border-l border-slate-100">
            <div className="w-12 h-12 rounded-full bg-[#FFF8E7] flex items-center justify-center shrink-0">
              <Lightbulb className="w-5 h-5 text-[#FFB703]" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-2xl sm:text-3xl font-bold text-[#0A4A8F] leading-tight">
                {stats?.totalPapers || 47}
              </span>
              <span className="text-[10px] font-mono font-medium text-slate-500 uppercase tracking-wider">
                Patents
              </span>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="stat-item-reveal flex items-center gap-3.5 p-2 justify-center sm:justify-start border-l border-slate-100">
            <div className="w-12 h-12 rounded-full bg-[#FFF8E7] flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5 text-[#FFB703]" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-2xl sm:text-3xl font-bold text-[#0A4A8F] leading-tight">
                {stats?.totalBooks || 68}
              </span>
              <span className="text-[10px] font-mono font-medium text-slate-500 uppercase tracking-wider">
                Books &amp; Chapters
              </span>
            </div>
          </div>

          {/* Stat 4 */}
          <div className="stat-item-reveal flex items-center gap-3.5 p-2 justify-center sm:justify-start border-l border-slate-100">
            <div className="w-12 h-12 rounded-full bg-[#FFF8E7] flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-[#FFB703]" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-2xl sm:text-3xl font-bold text-[#0A4A8F] leading-tight">
                {stats?.totalResearchers || 437}+
              </span>
              <span className="text-[10px] font-mono font-medium text-slate-500 uppercase tracking-wider">
                Researchers
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ── PATRONS SECTION ──────────────────────────────── */}
      <section ref={patronsRef} className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-6 relative">

        {/* Left Decorative Watermark Callout */}
        <div className="hidden xl:block absolute -left-16 top-16 text-left select-none pointer-events-none">
          <GraduationCap className="w-8 h-8 text-slate-300 mb-2" />
          <p className="font-serif italic text-slate-400 text-sm leading-snug">
            Knowledge<br />
            Today<br />
            A Better<br />
            Tomorrow
          </p>
          <div className="w-6 h-[2px] bg-[#FFB703] mt-2" />
        </div>

        {/* Right Decorative Watermark Callout */}
        <div className="hidden xl:block absolute -right-16 top-20 text-right select-none pointer-events-none">
          <p className="font-serif text-slate-400 text-sm leading-snug">
            Research<br />
            Transforms<br />
            Possibilities<br />
            into Progress
          </p>
          <div className="w-6 h-[2px] bg-[#FFB703] mt-2 ml-auto" />
        </div>

        {/* Centered Heading with lines */}
        <div className="flex items-center justify-center gap-4 max-w-md mx-auto mb-10">
          <div className="flex-1 h-[1px] bg-slate-200" />
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#0F172A] tracking-tight">
            Patrons
          </h2>
          <div className="flex-1 h-[1px] bg-slate-200" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
          {/* Patron 1 */}
          <div className="patron-card-reveal flex flex-col items-center text-center group">
            <div className="relative p-1 rounded-full bg-gradient-to-tr from-[#0A4A8F]/25 via-[#FFB703]/50 to-[#0A4A8F]/25 shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <img
                src="Images/pankaj-DsE5rnwQ.webp"
                alt="Er. Pankaj Agarwal"
                className="w-36 h-36 sm:w-40 sm:h-40 rounded-full object-cover border-2 border-white shadow-inner"
              />
            </div>
            <h3 className="font-serif text-base sm:text-lg font-bold text-[#0F172A] mt-4 mb-0.5">
              Er. Pankaj Agarwal
            </h3>
            <p className="font-mono text-[11px] uppercase tracking-wider text-slate-500">
              CHANCELLOR
            </p>
          </div>

          {/* Patron 2 */}
          <div className="patron-card-reveal flex flex-col items-center text-center group">
            <div className="relative p-1 rounded-full bg-gradient-to-tr from-[#0A4A8F]/25 via-[#FFB703]/50 to-[#0A4A8F]/25 shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <img
                src="Images/pooja_Agrawal.png"
                alt="Er. Pooja Agarwal"
                className="w-36 h-36 sm:w-40 sm:h-40 rounded-full object-cover border-2 border-white shadow-inner"
              />
            </div>
            <h3 className="font-serif text-base sm:text-lg font-bold text-[#0F172A] mt-4 mb-0.5">
              Er. Pooja Agarwal
            </h3>
            <p className="font-mono text-[11px] uppercase tracking-wider text-slate-500">
              PRO CHANCELLOR
            </p>
          </div>

          {/* Patron 3 */}
          <div className="patron-card-reveal flex flex-col items-center text-center group sm:col-span-2 md:col-span-1">
            <div className="relative p-1 rounded-full bg-gradient-to-tr from-[#0A4A8F]/25 via-[#FFB703]/50 to-[#0A4A8F]/25 shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <img
                src="Images/vijaytiwari-DtLhXa4L.webp"
                alt="Prof. (Dr.) Vijay Tiwari"
                className="w-36 h-36 sm:w-40 sm:h-40 rounded-full object-cover border-2 border-white shadow-inner"
              />
            </div>
            <h3 className="font-serif text-base sm:text-lg font-bold text-[#0F172A] mt-4 mb-0.5">
              Prof. (Dr.) Vijay Tiwari
            </h3>
            <p className="font-mono text-[11px] uppercase tracking-wider text-slate-500">
              VICE CHANCELLOR
            </p>
          </div>
        </div>
      </section>

      {/* ── CO-PATRONS SECTION ───────────────────────────── */}
      <section ref={coPatronsRef} className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-10 pb-16 relative">

        {/* Right Lower Callout */}
        <div className="hidden xl:block absolute -right-16 bottom-10 text-right select-none pointer-events-none font-serif italic text-slate-400 text-xs">
          Discover<br />
          Innovate<br />
          Collaborate
        </div>

        {/* Centered Heading with lines */}
        <div className="flex items-center justify-center gap-4 max-w-md mx-auto mb-10">
          <div className="flex-1 h-[1px] bg-slate-200" />
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#0F172A] tracking-tight">
            Co Patrons
          </h2>
          <div className="flex-1 h-[1px] bg-slate-200" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
          {/* Co Patron 1 */}
          <div className="copatron-card-reveal flex flex-col items-center text-center group">
            <div className="relative p-1 rounded-full bg-gradient-to-tr from-[#0A4A8F]/25 via-[#FFB703]/50 to-[#0A4A8F]/25 shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <img
                src="Images/Hemendra-NSaxOOgS.webp"
                alt="Prof. (Dr.) Hemendra Sharma"
                className="w-36 h-36 sm:w-40 sm:h-40 rounded-full object-cover border-2 border-white shadow-inner"
              />
            </div>
            <h3 className="font-serif text-base sm:text-lg font-bold text-[#0F172A] mt-4 mb-0.5">
              Prof. (Dr.) Hemendra Sharma
            </h3>
            <p className="font-mono text-[11px] uppercase tracking-wider text-slate-500">
              REGISTRAR
            </p>
          </div>

          {/* Co Patron 2 */}
          <div className="copatron-card-reveal flex flex-col items-center text-center group">
            <div className="relative p-1 rounded-full bg-gradient-to-tr from-[#0A4A8F]/25 via-[#FFB703]/50 to-[#0A4A8F]/25 shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <img
                src="Images/Nabeel-Ahmad.jpeg"
                alt="Prof. (Dr.) Nabeel Ahmad"
                className="w-36 h-36 sm:w-40 sm:h-40 rounded-full object-cover border-2 border-white shadow-inner"
              />
            </div>
            <h3 className="font-serif text-base sm:text-lg font-bold text-[#0F172A] mt-4 mb-0.5">
              Prof. (Dr.) Nabeel Ahmad
            </h3>
            <p className="font-mono text-[11px] uppercase tracking-wider text-slate-500">
              DIRECTOR (RESEARCH)
            </p>
          </div>

          {/* Co Patron 3 */}
          <div className="copatron-card-reveal flex flex-col items-center text-center group sm:col-span-2 md:col-span-1">
            <div className="relative p-1 rounded-full bg-gradient-to-tr from-[#0A4A8F]/25 via-[#FFB703]/50 to-[#0A4A8F]/25 shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <img
                src="Images/Alkesh_Agrawal.webp"
                alt="Prof. (Dr.) Alkesh Agrawal"
                className="w-36 h-36 sm:w-40 sm:h-40 rounded-full object-cover border-2 border-white shadow-inner"
              />
            </div>
            <h3 className="font-serif text-base sm:text-lg font-bold text-[#0F172A] mt-4 mb-0.5">
              Prof. (Dr.) Alkesh Agrawal
            </h3>
            <p className="font-mono text-[11px] uppercase tracking-wider text-slate-500">
              DEPUTY DIRECTOR (RESEARCH)
            </p>
          </div>
        </div>
      </section>

      {/* ── INSTITUTES SECTION ("RECENT NOTES") ─────────── */}
      <section ref={institutesRef} className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-10 pb-20">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-3">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#FFB703]" />
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#0C2F44]">
                RECENT NOTES
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-8 bg-[#FFB703] rounded-full hidden sm:block" />
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#0F172A] leading-tight font-bold">
                Research Publication / Patents /{" "}
                <span className="text-[#0A4A8F]">Books &amp; Chapters from...</span>
              </h2>
            </div>
          </div>

          <Link
            to="/patents"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0A4A8F] hover:text-[#0C5CA8] transition-colors shrink-0 group"
          >
            <span>View all papers</span>
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Institute Cards Grid (3x3) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {institutes.map((card) => (
            <div key={card.title} className="institute-card-reveal">
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#0A4A8F]/30 transition-all duration-300 group hover:-translate-y-1 flex flex-col justify-between h-full">
                <div>
                  {/* Image container */}
                  <div className="overflow-hidden rounded-xl mb-4 aspect-[16/10] bg-slate-100 shadow-inner">
                    <img
                      src={card.src}
                      alt={card.title}
                      className="w-full h-full object-cover block transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="font-mono text-[11px] uppercase tracking-wider text-[#0A4A8F] font-bold mb-1">
                    SRMU
                  </div>

                  <h3 className="font-serif text-lg text-[#0F172A] leading-snug mb-2 font-bold group-hover:text-[#0A4A8F] transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                    {card.text}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#0A4A8F]">
                    {card.department}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1 group-hover:text-[#0A4A8F] transition-colors font-medium">
                    Explore <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── VIEW MORE MODAL ──────────────────────────────── */}
      {isModalOpen && (
        <div
          className="view-more-overlay"
          onClick={() => setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="view-more-title"
        >
          <div
            className="view-more-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="view-more-close"
              aria-label="Close modal"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>

            <div className="view-more-header">
              <h3 id="view-more-title">{activeProfileData.title}</h3>
              <p>{activeProfileData.designation}</p>
            </div>

            <div className="view-more-body">
              {activeProfileData.fullContent.map((paragraph, index) =>
                typeof paragraph === "string" ? (
                  <p key={`${activeProfileData.key}-${index}`}>{paragraph}</p>
                ) : (
                  <div key={`${activeProfileData.key}-${index}`}>{paragraph}</div>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;