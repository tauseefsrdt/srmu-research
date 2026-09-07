import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Search,
} from "lucide-react";

import Topography from "../Effects/Topography";
import ElectricBorder from "../Effects/Electric_Border";
import MorphSlider from "../Effects/Morph-Slider";

/*
 * Render backend URL
 *
 * Local development:
 * If REACT_APP_API_URL is not available, the app will use
 * the current domain.
 *
 * Vercel:
 * Add REACT_APP_API_URL in Vercel Environment Variables.
 */
const API_BASE_URL = process.env.REACT_APP_API_URL || "";

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

function HomePage({ onSearchOpen }) {
  const [viewportWidth, setViewportWidth] = useState(
    () => window.innerWidth
  );

  const [stats, setStats] = useState(null);

  // These setters are used by the API calls.
  // The returned values are currently not displayed on this page.
  const [, setFeatured] = useState({
    papers: [],
    indexed: [],
    books: [],
  });

  const [, setDepartments] = useState([]);

  const [loading, setLoading] = useState(true);

  // Only the value is currently required.
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
    profileData.find(
      (profile) => profile.key === activeProfile
    ) || profileData[0];

  const isMobile = viewportWidth <= 800;
  const isSmallMobile = viewportWidth <= 480;
  const isTablet =
    viewportWidth > 800 && viewportWidth <= 1100;

  const styles = {
    page: {
      position: "relative",
      isolation: "isolate",
      overflow: "hidden",
      background: "var(--color-paper-white)",
    },

    background: {
      position: "absolute",
      inset: 0,
      zIndex: -1,
      pointerEvents: "none",
      opacity: 0.5,
      width: "100%",
      height: "100%",
    },

    width: {
      width: isMobile
        ? "calc(100% - 36px)"
        : "min(var(--page-max), calc(100% - 48px))",
      marginInline: "auto",
    },

    hero: {
      minHeight: isMobile ? 0 : 540,
      display: "grid",
      gridTemplateColumns: isMobile
        ? "1fr"
        : isTablet
        ? "minmax(0, 1fr) minmax(300px, .8fr)"
        : "minmax(0, 1.05fr) minmax(360px, .95fr)",
      alignItems: "center",
      gap: isMobile
        ? isSmallMobile
          ? 26
          : 34
        : isTablet
        ? 24
        : 5,
      padding: isMobile
        ? "30px 0 38px"
        : "10px 0 48px",
    },

    heroCopy: {
      minWidth: 0,
    },

    title: {
      maxWidth: 650,
      fontFamily: "var(--font-serif)",
      lineHeight: 1.12,
      fontSize: isSmallMobile ? 32 : 36,
      fontWeight: 700,
      letterSpacing: "-0.025em",
      color: "#111827",
    },

    lede: {
      maxWidth: 550,
      margin: "0 0 30px",
      fontSize: isMobile || isTablet ? 16 : 18,
      lineHeight: 1.55,
      color: "var(--color-slate)",
    },

    heroVisual: {
      minWidth: 0,
      display: "grid",
      placeItems: "center",
      width: "100%",
      paddingLeft: isMobile ? 0 : 12,
      paddingRight: isMobile ? 0 : 12,
      marginLeft: isMobile ? 0 : 8,
    },

    stackFrame: {
      width: `min(100%, ${
        isSmallMobile
          ? 280
          : isMobile
          ? 320
          : isTablet
          ? 320
          : 380
      }px)`,

      height: isSmallMobile
        ? 350
        : isMobile
        ? 400
        : isTablet
        ? 400
        : 480,

      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto",
      padding: isSmallMobile ? "0 0px" : "0 8px",
    },

    actions: {
      display: "flex",
      gap: 12,
      flexWrap: "wrap",
      marginBottom: 24,
      flexDirection: isSmallMobile ? "column" : "row",
      alignItems: isSmallMobile ? "stretch" : "initial",
    },

    statStrip: {
      display: "flex",
      alignItems: isMobile ? "flex-start" : "center",
      justifyContent: isMobile
        ? "flex-start"
        : "space-around",
      gap: 20,
      padding: isSmallMobile
        ? "22px 16px"
        : "22px 24px",
      borderBlock:
        "1px solid var(--color-mint-mist)",
      background: "rgba(255,255,255,.35)",
      flexWrap: isMobile ? "wrap" : "nowrap",
    },

    stat: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      alignItems: isMobile ? "center" : "baseline",
      gap: 10,
      width: isMobile
        ? isSmallMobile
          ? "100%"
          : "calc(50% - 10px)"
        : "auto",
      textAlign: "center",
      fontFamily: "var(--font-mono)",
    },

    statValue: {
      color: "var(--color-deep-teal)",
      fontSize: isSmallMobile ? 20 : 23,
      fontWeight: 600,
    },

    statLabel: {
      color: "var(--color-charcoal-navy)",
      fontSize: isSmallMobile ? 10 : 11,
      letterSpacing: ".05em",
    },

    divider: {
      display: isMobile ? "none" : "block",
      width: 1,
      height: 24,
      background: "var(--color-mint-mist)",
    },

    peopleSection: {
      marginTop: 50,
    },

    sectionTitle: {
      margin: 0,
      textAlign: "center",
      fontFamily: "var(--font-serif)",
      fontSize: 36,
      fontWeight: 700,
      letterSpacing: "-0.025em",
    },

    peopleContainer: {
      maxWidth: 1200,
      margin: "64px auto 0",
      paddingInline: 12,
    },

    peopleGrid: {
      display: "grid",
      gridTemplateColumns:
        "repeat(3, minmax(0, 1fr))",
      gap: isMobile
        ? "24px 14px"
        : "32px 16px",
      marginTop: 50,
    },

    person: {
      color: "#6b7280",
      textAlign: "center",
    },

    personImage: {
      display: "block",
      width: isSmallMobile
        ? 140
        : isMobile
        ? 160
        : 224,
      height: isSmallMobile
        ? 140
        : isMobile
        ? 160
        : 224,
      objectFit: "cover",
      borderRadius: "50%",
      marginInline: "auto",
    },

    personName: {
      margin: "8px 0 0",
      fontSize: 16,
      fontWeight: 500,
    },

    personRole: {
      margin: 0,
      fontSize: 14,
    },

    section: {
      paddingTop: 96,
    },

    heading: {
      display: isMobile ? "block" : "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 40,
      marginBottom: 24,
    },

    headingTitle: {
      margin: "13px 0 0",
      color: "var(--color-charcoal-navy)",
      fontFamily: "var(--font-serif)",
      fontSize: isMobile ? 35 : 38,
      fontWeight: 400,
      lineHeight: 1.12,
    },

    publicationGrid: {
      display: "grid",
      gridTemplateColumns: isMobile
        ? "1fr"
        : "repeat(3, 1fr)",
      gap: 20,
    },

    departmentsBand: {
      marginTop: 96,
      padding: "72px 0 88px",
      background: "var(--color-blush-sand)",
      borderTop:
        "1px solid var(--color-dusty-rose)",
    },

    departmentList: {
      display: "grid",
      gridTemplateColumns: isMobile
        ? "1fr"
        : "repeat(4, 1fr)",
      gap: 12,
    },

    departmentLink: {
      minHeight: 150,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: 20,
      color: "var(--color-charcoal-navy)",
      background: "rgba(242,248,247,.55)",
      border:
        "1px solid var(--color-dusty-rose)",
      borderRadius: "var(--radius-card)",
      textDecoration: "none",
    },

    departmentMark: {
      color: "var(--color-deep-teal)",
      font: "25px var(--font-serif)",
    },

    departmentName: {
      display: "block",
      font: "19px/1.25 var(--font-serif)",
    },

    departmentCount: {
      display: "block",
      marginTop: 7,
      color: "var(--color-slate)",
      fontSize: 12,
    },
  };

  /* ----------------------------------
     Window Resize
  ---------------------------------- */
  useEffect(() => {
    const updateViewportWidth = () =>
      setViewportWidth(window.innerWidth);

    window.addEventListener(
      "resize",
      updateViewportWidth
    );

    return () =>
      window.removeEventListener(
        "resize",
        updateViewportWidth
      );
  }, []);

  /* ----------------------------------
     API Data
  ---------------------------------- */
  useEffect(() => {
    async function fetchData() {
      try {
        const [statsRes, featRes, deptRes] =
          await Promise.all([
            fetch(`${API_BASE_URL}/api/stats`),
            fetch(`${API_BASE_URL}/api/featured`),
            fetch(`${API_BASE_URL}/api/departments`),
          ]);

        if (statsRes.ok) {
          setStats(await statsRes.json());
        }

        if (featRes.ok) {
          setFeatured(await featRes.json());
        }

        if (deptRes.ok) {
          setDepartments(await deptRes.json());
        }
      } catch (err) {
        console.error(
          "Failed to load home page data:",
          err
        );
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  /* ----------------------------------
     Modal Escape Key
  ---------------------------------- */
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, [isModalOpen]);

  /* ----------------------------------
     Loading
  ---------------------------------- */
  if (loading) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "grid",
          placeContent: "center",
          gap: 12,
          color: "var(--color-pine-shadow)",
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          letterSpacing: ".05em",
          textTransform: "uppercase",
        }}
      >
        <span
          style={{
            width: 10,
            height: 10,
            margin: "auto",
            display: "block",
            borderRadius: "50%",
            background: "var(--color-deep-teal)",
          }}
        />

        Loading the research archive
      </div>
    );
  }

  return (
    <div style={styles.page}>

      {/* Background */}
      <div
        aria-hidden="true"
        style={styles.background}
      >
        <Topography
          lowColor="#5227FF"
          midColor="#FF9FFC"
          highColor="#FFFFFF"
          speed={0.35}
          morphAmount={3}
          morphSpeed={0.05}
          bands={2}
          thickness={0.01}
          scale={2}
          pixelSize={1}
          glow={0.5}
          colorMode="elevation"
          contrast={3}
          brightness={1}
          fillBands={false}
          opacity={0.35}
          grain
          grainIntensity={0.05}
          mouseInteraction
          mouseRadius={0.3}
          mouseStrength={0.4}
        />
      </div>

      {/* Hero */}
      <div
        style={{
          ...styles.hero,
          ...styles.width,
        }}
      >
        <div style={styles.heroCopy}>

          <p
            style={{
              margin: 0,
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: ".059em",
              textTransform: "uppercase",
              color: "var(--color-pine-shadow)",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                flex: "0 0 auto",
                display: "inline-block",
                borderRadius: "50%",
                background: "var(--color-sage)",
              }}
            />

            Message
          </p>

          <br />

          <div style={styles.title}>
            The Research and Consultancy <br />
            Cell{" "}
            <em
              style={{
                color: "var(--color-deep-teal)",
                fontStyle: "italic",
              }}
            >
              (R&amp;C)
            </em>
          </div>

          <br />

          <p
            style={{
              ...styles.lede,
              ...styles.statStrip,
              width: "100%",
            }}
          >
            At Shri Ramswaroop Memorial University
            (SRMU) Barabanki, we believe that research
            and innovation are fundamental drivers of
            academic excellence, technological
            advancement, and societal progress. Our
            commitment is to cultivate a dynamic research
            ecosystem that empowers students, faculty
            members, and research scholars to transform
            ideas into impactful solutions.

            The University has established state-of-the-art
            research and innovation facilities, including
            the AI Center of Excellence, Virtual
            Instrumentation Laboratory, Cadence Design
            Laboratory, PCB design Lab, Centre of
            Excellence (EV Lab), and the Innovation &
            Incubation Hub, which provide a robust platform
            for experimentation, product development,
            entrepreneurship, and interdisciplinary research.

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              style={{
                marginTop: 0,
                padding: 0,
                border: 0,
                background: "transparent",
                color: "var(--color-deep-teal)",
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              VIEW MORE →
            </button>
          </p>

          <div style={styles.actions}>

            <button
              onClick={onSearchOpen}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: isSmallMobile
                  ? "center"
                  : "initial",
                gap: 8,
                background:
                  "var(--color-deep-teal)",
                color: "#fff",
                fontFamily: "var(--font-sans)",
                fontSize: 14,
                fontWeight: 500,
                padding: "12px 24px",
                border: 0,
                borderRadius:
                  "var(--radius-btn)",
                cursor: "pointer",
              }}
            >
              <Search size={17} />
              Search the archive
            </button>

            <Link
              to="/papers"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: isSmallMobile
                  ? "center"
                  : "initial",
                gap: 8,
                background: "transparent",
                color:
                  "var(--color-pine-shadow)",
                fontFamily: "var(--font-sans)",
                fontSize: 14,
                fontWeight: 500,
                padding: "11px 23px",
                border:
                  "1px solid var(--color-pine-shadow)",
                borderRadius:
                  "var(--radius-btn)",
                textDecoration: "none",
              }}
            >
              Browse publications
              <ArrowRight size={16} />
            </Link>

          </div>
        </div>

        {/* Morph Slider */}
        <div
          className="relative w-full min-w-0 mb-0 mt-20 grid place-items-center px-0 md:px-0"
          style={{
            alignSelf: "stretch",
          }}
        >
          <div
            className="w-full h-full mt-20"
            style={{
              width: "min(46vw, 860px)",
              marginRight: 0,
            }}
          >
            <div
              className="relative w-full aspect-[16/9] mt-20 py-0"
            >
              <MorphSlider
                items={sliderItems}
                transition="melt"
                intensity={0.4}
                aberration={0.35}
                drift={0.55}
                autoplay
                overlayColor="rgba(28, 93, 95, 0.12)"
                duration={0.9}
                ease="power2.inOut"
                scale={2.3}
                autoplayDelay={4}
                loop
                radius={29}
                fit="cover"
                showCaptions
                showControls
                showIndicators
              />
            </div>
          </div>
        </div>
      </div>

      {/* View More Modal */}
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
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              type="button"
              className="view-more-close"
              aria-label="Close modal"
              onClick={() =>
                setIsModalOpen(false)
              }
            >
              ✕
            </button>

            <div className="view-more-header">
              <h3 id="view-more-title">
                {activeProfileData.title}
              </h3>

              <p>
                {activeProfileData.designation}
              </p>
            </div>

            <div className="view-more-body">
              {activeProfileData.fullContent.map(
                (paragraph, index) => (
                  <p
                    key={`${activeProfileData.key}-${index}`}
                  >
                    {paragraph}
                  </p>
                )
              )}
            </div>
          </div>
        </div>
      )}

      {/* Statistics */}
      <section
        style={{
          ...styles.statStrip,
          ...styles.width,
        }}
      >
        <div style={styles.stat}>
          <strong style={styles.statValue}>
            {stats?.totalIndexed || 0}
          </strong>

          <span style={styles.statLabel}>
            Research Publications
          </span>
        </div>

        <i style={styles.divider} />

        <div style={styles.stat}>
          <strong style={styles.statValue}>
            {stats?.totalPapers || 0}
          </strong>

          <span style={styles.statLabel}>
            PATENTS
          </span>
        </div>

        <i style={styles.divider} />

        <div style={styles.stat}>
          <strong style={styles.statValue}>
            {stats?.totalBooks || 0}
          </strong>

          <span style={styles.statLabel}>
            BOOKS &amp; CHAPTERS
          </span>
        </div>

        <i style={styles.divider} />

        <div style={styles.stat}>
          <strong style={styles.statValue}>
            {stats?.totalResearchers || 0}+
          </strong>

          <span style={styles.statLabel}>
            RESEARCHERS
          </span>
        </div>
      </section>

      {/* Patrons */}
      <div style={styles.peopleSection}>
        <h1 style={styles.sectionTitle}>
          Patrons
        </h1>

        <div style={styles.peopleContainer}>
          <div style={styles.peopleGrid}>

            <div style={styles.person}>
              <img
                src="Images/pankaj-DsE5rnwQ.webp"
                alt="Er. Pankaj Agarwal"
                style={styles.personImage}
              />

              <h5 style={styles.personName}>
                Er. Pankaj Agarwal
              </h5>

              <p style={styles.personRole}>
                Chancellor
              </p>
            </div>

            <div style={styles.person}>
              <img
                src="Images/pooja_Agrawal.png"
                alt="Er. Pooja Agarwal"
                style={styles.personImage}
              />

              <h5 style={styles.personName}>
                Er. Pooja Agarwal
              </h5>

              <p style={styles.personRole}>
                Pro Chancellor
              </p>
            </div>

            <div
              style={{
                ...styles.person,
                gridColumn: isMobile
                  ? "1 / -1"
                  : "auto",
                justifySelf: isMobile
                  ? "center"
                  : "auto",
              }}
            >
              <img
                src="Images/vijaytiwari-DtLhXa4L.webp"
                alt="Prof. (Dr.) Vijay Tiwari"
                style={styles.personImage}
              />

              <h5 style={styles.personName}>
                Prof. (Dr.) Vijay Tiwari
              </h5>

              <p style={styles.personRole}>
                Vice Chancellor
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Co Patrons */}
      <div style={styles.peopleSection}>
        <h1 style={styles.sectionTitle}>
          Co Patrons
        </h1>

        <div style={styles.peopleContainer}>
          <div style={styles.peopleGrid}>

            <div style={styles.person}>
              <img
                src="Images/Hemendra-NSaxOOgS.webp"
                alt="Prof. (Dr.) Hemendra Sharma"
                style={styles.personImage}
              />

              <h5 style={styles.personName}>
                Prof. (Dr.) Hemendra Sharma
              </h5>

              <p style={styles.personRole}>
                Registrar
              </p>
            </div>

            <div style={styles.person}>
              <img
                src="Images/Nabeel-Ahmad.jpeg"
                alt="Nabeel Ahmad"
                style={styles.personImage}
              />

              <h5 style={styles.personName}>
                Prof. (Dr.) Nabeel Ahmad
              </h5>

              <p style={styles.personRole}>
                Director (Research)
              </p>
            </div>

            <div
              style={{
                ...styles.person,
                gridColumn: isMobile
                  ? "1 / -1"
                  : "auto",
                justifySelf: isMobile
                  ? "center"
                  : "auto",
              }}
            >
              <img
                src="Images/Alkesh_Agrawal.webp"
                alt="Prof. (Dr.) Alkesh Agrawal"
                style={styles.personImage}
              />

              <h5 style={styles.personName}>
                Prof. (Dr.) Alkesh Agrawal
              </h5>

              <p style={styles.personRole}>
                Deputy Director (Research)
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Institutes */}
      <section
        style={{
          ...styles.section,
          ...styles.width,
        }}
      >
        <div style={styles.heading}>
          <div>
            <p
              style={{
                margin: 0,
                fontFamily: "var(--font-mono)",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: ".059em",
                textTransform: "uppercase",
                color:
                  "var(--color-pine-shadow)",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 7,
                  height: 7,
                  marginRight: 8,
                  borderRadius: "50%",
                  background:
                    "var(--color-sage)",
                }}
              />

              RECENT NOTES
            </p>

            <h2 style={styles.headingTitle}>
              Research Publication / Patents /
              <span
                style={{
                  color:
                    "var(--color-deep-teal)",
                }}
              >
                Books &amp; Chapters from...
              </span>
            </h2>
          </div>

          <Link
            to="/papers"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              color:
                "var(--color-pine-shadow)",
              fontSize: 14,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            View all papers
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Institute Row 1 */}
        <div className="flex flex-col md:flex-row gap-4">
          {[
            {
              src: "Images/c1.webp",
              title: "Institute of Technology",
              text:
                "The Institute of Technology is committed to provide focused learning in the fields of engineering with an aim of creating human resources with knowledge and skills to contribute successfully to a complex world.",
              Department: "5 Departments",
            },
            {
              src: "Images/c2.jpg",
              title:
                "Institute of Biosciences and Technology",
              text:
                "Biotechnology encompasses the applications of understanding of the biological systems to improve human life by addressing challenges and issues facing agricultural sciences, medical sciences, food sciences, etc.",
              Department: "2 Departments",
            },
            {
              src: "Images/c3.webp",
              title:
                "Institute of Management, Commerce and Economics",
              text:
                "The Institute of Management, Commerce and Economics (IMCE) was started in the year 2012. IMCE seeks to be a trailblazer in management education through strong academic-industry collaboration for international alliances.",
              Department: "2 Departments",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="flex-1 p-2"
            >
              <ElectricBorder
                color="#94a3b8"
                speed={0.5}
                chaos={0.11}
                thickness={2}
                style={{
                  borderRadius: 18,
                  background:
                    "rgba(255,255,255,0.55)",
                  minHeight: 180,
                }}
              >
                <div style={{ padding: 20 }}>
                  <div>
                    <img
                      src={card.src}
                      alt={card.title}
                      style={{
                        width: "100%",
                        height: 180,
                        objectFit: "cover",
                        borderRadius: 12,
                      }}
                    />
                  </div>

                  <div
                    style={{
                      fontFamily:
                        "var(--font-mono)",
                      fontSize: 11,
                      letterSpacing: ".08em",
                      textTransform:
                        "uppercase",
                      color:
                        "var(--color-pine-shadow)",
                    }}
                  >
                    SRMU
                  </div>

                  <h3
                    style={{
                      margin: "12px 0 10px",
                      fontFamily:
                        "var(--font-serif)",
                      fontSize: 26,
                      color:
                        "var(--color-charcoal-navy)",
                    }}
                  >
                    {card.title}
                  </h3>

                  <p
                    style={{
                      margin: 0,
                      color:
                        "var(--color-slate-body)",
                      lineHeight: 1.6,
                      fontSize: 15,
                    }}
                  >
                    {card.text}
                  </p>

                  <p className="mt-2 text-sm font-semibold text-deep-teal bold">
                    {card.Department}
                  </p>
                </div>
              </ElectricBorder>
            </div>
          ))}
        </div>

        {/* Institute Row 2 */}
        <div className="flex flex-col md:flex-row gap-4">
          {[
            {
              src: "Images/c4.jpg",
              title: "Institute of Media Studies",
              text:
                "Journalism and Mass Communication study is an encouragement to think about the forces involved in giving it shape. Mass Media industry is one of the fastest growing industries with the mission of social conscience.",
              Department: "1 Department",
            },
            {
              src: "Images/c5.webp",
              title:
                "Institute of Natural Sciences and Humanities",
              text:
                "The Institute boasts of being the heart and soul of the University as its various disciplines of knowledge is essentially required with all the academic programs that run across the University.",
              Department: "4 Departments",
            },
            {
              src: "Images/c6.webp",
              title:
                "Institute of Pharmaceutical Sciences",
              text:
                "Due to its integration of chemistry and health sciences, pharmaceutical science is both a unique field and extremely important to human survival.",
              Department: "1 Department",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="flex-1 p-2"
            >
              <ElectricBorder
                color="#94a3b8"
                speed={0.5}
                chaos={0.11}
                thickness={2}
                style={{
                  borderRadius: 18,
                  background:
                    "rgba(255,255,255,0.55)",
                  minHeight: 180,
                }}
              >
                <div style={{ padding: 20 }}>
                  <div>
                    <img
                      src={card.src}
                      alt={card.title}
                      style={{
                        width: "100%",
                        height: 180,
                        objectFit: "cover",
                        borderRadius: 12,
                      }}
                    />
                  </div>

                  <div
                    style={{
                      fontFamily:
                        "var(--font-mono)",
                      fontSize: 11,
                      letterSpacing: ".08em",
                      textTransform:
                        "uppercase",
                      color:
                        "var(--color-pine-shadow)",
                    }}
                  >
                    SRMU
                  </div>

                  <h3
                    style={{
                      margin: "12px 0 10px",
                      fontFamily:
                        "var(--font-serif)",
                      fontSize: 26,
                      color:
                        "var(--color-charcoal-navy)",
                    }}
                  >
                    {card.title}
                  </h3>

                  <p
                    style={{
                      margin: 0,
                      color:
                        "var(--color-slate-body)",
                      lineHeight: 1.6,
                      fontSize: 15,
                    }}
                  >
                    {card.text}
                  </p>

                  <p className="mt-2 text-sm font-semibold text-deep-teal bold">
                    {card.Department}
                  </p>
                </div>
              </ElectricBorder>
            </div>
          ))}
        </div>

        {/* Institute Row 3 */}
        <div className="flex flex-col md:flex-row gap-4">
          {[
            {
              src: "Images/c7.webp",
              title:
                "Institute of Agricultural Sciences and Technology",
              text:
                "The Indian Council of Agricultural Sciences has already recognized the B.Sc.(Hons.) Agriculture 4 Years as a professional Degree with consequential benefits to the Students.",
              Department: "1 Department",
            },
            {
              src: "Images/c8.avif",
              title: "Institute of Legal Studies",
              text:
                "The Institute of Legal Studies is a convergence of academic, cultural and intellectual resources. It aims at achieving the highest levels of distinction in the innovation and transmission of knowledge and understanding.",
              Department: "1 Department",
            },
            {
              src: "Images/c9.webp",
              title: "Institute of Pharmacy",
              text:
                "Pharmacy is one of the unique professions and also very vital for the sustenance of human lives as it involves the combination of chemical science with health sciences.",
              Department: "1 Department",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="flex-1 p-2"
            >
              <ElectricBorder
                color="#94a3b8"
                speed={0.5}
                chaos={0.11}
                thickness={2}
                style={{
                  borderRadius: 18,
                  background:
                    "rgba(255,255,255,0.55)",
                  minHeight: 180,
                }}
              >
                <div
                  style={{ padding: 20 }}
                  className="mb-10"
                >
                  <div>
                    <img
                      src={card.src}
                      alt={card.title}
                      style={{
                        width: "100%",
                        height: 180,
                        objectFit: "cover",
                        borderRadius: 12,
                      }}
                    />
                  </div>

                  <div
                    style={{
                      fontFamily:
                        "var(--font-mono)",
                      fontSize: 11,
                      letterSpacing: ".08em",
                      textTransform:
                        "uppercase",
                      color:
                        "var(--color-pine-shadow)",
                    }}
                  >
                    SRMU
                  </div>

                  <h3
                    style={{
                      margin: "12px 0 10px",
                      fontFamily:
                        "var(--font-serif)",
                      fontSize: 26,
                      color:
                        "var(--color-charcoal-navy)",
                    }}
                  >
                    {card.title}
                  </h3>

                  <p
                    style={{
                      margin: 0,
                      color:
                        "var(--color-slate-body)",
                      lineHeight: 1.6,
                      fontSize: 15,
                    }}
                  >
                    {card.text}
                  </p>

                  <p className="mt-2 text-sm font-semibold text-deep-teal bold">
                    {card.Department}
                  </p>
                </div>
              </ElectricBorder>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;