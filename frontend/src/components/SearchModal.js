import React, { useState, useEffect } from 'react';
import { Search, X, FileText, Bookmark, BookOpen, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ papers: [], indexed: [], books: [], total: 0 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults({ papers: [], indexed: [], books: [], total: 0 });
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data);
        }
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="search-overlay">
      <div className="search-modal">
        
        {/* Search Header Input */}
        <div className="search-modal-bar">
          <Search className="search-modal-icon" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search papers, patents, authors, journals, ISBN..."
            className="search-modal-input"
            autoFocus
          />
          {loading && <Loader2 className="search-modal-loader" />}
          <button
            onClick={onClose}
            className="search-modal-close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="search-modal-results">
          {!query.trim() ? (
            <div className="text-center py-12 text-zinc-500">
              <Search className="w-12 h-12 mx-auto mb-3 text-zinc-700 stroke-[1.5]" />
              <p className="text-sm">Type keywords above to search through all research data</p>
              <p className="text-xs text-zinc-600 mt-1">Try searching: "AI", "Microstrip Antenna", "Biometric", "Patents"</p>
            </div>
          ) : results.total === 0 && !loading ? (
            <div className="text-center py-12 text-zinc-500">
              <p className="text-base font-semibold text-zinc-300">No research publications found</p>
              <p className="text-xs text-zinc-500 mt-1">Try adjusting your search terms</p>
            </div>
          ) : (
            <>
              {/* Research Papers Section */}
              {results.papers?.length > 0 && (
                <div>
                  <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-red-400 mb-3">
                    <FileText className="w-4 h-4" />
                    <span>Research Papers ({results.papers.length})</span>
                  </div>
                  <div className="space-y-2">
                    {results.papers.map((paper) => (
                      <Link
                        key={paper.id}
                        to="/papers"
                        onClick={onClose}
                        className="block p-3 rounded-xl bg-zinc-950/60 hover:bg-red-950/30 border border-zinc-900 hover:border-red-600/40 transition-all group"
                      >
                        <h4 className="text-sm font-semibold text-white group-hover:text-red-400 line-clamp-1">{paper.title}</h4>
                        <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5">Authors: {Array.isArray(paper.authors) ? paper.authors.join(', ') : paper.authors}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Indexed Journals Section */}
              {results.indexed?.length > 0 && (
                <div>
                  <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-rose-400 mb-3">
                    <Bookmark className="w-4 h-4" />
                    <span>Indexed Publications ({results.indexed.length})</span>
                  </div>
                  <div className="space-y-2">
                    {results.indexed.map((item) => (
                      <Link
                        key={item.id}
                        to="/indexed"
                        onClick={onClose}
                        className="block p-3 rounded-xl bg-zinc-950/60 hover:bg-rose-950/30 border border-zinc-900 hover:border-rose-600/40 transition-all group"
                      >
                        <h4 className="text-sm font-semibold text-white group-hover:text-rose-400 line-clamp-1">{item.title}</h4>
                        <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5">{item.journal} ({item.year})</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Books Section */}
              {results.books?.length > 0 && (
                <div>
                  <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-red-500 mb-3">
                    <BookOpen className="w-4 h-4" />
                    <span>Books & Chapters ({results.books.length})</span>
                  </div>
                  <div className="space-y-2">
                    {results.books.map((book) => (
                      <Link
                        key={book.id}
                        to="/books"
                        onClick={onClose}
                        className="block p-3 rounded-xl bg-zinc-950/60 hover:bg-red-950/30 border border-zinc-900 hover:border-red-600/40 transition-all group"
                      >
                        <h4 className="text-sm font-semibold text-white group-hover:text-red-400 line-clamp-1">{book.title}</h4>
                        <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5">Publisher: {book.publisher || 'N/A'}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="search-modal-footer">
          <span>Press ESC to close</span>
          <span className="font-semibold text-red-400">SRMU Research Database</span>
        </div>

      </div>
    </div>
  );
}

export default SearchModal;
