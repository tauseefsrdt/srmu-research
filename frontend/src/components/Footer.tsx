import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ArrowRight, BookOpen, FileText, Bookmark, Info, Sparkles } from 'lucide-react';

function Footer() {
  const exploreLinks = [
    { label: 'Research Publications', to: '/research', icon: Bookmark },
    { label: 'Patents', to: '/patents', icon: FileText },
    { label: 'Books & Chapters', to: '/books', icon: BookOpen },
    { label: 'About', to: '/about', icon: Info },
  ];

  const institutesCol1 = [
    { code: 'IoT', name: 'Institute of Technology' },
    { code: 'IBST', name: 'Institute of Biosciences and T...' },
    { code: 'IMCE', name: 'Institute of Management, Commerce and Economics' },
    { code: 'ILS', name: 'Institute of Legal Studies' },
    { code: 'IoP', name: 'Institute of Pharmacy' },
  ];

  const institutesCol2 = [
    { code: 'INSH', name: 'Institute of Natural Sciences and Humanities' },
    { code: 'IER', name: 'Institute of Education and Research' },
    { code: 'IMS', name: 'Institute of Medical Sciences' },
    { code: 'IAST', name: 'Institute of Agricultural Sciences and Technology' },
  ];

  return (
    <footer className="relative bg-[#06182E] text-white mt-auto overflow-hidden border-t-2 border-[#FFB703]/80">
      {/* Subtle Background Glows & Ambience */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FFB703] to-transparent opacity-60" />
      <div className="absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-[#0A4A8F]/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-[#FFB703]/10 blur-[140px] pointer-events-none" />

      {/* Subtle Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-[1240px] mx-auto px-6 pt-16 pb-12 relative z-10">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 mb-12">

          {/* Col 1: Brand & Overview (Span 4) */}
          <div className="md:col-span-4 flex flex-col justify-between">
            <div>
              {/* Brand Logo & Heading */}
              <Link to="/" className="inline-flex items-center gap-3.5 no-underline group mb-4">
                <div className="w-12 h-12 rounded-md bg-white border border-white/20 shadow-md p-1 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200">
                  <img src="/Images/IMG-20210904-WA0042.jpg" alt="SRMU Emblem" className="w-full h-full object-contain" />
                </div>
                <div className="flex flex-col font-sans font-black uppercase tracking-wide leading-[1.1]">
                  <span className="text-[16px] sm:text-[17px] font-extrabold text-white tracking-wide">
                    SRMU RESEARCH
                  </span>
                  <span className="text-[14px] sm:text-[15px] font-extrabold text-[#FFB703] tracking-wider">
                    &amp; CONSULTANCY
                  </span>
                </div>
              </Link>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-300/80 leading-relaxed max-w-sm mb-6">
                Shri Ramswaroop Memorial University Research &amp; Consultancy Cell, showcasing high impact research publications, patents, books and book chapters.
              </p>
            </div>

            {/* University Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 w-fit text-slate-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-[#FFB703] animate-pulse" />
              <span>Academic Research Portal</span>
            </div>
          </div>

          {/* Col 2: Explore Links (Span 2) */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-[#FFB703] rounded-full" />
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#FFB703] m-0">
                Explore
              </h4>
            </div>

            <div className="flex flex-col gap-2.5">
              {exploreLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-xs sm:text-sm text-slate-300 hover:text-[#FFB703] hover:translate-x-1.5 transition-all duration-200 inline-flex items-center gap-2 py-0.5 group"
                >
                  <ArrowRight size={12} className="text-[#FFB703]/70 group-hover:text-[#FFB703] transition-colors" />
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Col 3: Institutes Group 1 (Span 3) */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-[#FFB703] rounded-full" />
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#FFB703] m-0">
                Institutes
              </h4>
            </div>

            <div className="flex flex-col gap-2.5 text-xs sm:text-sm text-slate-300/80">
              {institutesCol1.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 group cursor-default">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFB703]/50 mt-1.5 shrink-0 group-hover:bg-[#FFB703] transition-colors" />
                  <span className="group-hover:text-white transition-colors leading-relaxed">
                    <strong className="text-slate-200 font-semibold">{item.code}</strong> ({item.name})
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Col 4: Institutes Group 2 (Span 3) */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-[#FFB703] rounded-full" />
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#FFB703] m-0">
                Institutes
              </h4>
            </div>

            <div className="flex flex-col gap-2.5 text-xs sm:text-sm text-slate-300/80">
              {institutesCol2.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 group cursor-default">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFB703]/50 mt-1.5 shrink-0 group-hover:bg-[#FFB703] transition-colors" />
                  <span className="group-hover:text-white transition-colors leading-relaxed">
                    <strong className="text-slate-200 font-semibold">{item.code}</strong> ({item.name})
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Credits */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <span className="text-slate-400 font-mono">
            &copy; {new Date().getFullYear()} SRMU Research Portal. All rights reserved.
          </span>


        </div>
      </div>
    </footer>
  );
}

export default Footer;
