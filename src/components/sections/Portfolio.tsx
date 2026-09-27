"use client";

import { useState } from "react";
import Image from "next/image";
import { projects } from "@/lib/projects";
import { Accent, Arrow, MagneticLink, SectionHeading, SpotlightCard, Tag } from "@/components/ui/primitives";

export default function Portfolio() {
  return (
    <section id="work" aria-labelledby="work-title" className="relative bg-void px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            id="work-title"
            eyebrow="Portfolio"
            title={["Real projects.", <Accent key="e">Real execution.</Accent>]}
            lead="A cinematic look at what we’ve shipped — every project below is live today."
          />
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} priority={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, priority }: { project: (typeof projects)[number]; priority: boolean }) {
  const [hover, setHover] = useState(false);
  const [live, setLive] = useState(false);

  return (
    <SpotlightCard
      className="group"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line">
        {live ? (
          <iframe
            src={project.url}
            title={`Live preview of ${project.name}`}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            className="h-[220%] w-[220%] origin-top-left scale-[0.4545] border-0"
          />
        ) : (
          <>
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              sizes="(min-width: 1024px) 560px, 100vw"
              priority={priority}
              className={`object-cover object-top transition-all duration-700 ${hover ? "scale-105 opacity-0" : "opacity-100"}`}
            />
            <Image
              src={project.altImage}
              alt={project.altImageAlt}
              fill
              sizes="(min-width: 1024px) 560px, 100vw"
              className={`object-cover object-top transition-all duration-700 ${hover ? "scale-105 opacity-100" : "opacity-0"}`}
            />
          </>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <Tag>{project.industry}</Tag>
          {live && <Tag tone="signal">Live · interactive</Tag>}
        </div>
        <button
          type="button"
          onClick={() => setLive((v) => !v)}
          className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-black/50 px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white backdrop-blur-md transition hover:border-white/50"
        >
          {live ? "Show screenshot" : "Explore live"}
        </button>
      </div>

      <div className="p-6 md:p-8">
        <div className="mb-1 flex items-center justify-between gap-3">
          <h3 className="font-serif text-2xl italic">{project.name}</h3>
          <span className="font-mono text-[11px] text-dim">{project.domain}</span>
        </div>
        <p className="mb-4 text-sm text-muted">{project.client}</p>
        <p className="mb-5 text-[15px] leading-7 text-text/80">{project.description}</p>

        <div className="mb-5 grid gap-2 sm:grid-cols-2">
          {project.features.slice(0, 6).map((f) => (
            <div key={f} className="flex items-start gap-2 text-[13px] leading-5 text-text/70">
              <span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-ice/70" />
              {f}
            </div>
          ))}
        </div>

        {project.ai.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {project.ai.map((a) => (
              <span key={a} className="rounded-full border border-signal/25 bg-signal/[0.06] px-3 py-1.5 text-[11px] text-signal">
                {a}
              </span>
            ))}
          </div>
        )}

        <MagneticLink href={project.url} target="_blank" rel="noopener noreferrer" variant="ghost" className="w-full sm:w-auto">
          Visit live site <Arrow />
        </MagneticLink>
      </div>
    </SpotlightCard>
  );
}
