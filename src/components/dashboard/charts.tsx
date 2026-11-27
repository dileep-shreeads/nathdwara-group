"use client";

import { useState } from "react";
import { Table2, BarChart3 } from "lucide-react";

/** Validated with the dataviz palette checker (light surface): all checks pass. */
export const SERIES = { primary: "#2e4bb0", secondary: "#c48a00" };

function niceMax(value: number) {
  if (value <= 0) return 1;
  const pow = 10 ** Math.floor(Math.log10(value));
  const step = [1, 2, 2.5, 5, 10].find((s) => s * pow >= value / 4)! * pow;
  return Math.ceil(value / step) * step;
}

function ViewToggle({ table, onToggle }: { table: boolean; onToggle: () => void }) {
  return (
    <button type="button" onClick={onToggle} className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-semibold text-slate-500 hover:bg-soft hover:text-primary">
      {table ? <BarChart3 className="h-3.5 w-3.5" /> : <Table2 className="h-3.5 w-3.5" />}
      {table ? "View chart" : "View as table"}
    </button>
  );
}

function SimpleTable({ head, rows }: { head: string[]; rows: (string | number)[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="text-xs uppercase tracking-wide text-slate-500">
          <tr>{head.map((h) => <th key={h} className="border-b border-line px-3 py-2 font-semibold">{h}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-line">
          {rows.map((row) => (
            <tr key={String(row[0])}>{row.map((cell, i) => <td key={i} className={`px-3 py-2 ${i > 0 ? "tabular-nums" : ""}`}>{cell}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Single-series column chart. The card title names the series, so no legend. */
export function ColumnChart({ data, valueLabel, format = (v) => String(v), height = 220 }: {
  data: { label: string; value: number; detail?: string }[];
  valueLabel: string;
  format?: (value: number) => string;
  height?: number;
}) {
  const [table, setTable] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const max = niceMax(Math.max(...data.map((d) => d.value)) * 1.15);
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => t * max);
  const peak = data.reduce((best, d, i) => (d.value > data[best].value ? i : best), 0);

  return (
    <div>
      <div className="mb-2 flex justify-end">
        <ViewToggle table={table} onToggle={() => setTable(!table)} />
      </div>
      {table ? (
        <SimpleTable head={["Period", valueLabel]} rows={data.map((d) => [d.label, format(d.value)])} />
      ) : (
        <div className="flex gap-2">
          <div className="relative w-10 shrink-0 text-right text-[11px] tabular-nums text-slate-400" style={{ height }}>
            {ticks.map((t) => (
              <span key={t} className="absolute right-0 -translate-y-1/2" style={{ bottom: `${(t / max) * 100}%`, transform: "translateY(50%)" }}>
                {format(t)}
              </span>
            ))}
          </div>
          <div className="relative min-w-0 flex-1">
            <div className="relative" style={{ height }}>
              {ticks.map((t) => (
                <div key={t} className="absolute inset-x-0 border-t border-line" style={{ bottom: `${(t / max) * 100}%` }} />
              ))}
              <div className="absolute inset-0 flex items-end">
                {data.map((d, i) => (
                  <div
                    key={d.label}
                    className="relative flex h-full flex-1 items-end justify-center outline-none"
                    tabIndex={0}
                    aria-label={`${d.label}: ${format(d.value)} ${valueLabel}`}
                    onMouseEnter={() => setActive(i)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(i)}
                    onBlur={() => setActive(null)}
                  >
                    {active === i ? <div className="absolute inset-y-0 inset-x-0.5 rounded bg-primary/[0.04]" /> : null}
                    <div
                      className="relative w-[60%] max-w-6 rounded-t transition-opacity"
                      style={{ height: `${(d.value / max) * 100}%`, background: SERIES.primary, opacity: active === null || active === i ? 1 : 0.55, minHeight: d.value > 0 ? 2 : 0 }}
                    />
                    {i === peak && active === null ? (
                      <span className="absolute -translate-y-1 text-[11px] font-semibold tabular-nums text-slate-700" style={{ bottom: `${(d.value / max) * 100}%` }}>
                        {format(d.value)}
                      </span>
                    ) : null}
                    {active === i ? (
                      <div className="pointer-events-none absolute z-10 -translate-y-2 whitespace-nowrap rounded-lg bg-primary px-3 py-2 text-xs text-white shadow-lg" style={{ bottom: `${(d.value / max) * 100}%` }}>
                        <p className="font-semibold">{d.label}</p>
                        <p className="tabular-nums text-white/80">
                          {format(d.value)} {valueLabel}
                        </p>
                        {d.detail ? <p className="text-white/60">{d.detail}</p> : null}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-2 flex">
              {data.map((d, i) => (
                <span key={d.label} className={`flex-1 truncate text-center text-[11px] ${active === i ? "font-semibold text-primary" : "text-slate-500"}`}>
                  {d.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/** Horizontal ranking bars — single series, value printed at the end of each bar. */
export function BarList({ data, format = (v) => String(v) }: { data: { label: string; value: number; sub?: string }[]; format?: (value: number) => string }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <ul className="space-y-3">
      {data.map((d) => (
        <li key={d.label} title={`${d.label}: ${format(d.value)}`}>
          <div className="mb-1 flex items-baseline justify-between gap-3 text-sm">
            <span className="truncate font-medium text-slate-700">
              {d.label}
              {d.sub ? <span className="ml-1.5 text-xs font-normal text-slate-400">{d.sub}</span> : null}
            </span>
            <span className="shrink-0 font-semibold tabular-nums text-slate-800">{format(d.value)}</span>
          </div>
          <div className="h-2.5 rounded-full bg-soft">
            <div className="h-full rounded-full" style={{ width: `${Math.max((d.value / max) * 100, d.value > 0 ? 2 : 0)}%`, background: SERIES.primary }} />
          </div>
        </li>
      ))}
    </ul>
  );
}

/** Two-part horizontal bars (e.g. collected vs outstanding) with a legend. */
export function SplitBars({ data, labels, format }: {
  data: { label: string; a: number; b: number }[];
  labels: [string, string];
  format: (value: number) => string;
}) {
  const [table, setTable] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const max = Math.max(...data.map((d) => d.a + d.b), 1);
  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-4 text-xs text-slate-600">
          {labels.map((label, i) => (
            <span key={label} className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm" style={{ background: i === 0 ? SERIES.primary : SERIES.secondary }} />
              {label}
            </span>
          ))}
        </div>
        <ViewToggle table={table} onToggle={() => setTable(!table)} />
      </div>
      {table ? (
        <SimpleTable head={["College", labels[0], labels[1]]} rows={data.map((d) => [d.label, format(d.a), format(d.b)])} />
      ) : (
        <ul className="space-y-3.5">
          {data.map((d) => {
            const total = d.a + d.b;
            return (
              <li
                key={d.label}
                tabIndex={0}
                className="relative outline-none"
                onMouseEnter={() => setActive(d.label)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(d.label)}
                onBlur={() => setActive(null)}
                aria-label={`${d.label}: ${labels[0]} ${format(d.a)}, ${labels[1]} ${format(d.b)}`}
              >
                <div className="mb-1 flex justify-between text-sm">
                  <span className="font-medium text-slate-700">{d.label}</span>
                  <span className="tabular-nums text-slate-500">{total ? Math.round((d.a / total) * 100) : 0}% {labels[0].toLowerCase()}</span>
                </div>
                <div className="flex h-3 gap-0.5" style={{ width: `${(total / max) * 100}%` }}>
                  {d.a > 0 ? <div className="h-full rounded-l-sm first:rounded-l last:rounded-r" style={{ flex: d.a, background: SERIES.primary }} /> : null}
                  {d.b > 0 ? <div className="h-full rounded-r-sm first:rounded-l last:rounded-r" style={{ flex: d.b, background: SERIES.secondary }} /> : null}
                </div>
                {active === d.label ? (
                  <div className="pointer-events-none absolute right-0 top-0 z-10 -translate-y-full rounded-lg bg-primary px-3 py-2 text-xs text-white shadow-lg">
                    <p className="font-semibold">{d.label}</p>
                    <p className="tabular-nums text-white/80">{labels[0]}: {format(d.a)}</p>
                    <p className="tabular-nums text-white/80">{labels[1]}: {format(d.b)}</p>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
