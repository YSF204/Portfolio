import { Row } from './ui'

export function TopHeader() {
  return (
    <Row dotPattern={true} containerClass="h-[160px] flex items-center justify-center">
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-zinc-500 dark:text-[#a2a2ab] font-bold text-[20px] tracking-wide relative z-10">@YSF204</p>
      </div>
    </Row>
  )
}
