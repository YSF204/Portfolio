import './KaizenSignature.css'

export function KaizenSignature() {
  return (
    <section
      className="kaizen-signature structural-grid structural-dashed-t relative mx-auto h-[330px] w-full max-w-[760px] cursor-default overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#8B0000]/45"
      tabIndex={0}
      aria-label="Kaizen: continuous improvement; changing for the better"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,0,0,0.06),transparent_48%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(139,0,0,0.1),transparent_48%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 border-t border-dashed border-[#8B0000]/25 bg-[repeating-linear-gradient(315deg,rgba(139,0,0,0.18)_0,rgba(139,0,0,0.18)_1px,transparent_1px,transparent_10px)] dark:border-[#600000] dark:bg-[repeating-linear-gradient(315deg,rgba(255,255,255,0.12)_0,rgba(255,255,255,0.12)_1px,transparent_1px,transparent_10px)]" />

      <div className="absolute left-5 top-5 flex items-center gap-2.5 text-[9px] font-semibold uppercase text-zinc-400 dark:text-[#666]">
        <span className="font-mono text-[#8B0000] dark:text-[#c44]">改善</span>
        <span>Always improving</span>
      </div>

      <div className="kaizen-word absolute z-10 select-none" aria-hidden="true">
        <div className="group relative">
          <span
            className="pointer-events-none absolute inset-0 -z-10 block translate-x-3 translate-y-3 whitespace-nowrap text-center text-[clamp(6rem,20vw,10rem)] font-black italic leading-none text-transparent"
            style={{
              backgroundImage: 'repeating-linear-gradient(315deg, rgba(139,0,0,0.48) 0, rgba(139,0,0,0.48) 1px, transparent 1px, transparent 7px)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            改善
          </span>
          <span className="kaizen-foreground block -translate-x-3 -translate-y-3 whitespace-nowrap text-center text-[clamp(6rem,20vw,10rem)] font-black italic leading-none text-zinc-400 transition-all duration-300 dark:text-[#5b5b63]">
            改善
          </span>
        </div>
      </div>

      <div className="kaizen-card absolute z-20 w-[min(430px,56%)] rounded-2xl border border-zinc-200 bg-[#f8f8f9]/95 p-6 shadow-[0_22px_55px_rgba(24,24,27,0.16)] backdrop-blur-md dark:border-[#28282e] dark:bg-[#121214]/95 dark:shadow-[0_22px_55px_rgba(0,0,0,0.52)] sm:p-7">
        <div className="flex items-baseline gap-4">
          <strong className="text-2xl text-zinc-900 dark:text-[#f3f3f3]">改善</strong>
          <span className="text-sm italic text-zinc-400 dark:text-[#777]">/kaizen/</span>
        </div>
        <div className="my-5 h-px structural-dashed-t structural-grid" />
        <p className="m-0 text-[11px] font-semibold uppercase text-[#8B0000] dark:text-[#c44]">Noun</p>
        <p className="mb-0 mt-2 text-[15px] leading-7 text-zinc-600 dark:text-[#a2a2ab]">
          Continuous improvement; changing for the better.
        </p>
      </div>

      <p className="absolute bottom-4 left-5 z-10 m-0 font-mono text-[9px] text-zinc-400 dark:text-[#555]">
        HOVER OR FOCUS TO EXPLORE
      </p>
    </section>
  )
}
