import { useState, useEffect, useRef } from "react";
import modelCardImg from "./model-card.png";
import lifecycleImg from "./lifecycle.png";
import navigatorImg from "./governance-navigator.png";

const COLORS = {
  primary: "#0664D0",
  primaryDark: "#0450A8",
  primaryLight: "#EBF2FD",
  accent: "#A32968",
  accentLight: "#F5E8EF",
  lightGray: "#E8EAED",
  midGray: "#6B7280",
  darkGray: "#374151",
  nearBlack: "#111827",
  white: "#FFFFFF",
  borderGray: "#D1D5DB",
  successGreen: "#047857",
};

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [ref, inView];
};

const FadeIn = ({ children, delay = 0, className = "" }) => {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

const NavBar = ({ activeSection }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { id: "opportunity", label: "The Opportunity" },
    { id: "credentials", label: "Credentials" },
    { id: "value", label: "Value Delivered" },
  ];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
      borderBottom: scrolled ? `1px solid ${COLORS.borderGray}` : "none",
      boxShadow: scrolled ? "0 1px 8px rgba(0,0,0,0.06)" : "none",
      transition: "all 0.3s ease",
      padding: "0 48px",
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 64,
      }}>
        <div style={{
          fontFamily: "Avenir, 'Avenir Next', 'Century Gothic', sans-serif",
          fontWeight: 800, fontSize: 16,
          color: scrolled ? COLORS.nearBlack : COLORS.white,
          letterSpacing: "0.02em",
        }}>
          SIERRA SHELL
        </div>
        <div style={{ display: "flex", gap: 32 }}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "Avenir, 'Avenir Next', 'Century Gothic', sans-serif",
                fontSize: 13, fontWeight: 500, letterSpacing: "0.04em",
                color: scrolled
                  ? (activeSection === item.id ? COLORS.primary : COLORS.darkGray)
                  : "rgba(255,255,255,0.9)",
                borderBottom: activeSection === item.id && scrolled
                  ? `2px solid ${COLORS.primary}` : "2px solid transparent",
                paddingBottom: 2,
                transition: "all 0.2s ease",
              }}
            >
              {item.label.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

const FLIP_CARDS = [
  {
    front: "I built our AI governance tools.",
    back: "I co-designed SAS's AI Navigator, the NIST AI RMF-based Trustworthy AI Life Cycle Workflow, and our patented Model Card. I know exactly how these tools work, where they excel, and where customers need more than our products can give them.",
  },
  {
    front: "I've studied why governance fails.",
    back: "My UCL Master's research, conducted in partnership with BSI, investigated the organizational hurdles that prevent companies from implementing AI governance. That's not theory — it's the exact friction our customers are experiencing right now.",
  },
  {
    front: "I already know our customers.",
    back: "I've organized in-depth interviews with SAS customers actively navigating governance challenges, synthesized their pain points, and translated those insights into product priorities. I'm not starting from zero.",
  },
  {
    front: "I can make it credible.",
    back: "Peer-reviewed publications, a BSI research report, and international conference presentations mean I can produce the thought leadership that positions SAS as the governance authority customers turn to first.",
  },
];

const FlipCard = ({ front, back, delay }) => {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      style={{
        perspective: 1000,
        height: 400,
        cursor: "default",
        animationDelay: `${delay}s`,
      }}
    >
      <div style={{
        position: "relative", width: "100%", height: "100%",
        transformStyle: "preserve-3d",
        transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        transition: "transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)",
      }}>
        {/* Front */}
        <div style={{
          position: "absolute", inset: 0,
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          background: COLORS.white,
          border: `1px solid ${COLORS.borderGray}`,
          borderTop: `3px solid ${COLORS.borderGray}`,
          borderRadius: 4,
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "28px 32px",
          boxShadow: "0 2px 12px rgba(6,100,208,0.07)",
        }}>
          <p style={{
            fontFamily: "Avenir, 'Avenir Next', 'Century Gothic', sans-serif",
            fontSize: 20, fontWeight: 800,
            color: COLORS.accent,
            margin: 0, lineHeight: 1.3,
            textAlign: "center",
            letterSpacing: "-0.01em",
          }}>{front}</p>
        </div>
        {/* Back */}
        <div style={{
          position: "absolute", inset: 0,
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
          background: COLORS.primary,
          borderRadius: 4,
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "28px 32px",
          boxShadow: "0 4px 20px rgba(6,100,208,0.25)",
        }}>
          <p style={{
            fontFamily: "Avenir, 'Avenir Next', 'Century Gothic', sans-serif",
            fontSize: 14, fontWeight: 400,
            color: "rgba(255,255,255,0.93)",
            margin: 0, lineHeight: 1.7,
            textAlign: "center",
          }}>{back}</p>
        </div>
      </div>
    </div>
  );
};

