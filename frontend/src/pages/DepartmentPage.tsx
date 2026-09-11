import React, { useState, useEffect, useRef, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  GraduationCap,
  Users,
  FileText,
  Lightbulb,
  BookOpen,
  CheckCircle2,
  Calendar,
  ExternalLink,
  ChevronRight,
  Search,
  Filter,
  RefreshCw,
} from "lucide-react";
import { gsap } from "gsap";
import { getDepartmentById, DEPARTMENTS_LIST, DepartmentInfo } from "../data/departmentData";
import Pagination from "../components/Pagination";

export default function DepartmentPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const pageRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"faculty" | "publications" | "patents" | "books">("faculty");
  const [deptInfo, setDeptInfo] = useState<DepartmentInfo | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const currentSlug = id || "all";

  useEffect(() => {
    const data = getDepartmentById(currentSlug);
    setDeptInfo(data);
    setSearchQuery("");
    setCurrentPage(1);
  }, [currentSlug]);

  // Entrance animation
  useEffect(() => {
    if (!pageRef.current || !deptInfo) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".dept-hero-reveal",
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power3.out", clearProps: "all" }
      );
      gsap.fromTo(
        ".dept-card-reveal",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power2.out", delay: 0.1, clearProps: "all" }
      );
    }, pageRef);

    return () => ctx.revert();
  }, [deptInfo]);

  // Reset page on tab change
  const handleTabChange = (tab: "faculty" | "publications" | "patents" | "books") => {
    setActiveTab(tab);
    setSearchQuery("");
    setCurrentPage(1);
  };

  // Filtered Faculty Supervisors
  const filteredFaculty = useMemo(() => {
    if (!deptInfo) return [];
    if (!searchQuery.trim()) return deptInfo.facultySupervisors;
    const q = searchQuery.toLowerCase();
    return deptInfo.facultySupervisors.filter(
      (r) =>
        r.supervisorName.toLowerCase().includes(q) ||
        r.department.toLowerCase().includes(q) ||
        r.institute.toLowerCase().includes(q) ||
        r.designation.toLowerCase().includes(q)
    );
  }, [deptInfo, searchQuery]);

  // Filtered Publications
  const filteredPublications = useMemo(() => {
    if (!deptInfo) return [];
    if (!searchQuery.trim()) return deptInfo.researchPublications;
    const q = searchQuery.toLowerCase();
    return deptInfo.researchPublications.filter(
      (p: any) =>
        (p.title && p.title.toLowerCase().includes(q)) ||
        (p.authorName && p.authorName.toLowerCase().includes(q)) ||
        (p.journalName && p.journalName.toLowerCase().includes(q)) ||
        (p.department && p.department.toLowerCase().includes(q))
    );
  }, [deptInfo, searchQuery]);

  // Filtered Patents
  const filteredPatents = useMemo(() => {
    if (!deptInfo) return [];
    if (!searchQuery.trim()) return deptInfo.patents;
    const q = searchQuery.toLowerCase();
    return deptInfo.patents.filter(
      (p: any) =>
        (p.title && p.title.toLowerCase().includes(q)) ||
        (p.patenterName && p.patenterName.toLowerCase().includes(q)) ||
        (p.patentNumber && p.patentNumber.toLowerCase().includes(q))
    );
  }, [deptInfo, searchQuery]);

  // Filtered Books
  const filteredBooks = useMemo(() => {
    if (!deptInfo) return [];
    if (!searchQuery.trim()) return deptInfo.books;
    const q = searchQuery.toLowerCase();
    return deptInfo.books.filter(
      (b: any) =>
        (b.paperTitle && b.paperTitle.toLowerCase().includes(q)) ||
        (b.bookOrChapterTitle && b.bookOrChapterTitle.toLowerCase().includes(q)) ||
        (b.teacherName && b.teacherName.toLowerCase().includes(q)) ||
        (b.publisherName && b.publisherName.toLowerCase().includes(q)) ||
        (b.affiliatingInstitute && b.affiliatingInstitute.toLowerCase().includes(q))
    );
  }, [deptInfo, searchQuery]);

  // Current active data list for pagination
  const activeListLength =
    activeTab === "faculty"
      ? filteredFaculty.length
      : activeTab === "publications"
      ? filteredPublications.length
      : activeTab === "patents"
      ? filteredPatents.length
      : filteredBooks.length;

  const totalPages = Math.ceil(activeListLength / itemsPerPage);
  const paginatedFaculty = filteredFaculty.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const paginatedPublications = filteredPublications.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const paginatedPatents = filteredPatents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const paginatedBooks = filteredBooks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (!deptInfo) {
    return (
      <div className="max-w-[1240px] mx-auto px-4 py-20 text-center">
        <Building2 className="w-12 h-12 text-slate-400 mx-auto mb-4" />
        <h2 className="text-2xl font-serif font-bold text-slate-800 mb-2">Department Not Found</h2>
        <p className="text-slate-500 mb-6">The requested department could not be located in the research archive.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0A4A8F] text-white text-sm font-medium hover:bg-[#0C5CA8] transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>
      </div>
    );
  }

  const isAll = deptInfo.id === "all";

  return (
    <div ref={pageRef} className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* ── BREADCRUMBS & SELECTOR ───────────────────────── */}
      <div className="dept-hero-reveal flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-slate-200 text-xs font-semibold text-slate-700 hover:text-[#0A4A8F] hover:border-[#0A4A8F]/30 hover:shadow-xs transition-all cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Link to="/" className="hover:text-[#0A4A8F] transition-colors">
              Home
            </Link>
            <ChevronRight size={12} />
            <span className="text-slate-600 font-medium">Departments</span>
            <ChevronRight size={12} />
            <span className="text-[#0A4A8F] font-bold">{deptInfo.code}</span>
          </div>
        </div>

        {/* Quick Institute Switcher */}
        <div className="flex items-center gap-2">
          <Filter size={13} className="text-[#0A4A8F] hidden sm:block" />
          <select
            value={currentSlug}
            onChange={(e) => navigate(`/department/${e.target.value}`)}
            className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 shadow-xs focus:outline-none focus:border-[#0A4A8F]"
          >
            <option value="all">🌟 All Departments Combined (University-wide)</option>
            {DEPARTMENTS_LIST.map((d) => (
              <option key={d.id} value={d.id}>
                {d.title} ({d.code})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ── DEPARTMENT HERO BANNER ─────────────────────────── */}
      <div className="dept-hero-reveal p-6 sm:p-8 md:p-10 rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-xl mb-8 relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#0A4A8F] via-[#FFB703] to-[#0A4A8F]" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Info Left */}
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0A4A8F] px-3 py-0.5 rounded-full bg-[#0A4A8F]/10 border border-[#0A4A8F]/20">
                {deptInfo.code} • {deptInfo.departmentCountLabel}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0F172A] leading-tight mb-4">
              {deptInfo.title}
            </h1>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 max-w-2xl">
              {deptInfo.description}
            </p>

            {/* Programs List */}
            {deptInfo.programs && deptInfo.programs.length > 0 && (
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Academic &amp; Research Programs ({deptInfo.programs.length})
                </span>
                <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto pr-1">
                  {deptInfo.programs.map((prog, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-medium px-3 py-1 rounded-xl bg-slate-50 border border-slate-200 text-slate-700"
                    >
                      {prog}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Image / Stats Right */}
          <div className="lg:col-span-4">
            <div className="rounded-2xl overflow-hidden shadow-inner aspect-[16/11] bg-slate-100 border border-slate-200/80 mb-4">
              <img
                src={deptInfo.image}
                alt={deptInfo.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── KPI METRICS CARDS ──────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {/* Ph.D. Seats */}
        <div className="dept-card-reveal p-5 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Total Ph.D.
            </span>
            <GraduationCap className="w-4 h-4 text-[#0A4A8F]" />
          </div>
          <div className="font-mono text-3xl font-extrabold text-[#0A4A8F]">
            {deptInfo.totalPhDSeats}
          </div>
          <span className="text-[11px] text-slate-400 mt-1">Ph.D. Registrations</span>
        </div>

        {/* Faculty Supervisors */}
        <div className="dept-card-reveal p-5 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Supervisors
            </span>
            <Users className="w-4 h-4 text-[#0A4A8F]" />
          </div>
          <div className="font-mono text-3xl font-extrabold text-[#0F172A]">
            {deptInfo.facultySupervisors.length}
          </div>
          <span className="text-[11px] text-slate-400 mt-1">Active Faculty</span>
        </div>

        {/* Vacant Seats */}
        <div className="dept-card-reveal p-5 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Vacant Seats
            </span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="font-mono text-3xl font-extrabold text-emerald-600">
            {deptInfo.totalVacantSeats}
          </div>
          <span className="text-[11px] text-slate-400 mt-1">Available Seats</span>
        </div>

        {/* Research Papers */}
        <div className="dept-card-reveal p-5 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Publications
            </span>
            <FileText className="w-4 h-4 text-[#FFB703]" />
          </div>
          <div className="font-mono text-3xl font-extrabold text-[#0A4A8F]">
            {deptInfo.researchPublications.length}
          </div>
          <span className="text-[11px] text-slate-400 mt-1">Indexed Papers</span>
        </div>
      </div>

      {/* ── TABS NAVIGATION & SEARCH BAR ────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-200/90 pb-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => handleTabChange("faculty")}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shrink-0 flex items-center gap-2 ${
              activeTab === "faculty"
                ? "bg-[#0A4A8F] text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <Users size={14} />
            <span>Faculty &amp; Seats ({deptInfo.facultySupervisors.length})</span>
          </button>

          {deptInfo.researchPublications.length > 0 && (
            <button
              type="button"
              onClick={() => handleTabChange("publications")}
              className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shrink-0 flex items-center gap-2 ${
                activeTab === "publications"
                  ? "bg-[#0A4A8F] text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <FileText size={14} />
              <span>Publications ({deptInfo.researchPublications.length})</span>
            </button>
          )}

          {deptInfo.patents.length > 0 && (
            <button
              type="button"
              onClick={() => handleTabChange("patents")}
              className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shrink-0 flex items-center gap-2 ${
                activeTab === "patents"
                  ? "bg-[#0A4A8F] text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <Lightbulb size={14} />
              <span>Patents ({deptInfo.patents.length})</span>
            </button>
          )}

          {deptInfo.books.length > 0 && (
            <button
              type="button"
              onClick={() => handleTabChange("books")}
              className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shrink-0 flex items-center gap-2 ${
                activeTab === "books"
                  ? "bg-[#0A4A8F] text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <BookOpen size={14} />
              <span>Books ({deptInfo.books.length})</span>
            </button>
          )}
        </div>

        {/* Search Field */}
        <div className="relative min-w-[240px] max-w-sm">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder={`Search in ${activeTab}...`}
            className="w-full text-xs py-2 pl-9 pr-8 rounded-xl bg-white border border-slate-200 shadow-xs focus:outline-none focus:border-[#0A4A8F]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* ── TAB 1: FACULTY & PH.D. SEATS (Exact Vacant Seat Data) ── */}
      {activeTab === "faculty" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0F172A]">
              Faculty Research Supervisors &amp; Ph.D. Vacancy Matrix
            </h2>
            <span className="font-mono text-xs text-slate-400">
              {filteredFaculty.length} {filteredFaculty.length === 1 ? "record" : "records"}
            </span>
          </div>

          <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse min-w-[900px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200/90 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-600">
                    <th className="py-3.5 px-4">#</th>
                    {isAll && <th className="py-3.5 px-4">Institute</th>}
                    <th className="py-3.5 px-4">Department</th>
                    <th className="py-3.5 px-3 text-center">Total Ph.D.</th>
                    <th className="py-3.5 px-4">Supervisor Name</th>
                    <th className="py-3.5 px-4">Designation</th>
                    <th className="py-3.5 px-3 text-center">Seat Limit</th>
                    <th className="py-3.5 px-3 text-center">Allotted</th>
                    <th className="py-3.5 px-4 text-center">Vacant</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredFaculty.length === 0 ? (
                    <tr>
                      <td colSpan={isAll ? 9 : 8} className="py-10 text-center text-slate-500">
                        No supervisor records found matching your search.
                      </td>
                    </tr>
                  ) : (
                    paginatedFaculty.map((row, idx) => (
                      <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4 font-mono text-xs text-slate-400">
                          {(currentPage - 1) * itemsPerPage + idx + 1}
                        </td>
                        {isAll && (
                          <td className="py-3 px-4 font-bold text-[#0A4A8F] text-xs">
                            {row.institute}
                          </td>
                        )}
                        <td className="py-3 px-4 font-medium text-slate-800 whitespace-pre-line text-xs">
                          {row.department}
                        </td>
                        <td className="py-3 px-3 text-center font-mono font-bold text-[#0A4A8F]">
                          {row.totalPhD !== null ? row.totalPhD : "—"}
                        </td>
                        <td className="py-3 px-4 font-semibold text-slate-900">
                          {row.supervisorName}
                        </td>
                        <td className="py-3 px-4 text-xs text-slate-600">
                          <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200/70 font-medium">
                            {row.designation}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center font-mono font-bold text-slate-700">
                          {row.designationSeatLimit}
                        </td>
                        <td className="py-3 px-3 text-center font-mono font-bold text-[#0A4A8F]">
                          {row.allottedSeat}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span
                            className={`inline-flex items-center justify-center font-mono text-xs font-extrabold px-2.5 py-0.5 rounded-full border ${
                              row.noOfVacant > 0
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : row.noOfVacant === 0
                                ? "bg-slate-100 text-slate-600 border-slate-200"
                                : "bg-rose-50 text-rose-700 border-rose-200"
                            }`}
                          >
                            {row.noOfVacant}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
                <tfoot>
                  <tr className="bg-slate-900 text-white font-mono font-bold text-xs uppercase tracking-wider border-t-2 border-[#FFB703]">
                    <td className="py-3.5 px-4">Σ</td>
                    {isAll && <td className="py-3.5 px-4">University</td>}
                    <td className="py-3.5 px-4">{deptInfo.title} Total</td>
                    <td className="py-3.5 px-3 text-center text-[#FFB703]">
                      {deptInfo.totalPhDSeats}
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">
                      {deptInfo.facultySupervisors.length} Faculty
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">—</td>
                    <td className="py-3.5 px-3 text-center">
                      {deptInfo.totalDesignationLimit}
                    </td>
                    <td className="py-3.5 px-3 text-center text-[#FFB703]">
                      {deptInfo.totalAllottedSeats}
                    </td>
                    <td className="py-3.5 px-4 text-center text-emerald-400">
                      {deptInfo.totalVacantSeats}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="p-4 border-t border-slate-100">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalItems={filteredFaculty.length}
                itemsPerPage={itemsPerPage}
              />
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 2: RESEARCH PUBLICATIONS ───────────────────── */}
      {activeTab === "publications" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0F172A]">
              Indexed Research Publications ({filteredPublications.length})
            </h2>
            <span className="font-mono text-xs text-slate-400">
              {isAll ? "All University Publications" : `Department: ${deptInfo.code}`}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedPublications.map((paper: any, idx: number) => (
              <div
                key={paper.srNo || idx}
                className="p-6 rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#0A4A8F] px-2.5 py-0.5 rounded-full bg-[#0A4A8F]/8 border border-[#0A4A8F]/15">
                      {paper.department || deptInfo.code}
                    </span>
                    <span className="font-mono text-[10px] text-slate-500 font-semibold">
                      SCOPUS / WOS
                    </span>
                  </div>

                  <h3 className="font-serif text-base font-bold text-[#0F172A] leading-snug mb-2 line-clamp-3">
                    {paper.title || "Untitled publication"}
                  </h3>

                  <div className="text-xs text-slate-600 mb-2 flex items-center gap-1.5 font-mono">
                    <Users size={13} className="text-[#FFB703] shrink-0" />
                    <span className="line-clamp-1">{paper.authorName || "Faculty Author"}</span>
                  </div>

                  {paper.journalName && (
                    <div className="text-xs text-slate-500 italic mb-3 line-clamp-2">
                      {paper.journalName}
                    </div>
                  )}

                  {paper.issnNumber && (
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs font-mono text-slate-600 mb-3 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 uppercase">ISSN</span>
                      <span className="font-bold text-[#0A4A8F]">{paper.issnNumber}</span>
                    </div>
                  )}
                </div>

                <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-xs font-mono text-slate-500">
                    <Calendar size={12} className="text-[#FFB703]" />
                    {paper.yearOfPublication || "Year N/A"}
                  </span>
                  {paper.ugcRecognitionLink && (
                    <a
                      href={paper.ugcRecognitionLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono font-medium text-[#0A4A8F] hover:underline"
                    >
                      <span>Link</span>
                      <ExternalLink size={11} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredPublications.length}
            itemsPerPage={itemsPerPage}
          />
        </div>
      )}

      {/* ── TAB 3: PATENTS ─────────────────────────────────── */}
      {activeTab === "patents" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0F172A]">
              Patents &amp; Intellectual Property ({filteredPatents.length})
            </h2>
            <span className="font-mono text-xs text-slate-400">
              {isAll ? "All University Patents" : `Department: ${deptInfo.code}`}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedPatents.map((pat: any, idx: number) => (
              <div
                key={pat.srNo || idx}
                className="p-6 rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#FFB703] px-2.5 py-0.5 rounded-full bg-[#FFB703]/10 border border-[#FFB703]/20">
                      PATENT
                    </span>
                    <span className="font-mono text-[10px] text-slate-500 font-semibold">
                      {pat.yearOfAward || "Awarded"}
                    </span>
                  </div>

                  <h3 className="font-serif text-base font-bold text-[#0F172A] leading-snug mb-2 line-clamp-3">
                    {pat.title || "Patent Title"}
                  </h3>

                  <div className="text-xs text-slate-600 mb-2 flex items-center gap-1.5 font-mono">
                    <Users size={13} className="text-[#0A4A8F] shrink-0" />
                    <span className="line-clamp-2">{pat.patenterName}</span>
                  </div>

                  {pat.patentNumber && (
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs font-mono text-slate-700 whitespace-pre-line leading-relaxed mb-3">
                      {pat.patentNumber}
                    </div>
                  )}
                </div>

                <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
                  <span>Patent Record #{pat.srNo || idx + 1}</span>
                  <span className="text-[#0A4A8F] font-bold">Granted / Published</span>
                </div>
              </div>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredPatents.length}
            itemsPerPage={itemsPerPage}
          />
        </div>
      )}

      {/* ── TAB 4: BOOKS & CHAPTERS ────────────────────────── */}
      {activeTab === "books" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0F172A]">
              Books &amp; Chapters ({filteredBooks.length})
            </h2>
            <span className="font-mono text-xs text-slate-400">
              {isAll ? "All University Books" : `Department: ${deptInfo.code}`}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedBooks.map((b: any, idx: number) => (
              <div
                key={b.slNo || idx}
                className="p-6 rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#0A4A8F] px-2.5 py-0.5 rounded-full bg-[#0A4A8F]/8 border border-[#0A4A8F]/15">
                      {b.affiliatingInstitute || deptInfo.code}
                    </span>
                    <span className="font-mono text-[10px] text-slate-500 font-semibold">
                      {b.yearOfPublication || "Published"}
                    </span>
                  </div>

                  <h3 className="font-serif text-base font-bold text-[#0F172A] leading-snug mb-2 line-clamp-3">
                    {b.paperTitle || b.bookOrChapterTitle || "Book Title"}
                  </h3>

                  <div className="text-xs text-slate-600 mb-2 flex items-center gap-1.5 font-mono">
                    <Users size={13} className="text-[#FFB703] shrink-0" />
                    <span className="line-clamp-1">{b.teacherName}</span>
                  </div>

                  {b.publisherName && (
                    <div className="text-xs text-slate-500 italic mb-2">
                      Publisher: {b.publisherName}
                    </div>
                  )}

                  {b.isbnIssn && (
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/70 text-xs font-mono text-slate-600 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 uppercase">ISBN/ISSN</span>
                      <span className="font-bold text-[#0A4A8F]">{b.isbnIssn}</span>
                    </div>
                  )}
                </div>

                <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
                  <span>Entry #{b.slNo || idx + 1}</span>
                  <span className="text-slate-600 font-semibold">{b.scope || "Academic"}</span>
                </div>
              </div>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredBooks.length}
            itemsPerPage={itemsPerPage}
          />
        </div>
      )}
    </div>
  );
}
