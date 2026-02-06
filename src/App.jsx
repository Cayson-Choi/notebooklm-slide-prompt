import React, { useMemo, useState } from 'react';
import { Grid3X3, Layers, ExternalLink, Search } from 'lucide-react';
import { TEMPLATES, CATEGORIES } from './data/templates';
import StyleThumbnail from './components/StyleThumbnail';
import ThumbnailSlide from './components/ThumbnailSlide';
import PromptPanel from './components/PromptPanel';

export default function NotebookLMBuilder() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTemplates = useMemo(() => {
    return TEMPLATES.filter((t) => {
      const matchCategory = selectedCategory === 'All' || t.category === selectedCategory;
      const sq = searchQuery.trim().toLowerCase();
      const matchSearch =
        !sq ||
        (t.name || '').toLowerCase().includes(sq) ||
        (t.mood || '').toLowerCase().includes(sq) ||
        (t.category || '').toLowerCase().includes(sq);
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const categoryCount = useMemo(() => {
    const counts = {};
    CATEGORIES.forEach((c) => {
      counts[c] = 0;
    });
    counts['All'] = TEMPLATES.length;
    TEMPLATES.forEach((t) => {
      counts[t.category] = (counts[t.category] || 0) + 1;
    });
    return counts;
  }, []);

  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full blur-3xl opacity-30 bg-gradient-to-br from-fuchsia-500 via-violet-500 to-cyan-400" />
        <div className="absolute -bottom-48 -right-48 h-[640px] w-[640px] rounded-full blur-3xl opacity-25 bg-gradient-to-br from-emerald-400 via-cyan-400 to-indigo-500" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] [background-size:24px_24px] opacity-40" />
      </div>

      {/* Top command bar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/70 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute -inset-1 rounded-2xl blur-md opacity-70 bg-gradient-to-br from-violet-500 to-fuchsia-500" />
              <div className="relative w-10 h-10 rounded-2xl bg-zinc-950 border border-white/10 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
            </div>
            <div className="leading-tight">
              <div className="text-sm font-black tracking-tight">NotebookLM Visual Studio</div>
              <div className="text-[11px] text-white/60">
                {TEMPLATES.length} curated styles · click to preview + copy
              </div>
            </div>
          </div>

          <div className="flex-1" />

          <div className="hidden md:flex items-center gap-2">
            <div className="relative w-[340px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="Search styles, moods, categories…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2 rounded-2xl bg-white/5 border border-white/10 text-sm outline-none focus:border-white/20 focus:bg-white/10"
              />
            </div>

            <a
              href="https://notebooklm.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white text-zinc-950 text-sm font-extrabold hover:bg-white/90"
            >
              <ExternalLink className="w-4 h-4" />
              Open NotebookLM
            </a>
          </div>

          <a
            href="https://notebooklm.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="md:hidden inline-flex items-center gap-2 px-3 py-2 rounded-2xl bg-white text-zinc-950 text-xs font-extrabold"
          >
            <ExternalLink className="w-4 h-4" />
            Open
          </a>
        </div>
      </header>

      {/* Layout */}
      <div className="relative mx-auto max-w-7xl px-4 py-6 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-[72px] h-fit">
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
            <div className="p-5 border-b border-white/10">
              <div className="text-xs text-white/50">Filter</div>
              <div className="mt-1 text-lg font-extrabold tracking-tight">Categories</div>
              <div className="mt-3 md:hidden relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="text"
                  placeholder="Search…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 rounded-2xl bg-zinc-950/60 border border-white/10 text-sm outline-none focus:border-white/20"
                />
              </div>
            </div>

            <div className="p-3">
              {CATEGORIES.map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-all border ${
                      active
                        ? 'bg-white text-zinc-950 border-white shadow-[0_0_0_1px_rgba(255,255,255,0.35)]'
                        : 'bg-transparent text-white/75 border-transparent hover:bg-white/5 hover:border-white/10'
                    }`}
                  >
                    <span className="truncate">{cat}</span>
                    <span className={`text-[11px] px-2 py-0.5 rounded-full ${active ? 'bg-zinc-950/10' : 'bg-white/10'}`}>
                      {categoryCount[cat] ?? 0}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="p-4 border-t border-white/10">
              <div className="text-[11px] text-white/55 leading-relaxed">
                Tip: click a card → <span className="text-white/85 font-semibold">Example</span> preview → switch to <span className="text-white/85 font-semibold">Prompt</span> → copy.
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main>
          {/* Hero */}
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="inline-flex items-center gap-2 text-[11px] px-3 py-1 rounded-full bg-black/30 border border-white/10 text-white/70">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Curated templates ({TEMPLATES.length})
              </div>
              <div className="mt-4 text-2xl md:text-3xl font-black tracking-tight">
                A radically cleaner way to generate <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 via-violet-300 to-cyan-300">slide prompts</span>
              </div>
              <div className="mt-2 text-sm text-white/60 max-w-2xl">
                Pick a style. Instantly preview a realistic sample slide. Copy a structured prompt to feed NotebookLM.
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-bold text-white/85">Results</div>
              <div className="text-xs text-white/50">{filteredTemplates.length} shown</div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredTemplates.map((template) => {
                const s = template.style;
                return (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template)}
                    className="group text-left rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all overflow-hidden focus:outline-none focus:ring-2 focus:ring-white/20"
                  >
                    <div className="p-4">
                      {/* custom thumbnail - showing scaled SlideExample */}
                      <div className="pointer-events-none">
                        <ThumbnailSlide template={template} />
                      </div>

                      <div className="mt-3 flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="text-sm font-extrabold tracking-tight text-white group-hover:text-white">
                            {template.name}
                          </div>
                          <div className="text-[11px] text-white/55 truncate">{template.category}</div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: s.accent }} />
                          <span className="text-[11px] text-white/50">{s.accent}</span>
                        </div>
                      </div>

                      <div className="mt-3 text-[12px] text-white/60 line-clamp-2">{template.mood}</div>


                    </div>

                    <div className="h-1 w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  </button>
                );
              })}
            </div>

            {filteredTemplates.length === 0 && (
              <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
                <Grid3X3 className="w-10 h-10 text-white/20 mx-auto" />
                <div className="mt-3 text-sm text-white/60">No results. Try another keyword or category.</div>
              </div>
            )}
          </div>

          {/* Footer */}
          <footer className="mt-10 pb-10">
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
              <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-[12px] text-white/60 leading-relaxed">
                  <div className="font-semibold text-white/80">Cayson Tech</div>
                  <div>© {year} Cayson Tech. All rights reserved.</div>
                </div>

                <a
                  href="https://www.slidedeckcleaner.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white text-zinc-950 text-xs font-extrabold hover:bg-white/90"
                >
                  <span>🧹</span>
                  Watermark remover
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </footer>
        </main>
      </div>

      {selectedTemplate && <PromptPanel template={selectedTemplate} onClose={() => setSelectedTemplate(null)} />}

      <style>{`
        .no-scrollbar::-webkit-scrollbar{display:none}
        .no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}
        .line-clamp-2{
          display:-webkit-box;
          -webkit-line-clamp:2;
          -webkit-box-orient:vertical;
          overflow:hidden;
        }
      `}</style>
    </div>
  );
}
