import React from 'react'
import { Button } from '@/components/ui/button.tsx'
import { ArrowUp } from 'lucide-react'
import { useForm } from 'react-hook-form'

export type ChatFormData = {
  prompt: string
}

type Props = {
  onSubmit: (data: ChatFormData) => void
}

const ChatInput = ({ onSubmit }: Props) => {
  const { register, handleSubmit, reset, formState } = useForm<ChatFormData>()

  const submit = handleSubmit((data) => {
    reset({ prompt: '' })
    onSubmit(data)
  })

  const onKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  return (
    <form
      onSubmit={submit}
      onKeyDown={onKeyDown}
      className="flex flex-col gap-2 items-end border-2 p-4 rounded-3xl"
    >
      <textarea
        {...register('prompt', {
          required: true,
          validate: (value) => value.trim().length > 0,
        })}
        autoFocus
        className={'w-full border-none focus:outline-none resize-none'}
        placeholder={'Ask anything'}
        maxLength={1000}
      />
      <Button
        disabled={!formState.isValid}
        size={'icon'}
        className={'rounded-full cursor-pointer'}
      >
        <ArrowUp />
      </Button>
    </form>
  )
}

export default ChatInput
