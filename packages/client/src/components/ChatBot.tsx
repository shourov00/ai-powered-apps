import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import { Button } from '@/components/ui/button.tsx'
import { ArrowUp } from 'lucide-react'
import { useForm } from 'react-hook-form'

type FormData = {
  prompt: string
}

type ChatResponse = {
  message: string
}

type Message = {
  content: string
  role: 'user' | 'bot'
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [isBotTyping, setIsBotTyping] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const lastMessageRef = useRef<HTMLDivElement | null>(null)

  const conversationId = useRef(crypto.randomUUID())
  const { register, handleSubmit, reset, formState } = useForm<FormData>()

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const onSubmit = async ({ prompt }: FormData) => {
    try {
      setMessages((prev) => [...prev, { content: prompt, role: 'user' }])
      setIsBotTyping(true)
      setError('')

      reset({ prompt: '' })

      const { data } = await axios.post<ChatResponse>('/api/chat', {
        prompt,
        conversationId: conversationId.current,
      })
      setMessages((prev) => [...prev, { content: data.message, role: 'bot' }])
    } catch (error) {
      console.log(error)
      setError('Something went wrong. Please try again.')
    } finally {
      setIsBotTyping(false)
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(onSubmit)()
    }
  }

  const onCopy = (e: React.ClipboardEvent) => {
    const selection = window.getSelection()?.toString()?.trim()
    if (selection) {
      e.preventDefault()
      e.clipboardData.setData('text/plain', selection)
    }
  }

  return (
    <div className={'flex flex-col h-full'}>
      <div className={'flex flex-col flex-1 gap-3 mb-10 overflow-y-auto'}>
        {messages.map((message, index) => (
          <div
            key={index}
            ref={index === messages.length - 1 ? lastMessageRef : null}
            onCopy={onCopy}
            className={`px-3 py-1 rounded-xl ${
              message.role === 'user'
                ? 'bg-blue-600 text-white self-end'
                : 'bg-gray-100 text-black self-start'
            }`}
          >
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        ))}
        {isBotTyping && (
          <div className={'flex self-start gap-1 p-3 bg-gray-200 rounded-xl'}>
            <div className={'w-2 h-2 rounded-full bg-gray-800 animate-pulse'} />
            <div
              className={
                'w-2 h-2 rounded-full bg-gray-800 animate-pulse [animation-delay:0.2s]'
              }
            />
            <div
              className={
                'w-2 h-2 rounded-full bg-gray-800 animate-pulse [animation-delay:0.4s]'
              }
            />
          </div>
        )}
        {error && <p className={'text-red-500'}>{error}</p>}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
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
    </div>
  )
}

export default ChatBot
