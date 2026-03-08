"use client";

import { formatCompactInr, formatPercent, formatRupees } from "@/lib/format";

function markCalculatorEngagement() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem("india-tools:calculator-engaged", "1");
  window.dispatchEvent(new Event("india-tools:calculator-engaged"));
}

export function NumberField({
  id,
  label,
  value,
  min = 0,
  max,
  step = 1,
  onChange,
  hint,
}: {
  id: string;
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
  hint?: string;
}) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        max={max}
        min={min}
        inputMode={step < 1 ? "decimal" : "numeric"}
        step={step}
        type="number"
        value={Number.isFinite(value) ? value : 0}
        onChange={(event) => {
          markCalculatorEngagement();
          onChange(Number(event.target.value));
        }}
      />
      {hint ? <small>{hint}</small> : null}
    </div>
  );
}

export function QuickPicks({
  label,
  options,
  onSelect,
}: {
  label: string;
  options: Array<{ label: string; value: number | string }>;
  onSelect: (value: number | string) => void;
}) {
  return (
    <div className="quick-picks" aria-label={label}>
      {options.map((option) => (
        <button
          className="quick-pick"
          key={`${label}-${option.label}`}
          type="button"
          onClick={() => {
            markCalculatorEngagement();
            onSelect(option.value);
          }}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export function SelectField<T extends string>({
  id,
  label,
  value,
  options,
  onChange,
}: {
  id: string;
  label: string;
  value: T;
  options: Array<{ value: T; label: string }>;
  onChange: (value: T) => void;
}) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        value={value}
        onChange={(event) => {
          markCalculatorEngagement();
          onChange(event.target.value as T);
        }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function SegmentControl<T extends string>({
  options,
  value,
  onChange,
}: {
  options: Array<{ value: T; label: string }>;
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="segment-control" role="tablist">
      {options.map((option) => (
        <button
          className={option.value === value ? "active" : ""}
          key={option.value}
          type="button"
          onClick={() => {
            markCalculatorEngagement();
            onChange(option.value);
          }}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export function StatCard({
  label,
  value,
  caption,
  featured = false,
}: {
  label: string;
  value: string;
  caption?: string;
  featured?: boolean;
}) {
  return (
    <section className={`summary-card card summary-stat${featured ? " summary-card-featured" : ""}`}>
      <p className="summary-label">{label}</p>
      <div className="summary-value">{value}</div>
      {caption ? <p className="summary-caption">{caption}</p> : null}
    </section>
  );
}

export function PrimaryResultCard({
  label,
  value,
  caption,
  highlights,
}: {
  label: string;
  value: string;
  caption?: string;
  highlights: Array<{ label: string; value: string }>;
}) {
  return (
    <section className="primary-result card">
      <p className="summary-label">{label}</p>
      <div className="primary-result-value">{value}</div>
      {caption ? <p className="summary-caption">{caption}</p> : null}
      <div className="result-support">
        {highlights.map((item) => (
          <div className="result-support-item" key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

export function BreakdownTable({
  title,
  rows,
}: {
  title: string;
  rows: Array<{ label: string; value: number; highlight?: boolean }>;
}) {
  return (
    <section className="detail-card card">
      <h3>{title}</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Line item</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr className={row.highlight ? "highlight-row" : ""} key={row.label}>
              <td>{row.label}</td>
              <td>{formatRupees(row.value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export function DistributionBar({
  title,
  segments,
}: {
  title: string;
  segments: Array<{ label: string; value: number; color: string }>;
}) {
  const total = Math.max(
    1,
    segments.reduce((sum, segment) => sum + Math.max(segment.value, 0), 0),
  );

  return (
    <section className="detail-card card distribution">
      <h3>{title}</h3>
      <div className="distribution-track" aria-hidden="true">
        {segments.map((segment) => (
          <div
            className="distribution-segment"
            key={segment.label}
            style={{
              width: `${(Math.max(segment.value, 0) / total) * 100}%`,
              background: segment.color,
            }}
          />
        ))}
      </div>
      <div className="legend">
        {segments.map((segment) => (
          <div className="legend-item" key={segment.label}>
            <span className="legend-label">
              <span className="swatch" style={{ background: segment.color }} />
              {segment.label}
            </span>
            <strong>{formatCompactInr(segment.value)}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

export function AssumptionPanel({
  assumptions,
  notes = [],
}: {
  assumptions: string[];
  notes?: string[];
}) {
  return (
    <details className="assumption-panel card">
      <summary>How this estimate works</summary>
      <div className="assumption-content">
        <h3>Assumptions</h3>
        <ul className="feature-list">
          {assumptions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        {notes.length > 0 ? (
          <>
            <h3>Watch-outs</h3>
            <ul className="feature-list">
              {notes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </>
        ) : null}
      </div>
    </details>
  );
}

export function CompareCard({
  label,
  primaryValue,
  secondaryLabel,
  secondaryValue,
  recommended = false,
}: {
  label: string;
  primaryValue: number;
  secondaryLabel: string;
  secondaryValue: string;
  recommended?: boolean;
}) {
  return (
    <div className={`compare-card${recommended ? " recommended" : ""}`}>
      <p className="summary-label">{label}</p>
      <div className="summary-value">{formatRupees(primaryValue)}</div>
      <p className="summary-caption">
        {secondaryLabel}: {secondaryValue}
      </p>
    </div>
  );
}

export function PercentPill({ value }: { value: number }) {
  return <span className="tag">{formatPercent(value)}</span>;
}