const Hero = () => (
  <section style={{
    background: `linear-gradient(135deg, ${COLORS.primaryDark} 0%, ${COLORS.primary} 60%, #1a7fd4 100%)`,
    display: "flex", flexDirection: "column", justifyContent: "center",
    padding: "100px 48px 72px",
    position: "relative", overflow: "hidden",
    minHeight: "100vh",
  }}>
    {/* Radial glow */}
    <div style={{
      position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
      backgroundImage: `radial-gradient(circle at 80% 20%, rgba(255,255,255,0.05) 0%, transparent 50%),
        radial-gradient(circle at 10% 80%, rgba(163,41,104,0.15) 0%, transparent 40%)`,
      pointerEvents: "none",
    }} />
    {/* Subtle gradient overlay */}
    <div style={{
      position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
      background: "linear-gradient(135deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0) 50%, rgba(255,255,255,0.08) 100%)",
      pointerEvents: "none",
    }} />

    <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", position: "relative" }}>

      {/* Label */}
      <div style={{
        display: "inline-block",
        background: "rgba(255,255,255,0.12)",
        border: "1px solid rgba(255,255,255,0.2)",
        borderRadius: 4,
        padding: "6px 14px",
        marginBottom: 28,
      }}>
        <span style={{
          fontFamily: "Avenir, 'Avenir Next', 'Century Gothic', sans-serif",
          fontSize: 11, fontWeight: 700, letterSpacing: "0.12em",
          color: "rgba(255,255,255,0.9)", textTransform: "uppercase",
        }}>
          Application, Senior AI Governance Advisor · SAS Institute
        </span>
      </div>

      {/* Name */}
      <h1 style={{
        fontFamily: "Avenir, 'Avenir Next', 'Century Gothic', sans-serif",
        fontSize: "clamp(40px, 6vw, 72px)",
        fontWeight: 900, lineHeight: 1.0,
        color: COLORS.white,
        margin: "0 0 12px",
        letterSpacing: "-0.02em",
      }}>
        Sierra Shell
      </h1>

      {/* Contact links */}
      <div style={{ display: "flex", gap: 20, marginBottom: 48, flexWrap: "wrap", alignItems: "center" }}>
        <a href="mailto:sierra.shell@sas.com" style={{
          fontFamily: "Avenir, 'Avenir Next', 'Century Gothic', sans-serif",
          fontSize: 13, color: "rgba(255,255,255,0.7)",
          textDecoration: "none", letterSpacing: "0.02em",
          transition: "color 0.2s",
        }}
          onMouseEnter={e => e.currentTarget.style.color = COLORS.white}
          onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}
        >
          ✉ sierra.shell@sas.com
        </a>
        <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 12 }}>·</span>
        <a href="https://linkedin.com/in/sierrashell/" target="_blank" rel="noreferrer" style={{
          fontFamily: "Avenir, 'Avenir Next', 'Century Gothic', sans-serif",
          fontSize: 13, color: "rgba(255,255,255,0.7)",
          textDecoration: "none", letterSpacing: "0.02em",
          transition: "color 0.2s",
        }}
          onMouseEnter={e => e.currentTarget.style.color = COLORS.white}
          onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}
        >
          LinkedIn →
        </a>
        <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 12 }}>·</span>
        <span style={{
          fontFamily: "Avenir, 'Avenir Next', 'Century Gothic', sans-serif",
          fontSize: 13, color: "rgba(255,255,255,0.7)",
        }}>(828) 230-8842</span>
      </div>

      {/* Divider */}
      <div style={{ width: 48, height: 2, background: "rgba(255,255,255,0.25)", borderRadius: 1, marginBottom: 40 }} />

      {/* Flip cards prompt */}
      <div style={{ marginBottom: 20 }}>
        <span style={{
          fontFamily: "Avenir, 'Avenir Next', 'Century Gothic', sans-serif",
          fontSize: 11, fontWeight: 600, letterSpacing: "0.1em",
          color: "rgba(255,255,255,0.45)", textTransform: "uppercase",
        }}>Hover to learn more</span>
      </div>

      {/* Flip cards grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 20,
      }}>
        {FLIP_CARDS.map((card, i) => (
          <FlipCard key={i} front={card.front} back={card.back} delay={i * 0.08} />
        ))}
      </div>

    </div>
  </section>
);

const SectionLabel = ({ children }) => (
  <div style={{
    display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16,
  }}>
    <div style={{ width: 24, height: 2, background: COLORS.accent, borderRadius: 1 }} />
    <span style={{
      fontFamily: "Avenir, 'Avenir Next', 'Century Gothic', sans-serif",
      fontSize: 11, fontWeight: 700, letterSpacing: "0.12em",
      color: COLORS.accent, textTransform: "uppercase",
    }}>{children}</span>
  </div>
);

const SectionTitle = ({ children }) => (
  <h2 style={{
    fontFamily: "Avenir, 'Avenir Next', 'Century Gothic', sans-serif",
    fontSize: "clamp(28px, 4vw, 40px)",
    fontWeight: 900, color: COLORS.nearBlack,
    margin: "0 0 48px", lineHeight: 1.15,
    letterSpacing: "-0.01em",
  }}>{children}</h2>
);

const OpportunitySection = () => (
  <section id="opportunity" style={{
    padding: "100px 48px",
    background: COLORS.white,
  }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <FadeIn>
        <SectionLabel>The Strategic Opportunity</SectionLabel>
        <SectionTitle>An expanding market. A growing need. A chance to guide customers and shape SAS's future.</SectionTitle>
      </FadeIn>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
        <FadeIn delay={0.1}>
          <p style={{
            fontFamily: "Avenir, 'Avenir Next', 'Century Gothic', sans-serif",
            fontSize: 17, lineHeight: 1.8, color: COLORS.darkGray,
            margin: 0, fontWeight: 400,
          }}>
            SAS customers seek to adopt and scale AI, yet face mounting governance requirements. As a trusted partner in Data and AI, SAS already provides a robust service: conducting readiness assessments to benchmark against applicable frameworks, facilitating governance workshops that translate regulatory requirements into actionable internal policies, and delivering tailored risk management guidance, some of which connects governance obligations directly to SAS product capabilities.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p style={{
            fontFamily: "Avenir, 'Avenir Next', 'Century Gothic', sans-serif",
            fontSize: 17, lineHeight: 1.8, color: COLORS.darkGray,
            margin: 0, fontWeight: 400,
          }}>
            <strong>I bring a complementary set of skills that could expand what this service delivers.</strong>
          </p>
          <p style={{
            fontFamily: "Avenir, 'Avenir Next', 'Century Gothic', sans-serif",
            fontSize: 17, lineHeight: 1.8, color: COLORS.darkGray,
            margin: "24px 0 0", fontWeight: 400,
          }}>
            My four years designing Trustworthy AI products at SAS means customer-facing advisory work builds on established credibility and deep product knowledge, allowing me to connect governance recommendations directly to what SAS tools actually do.
          </p>
          <p style={{
            fontFamily: "Avenir, 'Avenir Next', 'Century Gothic', sans-serif",
            fontSize: 17, lineHeight: 1.8, color: COLORS.darkGray,
            margin: "24px 0 0", fontWeight: 400,
          }}>
            My UCL Master's research, conducted in partnership with BSI, specifically investigated the organizational hurdles and disincentives that prevent companies from implementing AI governance mechanisms, which is exactly the friction our advisory service would help customers overcome.
          </p>
          <p style={{
            fontFamily: "Avenir, 'Avenir Next', 'Century Gothic', sans-serif",
            fontSize: 17, lineHeight: 1.8, color: COLORS.darkGray,
            margin: "24px 0 0", fontWeight: 400,
          }}>
            The customer engagement I've already conducted at SAS extends naturally to readiness assessments and workshop design, facilitation, and synthesis.
          </p>
          <p style={{
            fontFamily: "Avenir, 'Avenir Next', 'Century Gothic', sans-serif",
            fontSize: 17, lineHeight: 1.8, color: COLORS.darkGray,
            margin: "24px 0 0", fontWeight: 400,
          }}>
            My academic writing experience translates directly to the white papers and thought leadership that establish SAS as the governance authority customers turn to first.
          </p>
        </FadeIn>
      </div>
    </div>
  </section>
);

const CredentialCard = ({ title, items, delay }) => (
  <FadeIn delay={delay}>
    <div style={{
      background: COLORS.white,
      border: `1px solid ${COLORS.borderGray}`,
      borderRadius: 4,
      padding: "36px",
      height: "100%",
      transition: "box-shadow 0.2s, transform 0.2s",
    }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 32px rgba(6,100,208,0.1)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
    >
      <h3 style={{
        fontFamily: "Avenir, 'Avenir Next', 'Century Gothic', sans-serif",
        fontSize: 16, fontWeight: 800, color: COLORS.primary,
        margin: "0 0 24px", letterSpacing: "0.02em",
        textTransform: "uppercase",
      }}>{title}</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {items.map((item, i) => (
          <div key={i} style={{
            paddingBottom: i < items.length - 1 ? 20 : 0,
            borderBottom: i < items.length - 1 ? `1px solid ${COLORS.lightGray}` : "none",
          }}>
            <div style={{
              fontFamily: "Avenir, 'Avenir Next', 'Century Gothic', sans-serif",
              fontSize: 14, fontWeight: 700, color: COLORS.nearBlack,
              marginBottom: 4,
            }}>{item.title}</div>
            {item.meta && (
              <div style={{
                fontFamily: "Avenir, 'Avenir Next', 'Century Gothic', sans-serif",
                fontSize: 12, color: COLORS.accent, fontWeight: 600,
                marginBottom: 6, letterSpacing: "0.04em",
              }}>{item.meta}</div>
            )}
            <div style={{
              fontFamily: "Avenir, 'Avenir Next', 'Century Gothic', sans-serif",
              fontSize: 13, color: COLORS.midGray, lineHeight: 1.6,
            }}>{item.desc}</div>
            {item.link && (
              <a href={item.link} target="_blank" rel="noreferrer" style={{
                display: "inline-block", marginTop: 8,
                fontFamily: "Avenir, 'Avenir Next', 'Century Gothic', sans-serif",
                fontSize: 12, fontWeight: 700, color: COLORS.primary,
                textDecoration: "none", letterSpacing: "0.04em",
                borderBottom: `1px solid ${COLORS.primaryLight}`,
                paddingBottom: 2,
                transition: "color 0.2s, border-color 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.color = COLORS.primaryDark; e.currentTarget.style.borderColor = COLORS.primary; }}
                onMouseLeave={e => { e.currentTarget.style.color = COLORS.primary; e.currentTarget.style.borderColor = COLORS.primaryLight; }}
              >
                {item.linkLabel || "Read More →"}
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  </FadeIn>
);

const ProjectCard = ({ image, title, meta, summary, link, delay }) => (
  <FadeIn delay={delay}>
    <div style={{
      background: COLORS.white,
      border: `1px solid ${COLORS.borderGray}`,
      borderRadius: 4,
      overflow: "hidden",
      transition: "box-shadow 0.2s, transform 0.2s",
    }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 32px rgba(6,100,208,0.1)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
    >
      {/* Image */}
      <div style={{
        width: "100%", height: 180, overflow: "hidden",
        background: COLORS.lightGray,
        borderBottom: `1px solid ${COLORS.borderGray}`,
      }}>
        <img
          src={image}
          alt={title}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
        />
      </div>
      {/* Content */}
      <div style={{ padding: "24px" }}>
        <div style={{
          fontFamily: "Avenir, 'Avenir Next', 'Century Gothic', sans-serif",
          fontSize: 12, color: COLORS.accent, fontWeight: 600,
          marginBottom: 6, letterSpacing: "0.04em",
        }}>{meta}</div>
        <div style={{
          fontFamily: "Avenir, 'Avenir Next', 'Century Gothic', sans-serif",
          fontSize: 15, fontWeight: 700, color: COLORS.nearBlack,
          marginBottom: 10,
        }}>{title}</div>
        <p style={{
          fontFamily: "Avenir, 'Avenir Next', 'Century Gothic', sans-serif",
          fontSize: 13, color: COLORS.midGray, lineHeight: 1.65,
          margin: "0 0 16px",
        }}>{summary}</p>
        {link && (
          <a href={link} target="_blank" rel="noreferrer" style={{
            fontFamily: "Avenir, 'Avenir Next', 'Century Gothic', sans-serif",
            fontSize: 12, fontWeight: 700, color: COLORS.primary,
            textDecoration: "none", letterSpacing: "0.04em",
            display: "inline-flex", alignItems: "center", gap: 4,
            borderBottom: `1px solid ${COLORS.primaryLight}`,
            paddingBottom: 2,
            transition: "color 0.2s, border-color 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.color = COLORS.primaryDark; e.currentTarget.style.borderColor = COLORS.primary; }}
            onMouseLeave={e => { e.currentTarget.style.color = COLORS.primary; e.currentTarget.style.borderColor = COLORS.primaryLight; }}
          >
            View Project →
          </a>
        )}
      </div>
    </div>
  </FadeIn>
);

const CredentialsSection = () => (
  <section id="credentials" style={{
    padding: "100px 48px",
    background: COLORS.lightGray,
  }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <FadeIn>
        <SectionLabel>What I Bring</SectionLabel>
        <SectionTitle>Three Pillars of Experience</SectionTitle>
      </FadeIn>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
        <CredentialCard
          delay={0.1}
          title="Governance Foundation"
          items={[
            {
              title: "Master's in Digital Technology & Public Policy",
              meta: "UCL · 2021–2022",
              desc: "MPA in Science, Technology, Engineering, and Public Policy with focus on AI governance, risk management, and international regulation.",
            },
            {
              title: "Research Associate, UCL/BSI Partnership",
              meta: "March–November 2022",
              desc: "Led interviews with 29 experts from British and global standards bodies, private sector, and UK regulators. Created a workshop utilizing horizon scanning to forecast future AI governance needs.",
            },
            {
              title: "Published Research",
              meta: "UCL/BSI Report, August 2022",
              desc: "\"Looking Ahead: The Role of Standards in the Future of AI Governance.\" Identified lack of common AI risk language, fragmented regulatory landscape, and absence of procedural guidance as key barriers.",
              link: "https://www.ucl.ac.uk/engineering/sites/engineering/files/looking_ahead_the_role_of_standards_in_the_future_of_ai_governance_v2.0.pdf",
              linkLabel: "Read Report →",
            },
            {
              title: " ",
              meta: "March 2022",
              desc: "Used systematic, replicable research methods to define a taxonomy of Explainability strategies for decision systems that could be utilized by organizations.",
              link: "https://docs.google.com/document/d/1lDqsW-NtLGMjrBYLFZrxxgqxvcTuEJip/edit?usp=sharing&ouid=105412725261749834300&rtpof=true&sd=true",
              linkLabel: "Read Paper →",
            },
          ]}
        />
        <CredentialCard
          delay={0.2}
          title="Product & Customer Research"
          items={[
            {
              title: "SAS AI Navigator",
              meta: "Co-Designer",
              desc: "Led design of assessment documentation, data governance, and policy creation features for the company's primary AI governance solution.",
            },
            {
              title: "NIST AI RMF-Based Trustworthy AI Workflow",
              meta: "Co-Designer",
              desc: "Actionable, step-by-step governance framework explicitly based on the NIST AI Risk Management Framework. The workflow is provided in Workflow Manager and publicly accessible via GitHub, a perfect tool for many SAS customers.",
            },
            {
              title: "Model Card Patent",
              meta: "Inventor",
              desc: "A digestible report card operationalizing model health and bias metrics, rendering AI adoption transparent and model ethics measurable.",
            },
            {
              title: "Customer Governance Research",
              meta: "In-depth interviews + synthesis",
              desc: "Conducted interviews with SAS customers actively seeking governance solutions. Systematic tagging, synthesis, and pain point analysis that drove product feature prioritization.",
            },
          ]}
        />
        <CredentialCard
          delay={0.3}
          title="Thought Leadership"
          items={[
            {
              title: "Peer-Reviewed Publication",
              meta: "Visible Language · May 2025",
              desc: "\"The Human Touch(point): Recommendations for Thoughtful AI Feature Design.\" Argues friction is a beneficial design element when creating AI tools and features.",
              link: "https://www.visible-language.org/journal/issue-59-2-dfi-the-human-touchpoint-recommendations-for-thoughtful-ai-feature-design/",
              linkLabel: "Read Article →",
            },
            {
              title: "Guest Lecturer, NC State University",
              meta: "Master's-level students",
              desc: "Gave a lecture to graduate students of design, focusing on maintaining human expertise and agency when working with and implementing AI tools.",
            },
            {
              title: "Ethical Design Program Founder",
              meta: "SAS · 2021",
              desc: "Initiated SAS's Ethical Design effort. Facilitated workshops with 18 participants generating 60+ actionable improvements.",
            },
            {
              title: "Speaking Engagements and Conference Presentations",
              meta: "SAS User Groups · IEEE InfoVis",
              desc: "Multiple presentations demonstrating ability to communicate technical concepts to practitioner and research audiences internationally.",
            },
          ]}
        />
      </div>

      {/* Project Cards */}
      <FadeIn delay={0.2}>
        <h3 style={{
          fontFamily: "Avenir, 'Avenir Next', 'Century Gothic', sans-serif",
          fontSize: 13, fontWeight: 700, letterSpacing: "0.1em",
          color: COLORS.primary, textTransform: "uppercase",
          margin: "56px 0 24px",
        }}>Featured Projects</h3>
      </FadeIn>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
        <ProjectCard
          delay={0.1}
          image={navigatorImg}
          title="SAS AI Navigator"
          meta="Co-Designer · Launching 2026"
          summary="A unified, holistic AI governance solution capable of aggregating, orchestrating, and monitoring AI systems, models, and agents. Designed for the executive, but useful enough for the data scientist — aligning AI with policies and helping organizations navigate their AI journeys confidently."
        />
        <ProjectCard
          delay={0.2}
          image={lifecycleImg}
          title="Trustworthy AI Life Cycle Workflow"
          meta="Co-Designer · NIST AI RMF-Based"
          summary="Outlines steps for evaluating and deploying a more trustworthy AI system. Makes NIST's recommendations, standards, and best practices for AI risk management easier to adopt and follow in practice."
          link="https://sassoftware.github.io/sas-trustworthy-ai-life-cycle/"
        />
        <ProjectCard
          delay={0.3}
          image={modelCardImg}
          title="Proprietary Model Card"
          meta="Inventor · Patent Holder"
          summary="Designed like a nutrition label for AI models, the SAS Model Card uses descriptive visuals to make model transparency accessible to all personas — from data scientists to executives. SAS presented this design before the US Congress."
        />
      </div>
    </div>
  </section>
);

const ValueSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    {
      label: "Customer Advisory",
      sublabel: "Revenue & Retention",
      color: COLORS.primary,
      services: [
        {
          title: "Governance Readiness Assessments",
          tag: "Billable Service",
          desc: "Structured assessments for customers facing regulatory deadlines. Identify gaps, create implementation roadmaps, and naturally position SAS products as solutions.",
        },
        {
          title: "Implementation Workshops",
          tag: "Customer Retention",
          desc: "Hands-on sessions mapping customer governance needs to SAS capabilities — demonstrating value beyond the sale, ensuring successful adoption, reducing churn.",
        },
        {
          title: "Compliance Quick-Starts",
          tag: "Product Acceleration",
          desc: "Rapid-start programs showing customers how to achieve specific compliance milestones using SAS tools — compressing time-to-value and creating urgency for product adoption.",
        },
        {
          title: "Executive Governance Briefings",
          tag: "Expansion Sales",
          desc: "Board-level presentations on AI risk landscape — positioning SAS as strategic advisor and opening enterprise-wide governance conversations.",
        },
      ],
    },
    {
      label: "Thought Leadership",
      sublabel: "Market Positioning",
      color: COLORS.accent,
      services: [
        {
          title: "White Papers & Research Reports",
          tag: "Lead Generation",
          desc: "Authoritative white papers on governance implementation, regulatory landscape analysis, and industry-specific best practices — gated content generating qualified leads.",
        },
        {
          title: "Industry Conference Speaking",
          tag: "Brand Credibility",
          desc: "Present at AI governance conferences, regulatory forums, and industry events — building credibility that generates inbound customer inquiries.",
        },
        {
          title: "Webinar Series",
          tag: "Prospect Nurturing",
          desc: "Monthly governance webinars on emerging regulations and implementation frameworks — building prospect audience while nurturing customer relationships.",
        },
        {
          title: "Standards Body Representation",
          tag: "Early Insight",
          desc: "Continue BSI/ISO involvement representing SAS — early regulatory insight and positioning as contributor, not observer.",
        },
      ],
    },
    {
      label: "Product Integration",
      sublabel: "Adoption Acceleration",
      color: "#047857",
      services: [
        {
          title: "Framework Mapping Services",
          tag: "Compliance Value",
          desc: "Show customers exactly how SAS Trustworthy AI products map to NIST AI RMF, ISO 42001, and EU AI Act — demonstrating concrete compliance value.",
        },
        {
          title: "Gap Analysis & Roadmapping",
          tag: "Trust Building",
          desc: "Identify where customers need complementary solutions beyond SAS products — building trust through authentic guidance while positioning SAS tools where they excel.",
        },
        {
          title: "Product Feedback Loop",
          tag: "Roadmap Influence",
          desc: "Channel customer governance requirements to product teams — informing roadmap priorities with real market needs.",
        },
        {
          title: "Internal Governance Excellence",
          tag: "Authenticity",
          desc: "Support SAS's own AI governance program, ensuring we practice what we preach and can speak authentically about implementation challenges.",
        },
      ],
    },
  ];

  return (
    <section id="value" style={{ padding: "100px 48px", background: COLORS.white }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <SectionLabel>How I'll Deliver Value</SectionLabel>
          <SectionTitle>Revenue-driving activities across three pillars.</SectionTitle>
        </FadeIn>

        {/* Tab buttons */}
        <div style={{ display: "flex", gap: 0, marginBottom: 40, borderBottom: `1px solid ${COLORS.borderGray}` }}>
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                padding: "16px 32px",
                fontFamily: "Avenir, 'Avenir Next', 'Century Gothic', sans-serif",
                fontWeight: activeTab === i ? 800 : 500,
                fontSize: 14,
                color: activeTab === i ? tab.color : COLORS.midGray,
                borderBottom: activeTab === i ? `3px solid ${tab.color}` : "3px solid transparent",
                marginBottom: -1,
                transition: "all 0.2s",
                textAlign: "left",
              }}
            >
              <div>{tab.label}</div>
              <div style={{ fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", opacity: 0.7, marginTop: 2 }}>
                {tab.sublabel}
              </div>
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
          {tabs[activeTab].services.map((service, i) => (
            <div
              key={i}
              style={{
                padding: "28px",
                background: COLORS.white,
                border: `1px solid ${COLORS.borderGray}`,
                borderRadius: 4,
                borderTop: `3px solid ${tabs[activeTab].color}`,
                animation: "fadeUp 0.4s ease",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div style={{
                  fontFamily: "Avenir, 'Avenir Next', 'Century Gothic', sans-serif",
                  fontSize: 15, fontWeight: 700, color: COLORS.nearBlack,
                  flex: 1, paddingRight: 16,
                }}>{service.title}</div>
                <span style={{
                  fontFamily: "Avenir, 'Avenir Next', 'Century Gothic', sans-serif",
                  fontSize: 10, fontWeight: 700, letterSpacing: "0.08em",
                  color: tabs[activeTab].color,
                  background: `${tabs[activeTab].color}15`,
                  padding: "3px 8px", borderRadius: 2,
                  textTransform: "uppercase", whiteSpace: "nowrap",
                }}>{service.tag}</span>
              </div>
              <p style={{
                fontFamily: "Avenir, 'Avenir Next', 'Century Gothic', sans-serif",
                fontSize: 14, color: COLORS.midGray, lineHeight: 1.65,
                margin: 0,
              }}>{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};



const ClosingSection = () => (
  <section style={{ padding: "100px 48px", background: COLORS.primary }}>
    <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
      <FadeIn>
        <div style={{
          width: 48, height: 2, background: "rgba(255,255,255,0.4)",
          margin: "0 auto 40px",
        }} />
        <p style={{
          fontFamily: "Avenir, 'Avenir Next', 'Century Gothic', sans-serif",
          fontSize: "clamp(18px, 2.5vw, 24px)",
          lineHeight: 1.7, color: "rgba(255,255,255,0.9)",
          margin: "0 0 48px", fontWeight: 300,
          fontStyle: "italic",
        }}>
          "This role is an opportunity to contribute meaningfully to something SAS has already built well — bringing a complementary perspective that spans governance research, product design, and direct customer insight. I bring three things that are hard to find together: deep SAS product and customer knowledge, formal governance credentials exploring why implementation fails in practice, and proven ability to bridge technical and non-technical stakeholders. I'm ready to collaborate, contribute, and help take this work further."
        </p>
        <p style={{
          fontFamily: "Avenir, 'Avenir Next', 'Century Gothic', sans-serif",
          fontSize: 18, fontWeight: 700, color: COLORS.white,
          margin: "0 0 8px",
        }}>Sierra Shell</p>
        <p style={{
          fontFamily: "Avenir, 'Avenir Next', 'Century Gothic', sans-serif",
          fontSize: 14, color: "rgba(255,255,255,0.7)", margin: "0 0 40px",
        }}>
          sierra.shell@sas.com · (828) 230-8842 · linkedin.com/in/sierrashell/
        </p>
        <a href="mailto:sierra.shell@sas.com" style={{
          display: "inline-block",
          background: COLORS.white, color: COLORS.primary,
          padding: "14px 32px", borderRadius: 4,
          fontFamily: "Avenir, 'Avenir Next', 'Century Gothic', sans-serif",
          fontSize: 14, fontWeight: 800, textDecoration: "none",
          letterSpacing: "0.06em", textTransform: "uppercase",
        }}>
          Get In Touch
        </a>
      </FadeIn>
    </div>
  </section>
);

const Footer = () => (
  <footer style={{
    padding: "24px 48px",
    background: COLORS.nearBlack,
    borderTop: `1px solid rgba(255,255,255,0.06)`,
  }}>
    <div style={{
      maxWidth: 1200, margin: "0 auto",
      display: "flex", justifyContent: "space-between", alignItems: "center",
    }}>
      <span style={{
        fontFamily: "Avenir, 'Avenir Next', 'Century Gothic', sans-serif",
        fontSize: 12, color: "rgba(255,255,255,0.3)",
      }}>Sierra Shell · Senior AI Governance Advisor · SAS Institute</span>
      <span style={{
        fontFamily: "Avenir, 'Avenir Next', 'Century Gothic', sans-serif",
        fontSize: 12, color: "rgba(255,255,255,0.3)",
      }}>Application · 2025</span>
    </div>
  </footer>
);

export default function App() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = ["opportunity", "credentials", "value"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ fontFamily: "Avenir, 'Avenir Next', 'Century Gothic', sans-serif" }}>
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; padding: 0; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #f1f1f1; }
        ::-webkit-scrollbar-thumb { background: ${COLORS.primary}; border-radius: 3px; }
      `}</style>
      <NavBar activeSection={activeSection} />
      <Hero />
      <OpportunitySection />
      <CredentialsSection />
      <ValueSection />
      <ClosingSection />
      <Footer />
    </div>
  );
}