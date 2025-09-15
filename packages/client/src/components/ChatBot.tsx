import React from 'react'
import { Button } from '@/components/ui/button.tsx'
import { ArrowUp } from 'lucide-react'
import { useForm } from 'react-hook-form'

type FormData = {
  prompt: string
}

const ChatBot = () => {
  const { register, handleSubmit, reset, formState } = useForm<FormData>()

  const onSubmit = (data: FormData) => {
    console.log(data)
    reset()
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(onSubmit)()
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={onKeyDown}
      className="flex flex-col gap-2 items-end border-2 p-4 rounded-3xl container mx-auto"
    >
      <textarea
        {...register('prompt', {
          required: true,
          validate: (value) => value.trim().length > 0,
        })}
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

export default ChatBot
