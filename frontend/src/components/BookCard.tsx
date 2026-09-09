import React from 'react';
import { BookOpen, User, Building, Hash, BookmarkCheck } from 'lucide-react';
import { Book } from '../types';

interface BookCardProps {
  book: Book;
}

function BookCard({ book }: BookCardProps) {
  if (!book) return null;

  return (
    <div className="archive-card book-card flex flex-col justify-between h-full p-6 rounded-2xl bg-white/90 border border-[#0A4A8F]/15 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
      <div>
        {/* Top Tag */}
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
            <BookOpen className="w-3.5 h-3.5" />
            <span>Book / Chapter</span>
          </span>
          <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-full bg-[#FFF8E7] text-[#0C2F44] border border-[#FFB703]/30">
            {book.year}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif font-medium text-lg text-[#1F2937] leading-snug mb-3 mt-0 line-clamp-3 group-hover:text-[#0A4A8F] transition-colors">
          {book.title}
        </h3>

        {/* Author */}
        <div className="flex items-start gap-2 mb-2 font-mono text-xs text-[#6B7280]">
          <User size={13} className="text-[#FFB703] mt-0.5 shrink-0" />
          <div className="line-clamp-2">
            <span className="text-[#4B5563] font-semibold">Author(s): </span>
            {Array.isArray(book.authors) ? book.authors.join(', ') : book.authors}
          </div>
        </div>

        {/* Publisher */}
        {book.publisher && (
          <div className="flex items-start gap-2 mb-3 text-xs text-[#4B5563]">
            <Building size={13} className="text-[#0A4A8F] mt-0.5 shrink-0" />
            <span className="line-clamp-1">Publisher: <strong className="font-semibold text-[#1F2937]">{book.publisher}</strong></span>
          </div>
        )}

        {/* Abstract */}
        <p className="text-xs text-[#6B7280] leading-relaxed m-0 p-3 rounded-xl bg-[#F8FAFC] border border-[#0A4A8F]/08 line-clamp-3">
          {book.abstract}
        </p>
      </div>

      {/* Footer Details */}
      <div className="flex items-center justify-between pt-3.5 mt-4 border-t border-[#0A4A8F]/10 flex-wrap gap-2">
        {book.isbn ? (
          <span className="flex items-center gap-1 font-mono text-xs text-[#6B7280]">
            <Hash size={12} className="text-[#0A4A8F]" />
            <span>ISBN: {book.isbn}</span>
          </span>
        ) : (
          <span className="font-mono text-xs text-[#9CA3AF]">ISBN: N/A</span>
        )}

        <span className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-[#0A4A8F] bg-[#EEF3FA] px-2.5 py-1 rounded-full">
          <BookmarkCheck size={12} />
          <span>Published</span>
        </span>
      </div>
    </div>
  );
}

export default BookCard;
