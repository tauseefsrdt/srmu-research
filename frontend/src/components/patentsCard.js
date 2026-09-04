import React from 'react';
import { Calendar, User, Building, Quote, ExternalLink, Award } from 'lucide-react';

function PaperCard({ paper }) {
  if (!paper) return null;

  const isPatent = Boolean(paper.patenterName || paper.patentNumber || paper.yearOfAward);
  const authors = isPatent ? paper.patenterName : paper.authors;
  const year = isPatent ? paper.yearOfAward : paper.year;
  const details = isPatent ? paper.title : paper.abstract;

  return (
    <div
      className="card-mint flex flex-col justify-between"
      style={{ padding: 24, transition: 'border-color 0.2s', cursor: 'default', height: '100%' }}
    >
      {/* Top */}
      <div>
        {/* Eyebrow & featured */}
        <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
          <span className="eyebrow" style={{ fontSize: 11, color: 'var(--color-pine-shadow)' }}>
            ● {isPatent ? 'PATENT' : paper.departmentKey?.slice(0, 28) || 'RESEARCH'}
          </span>
          {paper.featured && (
            <span
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                background: 'var(--color-blush-sand)', color: 'var(--color-charcoal-navy)',
                border: '1px solid var(--color-dusty-rose)', borderRadius: 100,
                fontSize: 11, fontWeight: 600, padding: '3px 10px',
                fontFamily: 'var(--font-mono)', letterSpacing: '0.04em',
              }}
            >
              <Award size={11} /> FEATURED
            </span>

          )}
        </div>

        {isPatent && (
          <div className="flex items-start gap-2 mb-3">
            <User size={13} color="var(--color-sage)" style={{ marginTop: 2, flexShrink: 0 }} />
            <p
              style={{ fontSize: '1.2rem', color: 'var(--color-charcoal-navy)', lineHeight: 1.1, margin: 0, fontWeight: 700 }}
              className="line-clamp-2 "
            >
              {authors}
            </p>
          </div>
        )}

        {/* Title */}
        <h3
          style={{
            fontFamily: 'var(--font-serif)', fontWeight: 500, fontSize: 18,
            color: 'var(--color-charcoal-navy)', lineHeight: 1.35,
            marginBottom: 12, marginTop: 0,
            display: '-webkit-box', WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}
        >
          {isPatent && (
            <span style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
              {paper.patentNumber}
            </span>
          )}
          {!isPatent && paper.title}
        </h3>

        {/* Authors */}
        {!isPatent && (
          <div className="flex items-start gap-2 mb-2">
            <User size={13} color="var(--color-sage)" style={{ marginTop: 2, flexShrink: 0 }} />
            <p style={{ fontSize: 13, color: 'var(--color-slate-body)', lineHeight: 1.4, margin: 0 }}
              className="line-clamp-2"
            >
              {Array.isArray(authors) ? authors.join(', ') : authors}
            </p>
          </div>
        )}

        {/* Journal */}
        {!isPatent && paper.journal && (
          <div className="flex items-start gap-2 mb-4">
            <Building size={13} color="var(--color-mint-mist)" style={{ marginTop: 2, flexShrink: 0 }} />
            <p style={{ fontSize: 12, color: 'var(--color-slate-body)', fontStyle: 'italic', margin: 0 }}
              className="line-clamp-1"
            >{paper.journal}</p>
          </div>
        )}

        {/* Abstract */}
        <p
          style={{
            fontSize: 13, color: 'var(--color-slate-body)', lineHeight: 1.55, margin: 0,
            background: '#fff', border: '1px solid var(--color-sea-foam)',
            borderRadius: 8, padding: '10px 12px',
            display: '-webkit-box', WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}
        >
          {details}
        </p>
      </div>

      {/* Footer */}
      <div
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderTop: '1px solid var(--color-sea-foam)', marginTop: 16, paddingTop: 14,
          flexWrap: 'wrap', gap: 8,
        }}
      >
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5" style={{ fontSize: 12, color: 'var(--color-charcoal-navy)' }}>
            <Calendar size={12} color="var(--color-sage)" />{year}
          </span>
          {paper.citations !== undefined && (
            <span className="flex items-center gap-1" style={{ fontSize: 12, color: 'var(--color-slate-body)' }}>
              <Quote size={12} color="var(--color-mint-mist)" />{paper.citations} Citations
            </span>
          )}
        </div>

        {paper.doi ? (
          <a
            href={paper.doi}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
            style={{ fontSize: 12, padding: '6px 14px' }}
          >
            View <ExternalLink size={11} />
          </a>
        ) : (
          <span style={{ fontSize: 11, color: 'var(--color-mint-mist)' }}>ID: {paper.id}</span>
        )}
      </div>
    </div>
  );
}

export default PaperCard;
