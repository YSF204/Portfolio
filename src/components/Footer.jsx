import { AnimatedRow, Button } from './ui'

export function Footer() {
  return (
    <>
      <AnimatedRow containerClass="p-8" topBorder={true} bottomBorder={false}>
        <div className="border border-dashed border-[#8B0000]/70 dark:border-[#600000] rounded-xl bg-white dark:bg-[#0d0d0f] p-5 flex items-center justify-between">
          <div>
            <h3 className="text-[14px] font-semibold text-zinc-900 dark:text-[#f3f3f3]">Gears I use</h3>
            <p className="text-[12px] text-zinc-500 mt-1">Here are the gears I use for my work.</p>
          </div>
          <Button>View</Button>
        </div>
      </AnimatedRow>
      <AnimatedRow containerClass="text-center py-16" bottomBorder={false} className="!border-b-0">
        <p className="text-[14px] text-zinc-600 dark:text-[#a2a2ab]">If you've read this far, you might be interested in what I do.</p>
        <div className="flex justify-center mt-6">
          <Button className="px-6 py-2.5">Let's Connect</Button>
        </div>
        <blockquote className="mt-14 text-[13px] italic text-zinc-500 leading-relaxed">
          "Knowing yourself is the beginning of all wisdom."
          <span className="block mt-2.5 font-semibold not-italic text-zinc-400">— Aristotle</span>
        </blockquote>
        <div className="mt-12 text-[11px] text-zinc-500">
          <p>Design and Developed by <span className="text-pink-500 font-medium cursor-pointer">harxhitbuilds</span></p>
          <p className="mt-1.5 text-zinc-400 dark:text-[#7e7e89]">2026 All rights reserved.</p>
        </div>
      </AnimatedRow>
    </>
  )
}
