import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

function Footer() {
  return (
    <footer className='footer1' style={{
      backgroundImage: "linear-gradient(rgba(236, 240, 249, 0.85), rgba(236, 240, 249, 0.85)), url('https://srmu.ac.in/assets/footer-bg-IZe6NqR3.jpeg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      borderTop: '3px solid #FFB703',
      marginTop: 'auto',
    }}>
      <div style={{ maxWidth: '1200px' }} className="mx-auto px-6 py-12 z-[9999] relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">

          {/* Brand */}
          <div className="md:col-span-1 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div style={{ width: 34, height: 34, borderRadius: 9, background: 'var(--color-sage)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <GraduationCap size={18} color="var(--color-pine-shadow)" />
              </div>
              <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 500, fontSize: 16, color: '#ffffff' }}>
                SRMU Research
              </span>
            </div>
            <p style={{ fontSize: 13, color: '#fff', lineHeight: 1.6 }}>
              Shri Ramswaroop Memorial University Research & Consultancy Cell, showcasing high impact research publications, patents, books and book chapters.
            </p>
          </div>

          {/* Explore */}
          <div className="flex flex-col gap-4">
            <div className="eyebrow" style={{ fontSize: 12, color: 'var(--color-sage)' }}>Explore</div>
            <div className="flex flex-col gap-2.5">
              {[
                { label: 'Research Publications', to: '/research' },
                { label: 'Patents', to: '/patents' },
                { label: 'Books & Chapters', to: '/books' },
                { label: 'About', to: '/about' },
              ].map(l => (
                <Link key={l.to} to={l.to} style={{ fontSize: 14, color: '#fff', textDecoration: 'none' }}
                  className="hover:text-deep-teal transition-colors"
                >{l.label}</Link>
              ))}
            </div>
          </div>

          {/* Faculties */}
          <div className="flex flex-col gap-4">
            <div className="eyebrow" style={{ fontSize: 12, color: 'var(--color-sage)' }}>Institutes</div>
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm" style={{ color: '#fff' }}>
              <div style={{ width: '80%' }}><span>IoT (Institute of Technology)</span></div>
              <div style={{ width: '100%' }}><span>IBST (Institute of Biosciences and T...)</span></div>
              <div style={{ width: '90%' }}><span>IMCE (Institute of Management, Commerce and Economics)</span></div>
              <div style={{ width: '90%' }}><span>ILS (Institute of Legal Studies)</span></div>
              <div style={{ width: '90%' }}><span>IoP (Institute of Pharmacy)</span></div>


            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="eyebrow" style={{ fontSize: 12, color: 'var(--color-sage)' }}>Institutes</div>
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm" style={{ color: '#fff' }}>
              <div style={{ width: '100%' }}><span>INSH (Institute of Natural Sciences and Humanities)</span></div>
              <div style={{ width: '100%' }}><span>IER (Institute of Education and Research)</span></div>
              <div style={{ width: '100%' }}><span>IMS (Institute of Medical Sciences)</span></div>
              <div style={{ width: '120%' }}><span>IAST (Institute of Agricultural Sciences and Technology)</span></div>


            </div>



          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: 24, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: '#fff' }}>© {new Date().getFullYear()} SRMU Research Portal. All rights reserved.</span>
          <span className="eyebrow" style={{ fontSize: 11, color: '#D4AF37', letterSpacing: '0.04em' }}>
            Conceptualized by Prof. (Dr.) Alkesh Agrawal <br /> developed  by Mr. Mohit (B.Tech. EC-IV Yr)
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
