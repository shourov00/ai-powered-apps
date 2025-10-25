import { cn } from '@/lib/utils.ts'

const TypingIndicator = () => {
  return (
    <div className={'flex self-start gap-1 p-3 bg-gray-200 rounded-xl'}>
      <div className={'w-2 h-2 rounded-full bg-gray-800 animate-pulse'} />
      <Dot className={'[animation-delay:0.2s]'} />
      <Dot className={'[animation-delay:0.4s]'} />
    </div>
  )
}

type DotProps = {
  className?: string
}

const Dot = ({ className }: DotProps) => (
  <div
    className={cn('w-2 h-2 rounded-full bg-gray-800 animate-pulse', className)}
  />
)

export default TypingIndicator
