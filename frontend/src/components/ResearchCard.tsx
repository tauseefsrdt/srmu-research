import React, { useEffect, useRef } from 'react';
import { Bookmark, Calendar, User, Building, ExternalLink, Loader2, Award } from 'lucide-react';
import { ResearchPaper } from '../types';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

interface PublicationCardProps {
  paper: ResearchPaper;
}

function PublicationCard({ paper }: PublicationCardProps) {
  return (
    <article className="card-mint research-card p-6 flex flex-col justify-between h-full rounded-2xl bg-white/90 border border-[#0A4A8F]/15 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
      <div className="flex-1 flex flex-col">
        <div className="research-card-label mb-3">
          <span
            className="eyebrow"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '4px 10px',
              background: 'rgba(10,74,143,.08)',
              border: '1px solid rgba(10,74,143,.14)',
              borderRadius: 100,
              fontSize: 11,
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
              color: 'var(--color-deep-teal)',
            }}
          >
            ● {paper.departmentKey || 'RESEARCH'}
          </span>
        </div>

        <h3 className="font-serif text-lg font-medium text-[#1F2937] leading-snug mb-3 group-hover:text-[#0A4A8F] transition-colors">
          {paper.title || 'Untitled research publication'}
        </h3>

        <div className="research-card-detail flex items-center gap-2 text-xs text-[#6B7280] mb-2 font-mono">
          <User size={13} className="text-[#FFB703] shrink-0" />
          <span className="line-clamp-1">{paper.authors || 'Author not available'}</span>
        </div>

        {paper.journal && (
          <div className="research-card-detail research-card-journal flex items-center gap-2 text-xs text-[#4B5563] mb-3 italic">
            <Building size={13} className="text-[#0A4A8F] shrink-0" />
            <span className="line-clamp-1">{paper.journal}</span>
          </div>
        )}

        <p className="research-card-abstract text-xs text-[#6B7280] leading-relaxed line-clamp-3 p-3 rounded-xl bg-[#F8FAFC] border border-[#0A4A8F]/08 mb-4">
          {paper.abstract || 'Publication details unavailable'}
        </p>
      </div>

      <div className="research-card-footer pt-3 border-t border-[#0A4A8F]/10 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-xs text-[#4B5563] font-mono">
          <Calendar size={13} className="text-[#FFB703]" />
          {paper.year || 'Year unavailable'}
        </span>
        {paper.doi ? (
          <Link
            to={`${paper.doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-[#0A4A8F]/20 hover:border-[#0A4A8F] hover:bg-[#EEF3FA] transition-all"
          >
            <span>View</span>
            <ExternalLink size={12} />
          </Link>
        ) : (
          <span className="text-xs text-[#9CA3AF] font-mono">ID: {paper.id}</span>
        )}
      </div>
    </article>
  );
}

interface ResearchCardProps {
  papers: ResearchPaper[];
  count: number;
  loading: boolean;
}

function ResearchCard({ papers, count, loading }: ResearchCardProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loading || !gridRef.current || papers.length === 0) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.research-card-item', {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power2.out',
      });
    }, gridRef);

    return () => ctx.revert();
  }, [loading, papers]);

  return (
    <>
      <div className="flex items-center justify-between mb-5 px-1">
        <div className="results-count-badge">
          <strong>{count}</strong>
          indexed publications
        </div>
        {loading && <Loader2 className="loader-on-theme animate-spin w-4 h-4 text-[#0A4A8F]" />}
      </div>

      {loading ? (
        <div className="empty-state min-h-[280px] flex flex-col items-center justify-center p-12 bg-white/60 rounded-2xl border border-[#0A4A8F]/10">
          <Loader2 className="loader-on-theme animate-spin w-8 h-8 text-[#0A4A8F] mb-3" />
          <p className="text-sm text-[#6B7280]">Loading indexed journals...</p>
        </div>
      ) : papers.length === 0 ? (
        <div className="empty-state min-h-[280px] flex flex-col items-center justify-center p-12 bg-white/60 rounded-2xl border border-[#0A4A8F]/10 text-center">
          <Bookmark className="w-10 h-10 text-[#9CA3AF] mb-3 stroke-[1.5]" />
          <p className="font-semibold text-[#1F2937]">No matching indexed journals found</p>
          <p className="text-xs text-[#6B7280] mt-1">Try refining your search terms or faculty filter</p>
        </div>
      ) : (
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 research-card-grid">
          {papers.map((paper) => (
            <div key={paper.id} className="research-card-item">
              <PublicationCard paper={paper} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default ResearchCard;
