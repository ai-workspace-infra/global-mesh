'use client';

import React, { useState } from 'react';

export default function GlobalMeshPage() {
  const [activeTab, setActiveTab] = useState<'nodes' | 'vendors' | 'regions'>('nodes');
  const [hoveredCountry, setHoveredCountry] = useState<string>('Japan: 142.9k 请求 · 12 PoPs');

  return (
    <main className="max-w-6xl mx-auto p-4 sm:p-6 space-y-7">
      {/* 1. Header Profile */}
      <div className="flex flex-col items-center justify-center pt-2 pb-1 text-center select-none">
        <div className="w-[84px] h-[84px] rounded-full flex items-center justify-center text-white text-3xl font-bold tracking-tight shadow-xs mb-3 bg-[#d95300]">
          HP
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Haitao Pan</h1>
        <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-500">
          <span className="font-mono">@da93628bc13d47af9a</span>
          <span>·</span>
          <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200">
            Plus · Next.js SSR + Cloud Run Go + Supabase PG
          </span>
        </div>
      </div>

      {/* 2. Five-Column Metric Capsule Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800 py-4 px-4 text-center">
          <div className="py-2 px-3">
            <div className="text-2xl md:text-[28px] font-bold">5 大</div>
            <div className="text-xs text-slate-500 mt-1 font-medium">核心 VPS 运营商</div>
          </div>
          <div className="py-2 px-3">
            <div className="text-2xl md:text-[28px] font-bold">48 个</div>
            <div className="text-xs text-slate-500 mt-1 font-medium">全球实时活跃 PoP</div>
          </div>
          <div className="py-2 px-3">
            <div className="text-2xl md:text-[28px] font-bold">&lt; 32 ms</div>
            <div className="text-xs text-slate-500 mt-1 font-medium">多云最优接入延时</div>
          </div>
          <div className="py-2 px-3">
            <div className="text-2xl md:text-[28px] font-bold">0 端口</div>
            <div className="text-xs text-slate-500 mt-1 font-medium">公网入站暴露 (ZTNA)</div>
          </div>
          <div className="py-2 px-3 col-span-2 sm:col-span-1">
            <div className="text-2xl md:text-[28px] font-bold text-blue-600">100%</div>
            <div className="text-xs text-slate-500 mt-1 font-medium">骨干区域交叉容灾</div>
          </div>
        </div>
      </div>

      {/* 3. Traffic Sparklines (Requests, Bandwidth, Visitors) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs flex flex-col justify-between overflow-hidden">
          <div>
            <span className="text-xs text-slate-500 font-medium">请求</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">225.58k</span>
              <span className="text-xs font-semibold text-emerald-600">↗ 26.1%</span>
            </div>
          </div>
          <div className="mt-3 -mx-4 -mb-4 h-11">
            <svg className="w-full h-full" viewBox="0 0 300 45" preserveAspectRatio="none">
              <path d="M0,38 L15,40 L38,22 L68,20 L82,18 L128,15 L158,35 L188,18 L225,20 L270,19 L292,8 L300,32" fill="none" stroke="#3b82f6" strokeWidth="1.6"></path>
            </svg>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs flex flex-col justify-between overflow-hidden">
          <div>
            <span className="text-xs text-slate-500 font-medium">带宽</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">3.11 GB</span>
              <span className="text-xs font-semibold text-emerald-600">↗ 11.0%</span>
            </div>
          </div>
          <div className="mt-3 -mx-4 -mb-4 h-11">
            <svg className="w-full h-full" viewBox="0 0 300 45" preserveAspectRatio="none">
              <path d="M0,35 L30,36 L60,25 L100,24 L130,35 L160,19 L200,34 L230,27 L270,16 L300,36" fill="none" stroke="#3b82f6" strokeWidth="1.6"></path>
            </svg>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs flex flex-col justify-between overflow-hidden">
          <div>
            <span className="text-xs text-slate-500 font-medium">访问量</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">27.41k</span>
              <span className="text-xs font-semibold text-emerald-600">↗ 29.5%</span>
            </div>
          </div>
          <div className="mt-3 -mx-4 -mb-4 h-11">
            <svg className="w-full h-full" viewBox="0 0 300 45" preserveAspectRatio="none">
              <path d="M0,37 L30,31 L60,33 L100,37 L130,31 L160,36 L200,35 L230,30 L280,14 L300,33" fill="none" stroke="#3b82f6" strokeWidth="1.6"></path>
            </svg>
          </div>
        </div>
      </div>

      {/* 4. Geographic Map & Country List */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 md:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
          <h3 className="text-base font-semibold">Requests by country / 节点与流量地理分布</h3>
          <span className="text-xs font-mono text-slate-500">Live Geo-IP Map · 177 Countries</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 bg-slate-50/70 dark:bg-slate-950/40 rounded-xl p-3 border border-slate-200 dark:border-slate-800">
            <iframe 
              src="/map-embed.html" 
              className="w-full h-[360px] border-0 rounded-lg"
              title="Global Mesh Vector Map"
            />
          </div>

          <div className="lg:col-span-5 space-y-2 text-xs select-none pr-1">
            {[
              { name: 'Japan', req: '142.9k', pct: '82%', pops: '12 PoPs' },
              { name: 'United States', req: '59.91k', pct: '48%', pops: '14 PoPs' },
              { name: 'Philippines', req: '21.08k', pct: '22%', pops: '1 PoP' },
              { name: 'Netherlands', req: '13.43k', pct: '14%', pops: '4 PoPs' },
              { name: 'Hong Kong', req: '8.44k', pct: '10%', pops: '3 PoPs' },
              { name: 'Germany', req: '8.24k', pct: '9.8%', pops: '8 PoPs' },
              { name: 'India', req: '6.99k', pct: '8.5%', pops: '3 PoPs' },
              { name: 'China', req: '6.07k', pct: '7.6%', pops: '2 PoPs' },
              { name: 'Singapore', req: '4.76k', pct: '6.2%', pops: '5 PoPs' },
              { name: 'Israel', req: '4.47k', pct: '5.8%', pops: '1 PoP' },
              { name: 'Italy', req: '3.14k', pct: '4.2%', pops: '2 PoPs' },
              { name: 'Canada', req: '2.86k', pct: '3.9%', pops: '2 PoPs' }
            ].map((c) => (
              <div 
                key={c.name}
                className="flex items-center justify-between gap-3 p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                onMouseEnter={() => setHoveredCountry(`${c.name}: ${c.req} 请求 · ${c.pops}`)}
              >
                <span className="w-24 truncate font-medium">{c.name}</span>
                <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: c.pct }}></div>
                </div>
                <span className="w-14 text-right font-mono text-slate-500 font-medium">{c.req}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Security & Zero Trust Telemetry */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3">
        <div className="pb-1 border-b border-slate-200 dark:border-slate-800">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            安全性 (Security &amp; Zero Trust Telemetry)
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800 text-left">
          <div className="pt-2 md:pt-0 px-3">
            <span className="text-[11px] text-slate-500">加密请求数</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl md:text-2xl font-bold">214.95k</span>
              <span className="text-xs font-semibold text-emerald-600">↗ 28.9%</span>
            </div>
          </div>
          <div className="pt-2 md:pt-0 px-3">
            <span className="text-[11px] text-slate-500">加密请求率</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl md:text-2xl font-bold">95.29%</span>
              <span className="text-xs font-semibold text-emerald-600">↗ 2.2%</span>
            </div>
          </div>
          <div className="pt-2 md:pt-0 px-3">
            <span className="text-[11px] text-slate-500">加密带宽</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl md:text-2xl font-bold">3.05 GB</span>
              <span className="text-xs font-semibold text-emerald-600">↗ 9.3%</span>
            </div>
          </div>
          <div className="pt-2 md:pt-0 px-3">
            <span className="text-[11px] text-slate-500">加密带宽率</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl md:text-2xl font-bold">97.90%</span>
              <span className="text-xs font-semibold text-rose-500">↘ 1.6%</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
