import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FileText, Search, RefreshCw, Loader2 } from 'lucide-react';
import PaperCard from '../components/patentsCard';

function PapersPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [papers, setPapers] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [departments, setDepartments] = useState([]);

  // Filters — always read live from URL
  const search = searchParams.get('search') || '';
  const selectedDept = searchParams.get('department') || 'All';
  const selectedYear = searchParams.get('year') || '';

  // Helper to update URL params
  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value && value !== 'All' && value !== '') {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    setSearchParams(next, { replace: true });
  };
  

  const resetFilters = () => setSearchParams({}, { replace: true });

  useEffect(() => {
    fetch('/api/departments')
      .then(res => res.json())
      .then(data => setDepartments(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    async function fetchPapers() {
      setLoading(true);
      try {
        const query = new URLSearchParams();
        if (search) query.append('search', search);
        if (selectedDept && selectedDept !== 'All') query.append('department', selectedDept);
        if (selectedYear) query.append('year', selectedYear);

        const res = await fetch(`/api/patents?${query.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setPapers((data.patents || []).map((patent) => ({
            ...patent,
            id: patent._id || patent.srNo,
            authors: patent.patenterName,
            year: patent.yearOfAward,
            abstract: patent.patentNumber,
          })));
          setCount(data.count || 0);
        }
      } catch (err) {
        console.error('Error fetching papers:', err);
      } finally {
        setLoading(false);
      }
    }

    const timer = setTimeout(fetchPapers, 300);
    return () => clearTimeout(timer);
  }, [search, selectedDept, selectedYear]);

  const hasFilters = search || selectedDept !== 'All' || selectedYear;

  return (
    <div className="archive-page home-width">
      
      {/* Header */}
      <div className="page-hero-copy">
        <div className="eyebrow"><span className="eyebrow-dot" />
          <FileText className="w-4 h-4" />
          <span>Research Showcase</span>
        </div>
        <h1>
          Granted and Published <em>Patents   </em> 
        </h1>
        <p>
          Browse and filter faculty research publications, patents, and scientific contributions.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="filter-bar papers-filter-bar">
        
        {/* Search Field */}
        <div className="filter-search">
          <Search />
          <input
            type="text"
            value={search}
            onChange={(e) => updateParam('search', e.target.value)}
            placeholder="Filter by title, author, keyword, or journal..."
            className="archive-input"
          />
        </div>

        {/* Department Filter */}
        <div className="filter-select department-select">
          <select
            value={selectedDept}
            onChange={(e) => updateParam('department', e.target.value)}
            className="archive-input"
          >
            <option value="All">All Faculties </option>
            {departments.map((dept) => (
              <option key={dept.key} value={dept.key}>
                {dept.name} ({dept.count})
              </option>
            ))}
          </select>
        </div>

        {/* Year Filter */}
        <div className="filter-select">
          <select
            value={selectedYear}
            onChange={(e) => updateParam('year', e.target.value)}
            className="archive-input"
          >
            <option value="">All Years</option>
            <option value="2026">2026</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
          </select>
        </div>

        {/* Reset */}
        {hasFilters && (
          <button
            onClick={resetFilters}
            className="btn-ghost reset-button"
          >
            <RefreshCw className="w-4 h-4 text-red-500" />
            <span>Reset All</span>
          </button>
        )}

      </div>

      {/* Active Filter Badge */}
      {selectedDept !== 'All' && (
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-zinc-500">Filtered by:</span>
          <span className="px-3 py-1 rounded-full bg-red-950/40 text-red-400 border border-red-800/40 font-medium">
            {departments.find(d => d.key === selectedDept)?.name || selectedDept}
          </span>
          <button
            onClick={() => updateParam('department', 'All')}
            className="text-zinc-500 hover:text-red-400 transition-colors text-xs underline"
          >
            clear
          </button>
        </div>
      )}

      {/* Results Count Banner */}
      <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
        <span>
          Showing <strong className="text-white">{count}</strong> research publications
          {hasFilters && <span className="text-zinc-500 ml-1">(filtered)</span>}
        </span>
        {loading && <Loader2 className="w-4 h-4 text-red-500 animate-spin" />}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="py-20 text-center text-zinc-400">
          <Loader2 className="w-8 h-8 mx-auto mb-2 text-red-500 animate-spin" />
          <p className="text-sm">Loading research papers...</p>
        </div>
      ) : papers.length === 0 ? (
        <div className="glass-panel py-16 text-center text-zinc-400 rounded-2xl border border-zinc-900">
          <FileText className="w-12 h-12 mx-auto mb-3 text-zinc-700 stroke-[1.5]" />
          <p className="text-base font-semibold text-zinc-300 mb-2">No matching research papers found</p>
          <p className="text-xs text-zinc-500 mb-4">The selected department or filter has no matching papers.</p>
          {hasFilters && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-red-600/10 hover:bg-red-600/20 text-red-400 border border-red-500/30 text-sm transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Clear All Filters</span>
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {papers.map((paper) => (
            <PaperCard key={paper.id} paper={paper} />
          ))}
        </div>
      )}

    </div>
  );
}

export default PapersPage;
