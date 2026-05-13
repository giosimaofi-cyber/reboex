import { ArrowRight } from 'lucide-react'
import { cn } from '../../lib/utils'

interface MotionButtonProps {
  label: string
  onClick?: () => void
  className?: string
}

export function MotionButton({ label, onClick, className }: MotionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'group relative h-auto w-52 cursor-pointer rounded-full p-1 outline-none bg-white border border-neutral-200 hover:border-neutral-300 transition-colors',
        className
      )}
    >
      <span
        className="circle block h-12 w-12 overflow-hidden rounded-full duration-500 group-hover:w-full bg-black"
        aria-hidden="true"
      />
      <div className="icon absolute top-1/2 left-4 translate-x-0 -translate-y-1/2 duration-500 group-hover:translate-x-1.5">
        <ArrowRight className="text-white size-5" />
      </div>
      <span className="button-text absolute top-1/2 left-1/2 ml-4 -translate-x-1/2 -translate-y-1/2 text-center text-base font-medium tracking-tight whitespace-nowrap duration-500 text-black group-hover:text-white">
        {label}
      </span>
    </button>
  )
}
