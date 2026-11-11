"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowIcon, PinIcon } from "@/components/site";
import { jobs } from "@/lib/site-config";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export function CareersBoard() {
  const [dept, setDept] = useState("All");
  const [plant, setPlant] = useState("All");
  const today = new Date().toISOString().slice(0, 10);
  const open = jobs.filter((j) => j.lastDate >= today);
  const departments = ["All", ...new Set(open.map((j) => j.department))];
  const plantsList = ["All", ...new Set(open.map((j) => j.plant))];

  const shown = useMemo(
    () => open.filter((j) => (dept === "All" || j.department === dept) && (plant === "All" || j.plant === plant)),
    [open, dept, plant],
  );

  return (
    <div className="careers-board">
      <div className="job-filters">
        <div className="filter-group" role="group" aria-label="Filter by department">
          <span>Department</span>
          <div className="chips">
            {departments.map((d) => (
              <button key={d} type="button" className={`chip${dept === d ? " is-active" : ""}`} onClick={() => setDept(d)} aria-pressed={dept === d}>{d}</button>
            ))}
          </div>
        </div>
        <div className="filter-group" role="group" aria-label="Filter by plant">
          <span>Plant</span>
          <div className="chips">
            {plantsList.map((p) => (
              <button key={p} type="button" className={`chip${plant === p ? " is-active" : ""}`} onClick={() => setPlant(p)} aria-pressed={plant === p}>{p}</button>
            ))}
          </div>
        </div>
        <span className="job-count">{shown.length} open {shown.length === 1 ? "role" : "roles"}</span>
      </div>

      {shown.length ? (
        <div className="job-list">
          {shown.map((j) => (
            <article key={j.slug} className="job-card">
              <div className="job-main">
                <span className="tag">{j.department}</span>
                <h3><Link href={`/careers/${j.slug}`}>{j.title}</Link></h3>
                <div className="job-meta">
                  <span><PinIcon />{j.plant}</span>
                  <span>{j.experience}</span>
                  <span>{j.qualification}</span>
                  <span>{j.openings} {j.openings === 1 ? "opening" : "openings"}</span>
                </div>
              </div>
              <div className="job-side">
                <small>Apply by {formatDate(j.lastDate)}</small>
                <Link href={`/careers/${j.slug}`} className="btn btn-primary btn-sm">View &amp; apply <ArrowIcon /></Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No openings match these filters.</h3>
          <p>Try another department or plant — or send us your CV for future roles.</p>
          <Link href="/careers/apply" className="btn btn-outline">Send your CV <ArrowIcon /></Link>
        </div>
      )}
    </div>
  );
}
