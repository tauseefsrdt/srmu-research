import React from 'react';
import { BookOpen, User, Building, Hash } from 'lucide-react';

function BookCard({ book }) {
  if (!book) return null;

  return (
    <div className="archive-card book-card">

      <div>
        {/* Top Tag */}
        <div className="book-card-top">
          <span className="book-tag">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Book / Chapter</span>
          </span>
          <span className="year-tag">
            {book.year}
          </span>
        </div>

        {/* Title */}
        <h3>
          {book.title}
        </h3>

        {/* Author */}
        <div className="book-detail">
          <User />
          <div className="line-clamp-2">
            <span className="detail-label">Author(s): </span>
            {Array.isArray(book.authors) ? book.authors.join(', ') : book.authors}
          </div>
        </div>

        {/* Publisher */}
        {book.publisher && (
          <div className="book-detail">
            <Building />
            <span>Publisher: <strong>{book.publisher}</strong></span>
          </div>
        )}

        {/* Abstract */}
        <p className="book-abstract">
          {book.abstract}
        </p>
      </div>

      {/* Footer Details */}
      <div className="book-card-footer">
        {book.isbn ? (
          <span className="isbn-tag">
            <Hash />
            <span>ISBN: {book.isbn}</span>
          </span>
        ) : (
          <span className="isbn-tag">ISBN: N/A</span>
        )}

        <span className="published-tag">
          Published
        </span>
      </div>

    </div>
  );
}

export default BookCard;
