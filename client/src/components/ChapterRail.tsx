/*
 * Cinematic Astral Editorial — ChapterRail
 * A quiet observatory rail: fine geometry, mono labels, and one active signal.
 */
import { Compass, MoveDown } from "lucide-react";

export type Chapter = {
  id: string;
  number: string;
  label: string;
};

type ChapterRailProps = {
  chapters: Chapter[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export function ChapterRail({ chapters, activeIndex, onSelect }: ChapterRailProps) {
  return (
    <aside className="chapter-rail" aria-label="Universe chapters">
      <div className="rail-brand" aria-label="Priyanshu Attri orbital mark">
        <span className="rail-brand-mark"><Compass size={16} strokeWidth={1.5} /></span>
        <span className="rail-brand-text">PA / 26</span>
      </div>
      <div className="rail-track" aria-hidden="true">
        <span className="rail-line" />
        <span className="rail-progress" style={{ height: `${Math.max(activeIndex, 0) / Math.max(chapters.length - 1, 1) * 100}%` }} />
      </div>
      <nav className="rail-nav">
        {chapters.map((chapter, index) => (
          <button
            type="button"
            className={`rail-item ${activeIndex === index ? "is-active" : ""}`}
            key={chapter.id}
            onClick={() => onSelect(index)}
            aria-current={activeIndex === index ? "step" : undefined}
          >
            <span className="rail-item-number">{chapter.number}</span>
            <span className="rail-item-label">{chapter.label}</span>
          </button>
        ))}
      </nav>
      <div className="rail-scroll-hint"><MoveDown size={14} /><span>SCROLL TO TRAVEL</span></div>
    </aside>
  );
}
