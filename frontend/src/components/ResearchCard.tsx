import React from 'react';
import { Bookmark, Calendar, User, Building, ExternalLink, Loader2 } from 'lucide-react';
import { ResearchPaper } from '../types';
import { Link } from 'react-router-dom';

interface PublicationCardProps {
  paper: ResearchPaper;
}

function PublicationCard({ paper }: PublicationCardProps) {

  return (
    <article className="card-mint research-card">
      <div>
        <div className="research-card-label">
          <span className="eyebrow">● {paper.departmentKey || 'RESEARCH'}</span>
        </div>

        <h3>{paper.title || 'Untitled research publication'}</h3>

        <div className="research-card-detail">
          <User />
          <span>{paper.authors || 'Author not available'}</span>
        </div>

        {paper.journal && (
          <div className="research-card-detail research-card-journal">
            <Building />
            <span>{paper.journal}</span>
          </div>
        )}

        <p className="research-card-abstract">
          {paper.abstract || 'Publication details unavailable'}
        </p>
      </div>

      <div className="research-card-footer">
        <span>
          <Calendar />
          {paper.year || 'Year unavailable'}
        </span>
        {paper.doi ? (
          <Link to={`${paper.doi}`} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            View <ExternalLink />
          </Link>
        ) : (
          <span>ID: {paper.id}</span>
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
  return (
    <>
      <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
        <span>Showing <strong className="text-white">{count}</strong> indexed publications</span>
        {loading && <Loader2 className="w-4 h-4 text-red-500 animate-spin" />}
      </div>

      {loading ? (
        <div className="py-20 text-center text-zinc-400">
          <Loader2 className="w-8 h-8 mx-auto mb-2 text-red-500 animate-spin" />
          <p className="text-sm">Loading indexed journals...</p>
        </div>
      ) : papers.length === 0 ? (
        <div className="glass-panel py-16 text-center text-zinc-400 rounded-2xl border border-zinc-900">
          <Bookmark className="w-12 h-12 mx-auto mb-3 text-zinc-700 stroke-[1.5]" />
          <p className="text-base font-semibold text-zinc-300">No matching indexed journals found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 research-card-grid">
          {papers.map((paper) => (
            <PublicationCard key={paper.id} paper={paper} />
          ))}
        </div>
      )}
    </>
  );
}

export default ResearchCard;
