import React, { useState, useEffect } from 'react';
import { BookOpen, Search, RefreshCw, Loader2 } from 'lucide-react';
import BookCard from '../components/BookCard';

function BooksPage() {
  const [books, setBooks] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  useEffect(() => {
    async function fetchBooks() {
      setLoading(true);
      try {
        const query = new URLSearchParams();
        if (search) query.append('search', search);
        if (selectedYear) query.append('year', selectedYear);

        const res = await fetch(`/api/books?${query.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setBooks((data.books || []).map((book) => ({
            ...book,
            id: book._id || book.slNo,
            title: book.paperTitle || book.bookOrChapterTitle || 'Untitled book or chapter',
            authors: book.teacherName,
            year: book.yearOfPublication,
            publisher: book.publisherName,
            abstract: book.bookOrChapterTitle,
            isbn: book.isbnIssn,
          })));
          setCount(data.count || 0);
        }
      } catch (err) {
        console.error('Error fetching books:', err);
      } finally {
        setLoading(false);
      }
    }

    const timer = setTimeout(fetchBooks, 300);
    return () => clearTimeout(timer);
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
