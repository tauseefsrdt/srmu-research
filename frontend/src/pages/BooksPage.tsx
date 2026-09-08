import React, { useState, useEffect } from 'react';
import { BookOpen, Search, RefreshCw, Loader2 } from 'lucide-react';
import BookCard from '../components/BookCard';
import { getBooks } from '../data/researchService';
import { Book } from '../types';

function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  useEffect(() => {
    setLoading(true);
    try {
      const data = getBooks({ search, year: selectedYear });
      setBooks(data.books || []);
      setCount(data.count || 0);
    } catch (err) {
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  }, [search, selectedYear]);

  const resetFilters = () => {
    setSearch('');
    setSelectedYear('');
  };

  return (
    <div className="archive-page home-width">
      
      {/* Header */}
      <div className="page-hero-copy">
        <div className="eyebrow"><span className="eyebrow-dot" />
          <BookOpen className="w-4 h-4" />
          <span>Academic Books & Chapters</span>
        </div>
        <h1>Books & <em>chapters.</em></h1>
        <p>
          Published books, edited volumes, and authored book chapters by university faculty.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="filter-bar">
        
        {/* Search Field */}
        <div className="filter-search">
          <Search />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search book title, author, publisher, ISBN..."
            className="archive-input"
          />
        </div>

        {/* Year Filter */}
        <div className="filter-select">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="archive-input"
          >
            <option value="">All Years</option>
            <option value="2026">2026</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
          </select>
        </div>

        {/* Reset */}
        {(search || selectedYear) && (
          <button
            onClick={resetFilters}
            className="btn-ghost reset-button"
          >
            <RefreshCw className="w-4 h-4 text-red-500" />
            <span>Reset</span>
          </button>
        )}

      </div>

      {/* Count */}
      <div className="results-meta">
        <span>Showing <strong>{count}</strong> books and chapters</span>
        {loading && <Loader2 className="spin-icon" />}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="empty-state">
          <Loader2 className="spin-icon large" />
          <p className="text-sm">Loading books...</p>
        </div>
      ) : books.length === 0 ? (
        <div className="empty-state">
          <BookOpen />
          <p>No matching books found</p>
        </div>
      ) : (
        <div className="archive-grid">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}

    </div>
  );
}

export default BooksPage;
