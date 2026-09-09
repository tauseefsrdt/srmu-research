import React from 'react';
import { Calendar, User, Building, Quote, ExternalLink, Award } from 'lucide-react';
import { Patent } from '../types';

interface PaperCardProps {
  paper: Patent | any;
}

function PaperCard({ paper }: PaperCardProps) {
  if (!paper) return null;

  const isPatent = Boolean(paper.patenterName || paper.patentNumber || paper.yearOfAward);
  const authors = isPatent ? paper.patenterName : paper.authors;
  const year = isPatent ? paper.yearOfAward : paper.year;
  const details = isPatent ? paper.title : paper.abstract;

  return (
    <div className="card-mint flex flex-col justify-between h-full p-6 rounded-2xl bg-white/90 border border-[#0A4A8F]/15 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
      {/* Top */}
      <div>
        {/* Eyebrow & featured */}
        <div className="flex items-center justify-between gap-2 mb-3.5 flex-wrap">
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: 'var(--color-deep-teal)',
              padding: '4px 10px',
              background: 'rgba(10,74,143,.08)',
              border: '1px solid rgba(10,74,143,.14)',
              borderRadius: 100,
            }}
          >
            ● {isPatent ? 'PATENT' : paper.departmentKey?.slice(0, 28) || 'RESEARCH'}
          </span>
          {paper.featured && (
            <span className="patent-featured-badge">
              <Award size={11} /> FEATURED
            </span>
          )}
        </div>

        {isPatent && (
          <div className="flex items-start gap-2 mb-2.5">
            <User size={14} className="text-[#FFB703] mt-0.5 shrink-0" />
            <p className="font-serif text-lg font-bold text-[#111827] leading-tight m-0 line-clamp-2">
              {authors}
            </p>
          </div>
        )}

        {/* Title */}
        <h3 className="font-serif font-medium text-lg text-[#1F2937] leading-snug mb-3 mt-0 line-clamp-3 group-hover:text-[#0A4A8F] transition-colors">
          {isPatent && (
            <span className="block font-mono text-xs font-semibold mb-1 text-[#0A4A8F]">
              {paper.patentNumber}
            </span>
          )}
          {!isPatent && paper.title}
        </h3>

        {/* Authors */}
        {!isPatent && (
          <div className="flex items-start gap-2 mb-2 font-mono text-xs text-[#6B7280]">
            <User size={13} className="text-[#FFB703] mt-0.5 shrink-0" />
            <p className="m-0 line-clamp-2">
              {Array.isArray(authors) ? authors.join(', ') : authors}
            </p>
          </div>
        )}

        {/* Journal */}
        {!isPatent && paper.journal && (
          <div className="flex items-start gap-2 mb-3 text-xs text-[#4B5563] italic">
            <Building size={13} className="text-[#0A4A8F] mt-0.5 shrink-0" />
            <p className="m-0 line-clamp-1">{paper.journal}</p>
          </div>
        )}

        {/* Abstract */}
        <p className="text-xs text-[#6B7280] leading-relaxed m-0 p-3 rounded-xl bg-[#F8FAFC] border border-[#0A4A8F]/08 line-clamp-3">
          {details}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3.5 mt-4 border-t border-[#0A4A8F]/10 flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-xs text-[#1F2937] font-mono">
            <Calendar size={12} className="text-[#FFB703]" />
            {year}
          </span>
          {paper.citations !== undefined && (
            <span className="flex items-center gap-1 text-xs text-[#6B7280] font-mono">
              <Quote size={12} className="text-[#0A4A8F]" />
              {paper.citations} Citations
            </span>
          )}
        </div>

        {paper.doi ? (
          <a
            href={paper.doi}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full border border-[#0A4A8F]/20 hover:border-[#0A4A8F] hover:bg-[#EEF3FA] transition-all"
          >
            <span>View</span>
            <ExternalLink size={11} />
          </a>
        ) : (
          <span className="text-xs text-[#9CA3AF] font-mono">ID: {paper.id}</span>
        )}
      </div>
    </div>
  );
}

export default PaperCard;
