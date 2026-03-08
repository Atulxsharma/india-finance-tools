"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ToolDefinition } from "@/lib/types";

export function ToolDirectory({
  tools,
  categories,
}: {
  tools: ToolDefinition[];
  categories: Array<[ToolDefinition["category"], ToolDefinition[]]>;
}) {
  const [query, setQuery] = useState("");

  const normalizedQuery = query.trim().toLowerCase();

  const filteredCategories = useMemo(() => {
    if (!normalizedQuery) {
      return categories;
    }

    return categories
      .map(([category, categoryTools]) => [
        category,
        categoryTools.filter((tool) => {
          const haystack = [
            tool.name,
            tool.description,
            tool.targetKeyword,
            tool.primaryPromise,
            ...tool.seoContent.keywords,
          ]
            .join(" ")
            .toLowerCase();

          return haystack.includes(normalizedQuery);
        }),
      ] as [ToolDefinition["category"], ToolDefinition[]])
      .filter(([, categoryTools]) => categoryTools.length > 0);
  }, [categories, normalizedQuery]);

  const resultCount = filteredCategories.reduce((sum, [, categoryTools]) => sum + categoryTools.length, 0);

  return (
    <section className="directory-section">
      <div className="section-heading">
        <h2>All tools</h2>
        <p className="muted">Browse calculators, converters, generators, and utility tools.</p>
      </div>

      <div className="content-card">
        <div className="field">
          <label htmlFor="tool-search">Search tools</label>
          <input
            id="tool-search"
            placeholder="Search salary, EMI, PPF, QR, biodata, HRA..."
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <small>
            {normalizedQuery
              ? `${resultCount} tool${resultCount === 1 ? "" : "s"} found`
              : `${tools.length} tools live`}
          </small>
        </div>
      </div>

      {filteredCategories.map(([category, categoryTools]) => (
        <div className="content-card" key={category}>
          <div className="section-heading">
            <h3>{category}</h3>
          </div>
          <div className="related-links">
            {categoryTools.map((tool) => (
              <Link className="text-link related-link" href={`/tools/${tool.slug}`} key={tool.slug}>
                {tool.name}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
