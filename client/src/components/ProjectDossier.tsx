/*
 * Cinematic Astral Editorial — ProjectDossier
 * The dossier is an editorial overlay, not a generic modal: precise labels,
 * generous whitespace, and a clear route back to the project orbit.
 */
import { ArrowUpRight, CircleX, Github, Orbit } from "lucide-react";

export type ProjectRecord = {
  id: string;
  code: string;
  name: string;
  type: string;
  color: string;
  summary: string;
  problem: string;
  solution: string;
  stack: string[];
  features: string[];
  github: string;
  demo: string;
};

type ProjectDossierProps = {
  project: ProjectRecord | null;
  onClose: () => void;
};

export function ProjectDossier({ project, onClose }: ProjectDossierProps) {
  if (!project) return null;

  return (
    <div className="dossier-backdrop" role="presentation" onClick={onClose}>
      <section className="dossier" role="dialog" aria-modal="true" aria-labelledby="dossier-title" onClick={(event) => event.stopPropagation()}>
        <div className="dossier-topline">
          <span><Orbit size={14} /> PROJECT DOSSIER / {project.code}</span>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close project dossier"><CircleX size={20} /></button>
        </div>
        <div className="dossier-heading">
          <div>
            <p className="eyebrow">{project.type} / FIELD NOTE</p>
            <h2 id="dossier-title">{project.name}</h2>
          </div>
          <span className="dossier-signal" style={{ background: project.color }} aria-hidden="true" />
        </div>
        <p className="dossier-summary">{project.summary}</p>
        <div className="dossier-grid">
          <div className="dossier-copy">
            <div>
              <p className="dossier-label">01 / PROBLEM</p>
              <p>{project.problem}</p>
            </div>
            <div>
              <p className="dossier-label">02 / APPROACH</p>
              <p>{project.solution}</p>
            </div>
          </div>
          <div className="dossier-facts">
            <div>
              <p className="dossier-label">STACK</p>
              <div className="tag-list">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
            </div>
            <div>
              <p className="dossier-label">KEY FEATURES</p>
              <ul>{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
            </div>
          </div>
        </div>
        <div className="dossier-actions">
          <a href={project.github} target="_blank" rel="noreferrer" className="dossier-link"><Github size={16} /> GitHub <ArrowUpRight size={15} /></a>
          <a href={project.demo} target="_blank" rel="noreferrer" className="dossier-link is-secondary">View demo <ArrowUpRight size={15} /></a>
          <button type="button" className="return-button" onClick={onClose}>Return to orbit</button>
        </div>
      </section>
    </div>
  );
}
