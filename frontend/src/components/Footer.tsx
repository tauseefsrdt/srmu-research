import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ArrowUpRight } from 'lucide-react';

function Footer() {
  return (
    <footer className="footer1 relative text-white mt-auto overflow-hidden border-t-4 border-[#FFB703]" style={{
      backgroundImage: "url('https://srmu.ac.in/assets/footer-bg-IZe6NqR3.jpeg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      {/* Deep Navy Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A3C85]/95 via-[#0C2F44]/95 to-[#082233]/98 z-0" />

      <div className="max-w-[1240px] mx-auto px-6 py-14 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="md:col-span-1 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFB703] flex items-center justify-center shadow-lg shadow-[#FFB703]/25 shrink-0">
                <GraduationCap size={22} className="text-[#0C2F44]" />
              </div>
              <span className="font-serif font-semibold text-xl text-white tracking-tight">
                SRMU Research
              </span>
            </div>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed m-0">
              Shri Ramswaroop Memorial University Research &amp; Consultancy Cell, showcasing high impact research publications, patents, books and book chapters.
            </p>
          </div>

          {/* Explore */}
          <div className="flex flex-col gap-4">
            <div className="font-mono text-xs uppercase tracking-widest text-[#FFB703] font-semibold">
              Explore
            </div>
            <div className="flex flex-col gap-2.5">
              {[
                { label: 'Research Publications', to: '/research' },
                { label: 'Patents', to: '/patents' },
                { label: 'Books & Chapters', to: '/books' },
                { label: 'About', to: '/about' },
              ].map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="text-sm text-white/75 hover:text-white hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-1.5"
                >
                  <span>{l.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Institutes col 1 */}
          <div className="flex flex-col gap-4">
            <div className="font-mono text-xs uppercase tracking-widest text-[#FFB703] font-semibold">
              Institutes
            </div>
            <div className="flex flex-col gap-2.5 text-xs sm:text-sm text-white/75">
              <span>IoT (Institute of Technology)</span>
              <span>IBST (Institute of Biosciences and T...)</span>
              <span>IMCE (Institute of Management, Commerce and Economics)</span>
              <span>ILS (Institute of Legal Studies)</span>
              <span>IoP (Institute of Pharmacy)</span>
            </div>
          </div>

          {/* Institutes col 2 */}
          <div className="flex flex-col gap-4">
            <div className="font-mono text-xs uppercase tracking-widest text-[#FFB703] font-semibold">
              Institutes
            </div>
            <div className="flex flex-col gap-2.5 text-xs sm:text-sm text-white/75">
              <span>INSH (Institute of Natural Sciences and Humanities)</span>
              <span>IER (Institute of Education and Research)</span>
              <span>IMS (Institute of Medical Sciences)</span>
              <span>IAST (Institute of Agricultural Sciences and Technology)</span>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/15 pt-6 flex flex-wrap justify-between items-center gap-4 text-xs">
          <span className="text-white/65">
            © {new Date().getFullYear()} SRMU Research Portal. All rights reserved.
          </span>

        </div>
      </div>
    </footer>
  );
}

export default Footer;
