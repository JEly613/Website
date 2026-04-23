'use client'

import { useState, FormEvent } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setStatus('submitting')

    try {
      const response = await fetch('https://formspree.io/f/xvzwpyyy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
        setErrors({})
      } else {
        setStatus('error')
      }
    } catch (error) {
      setStatus('error')
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const inputBase = 'w-full px-4 py-3 bg-bg border rounded-sharp focus:outline-none focus:ring-2 transition-all text-text'
  const inputValid = 'border-border/40 focus:ring-accent-2/30 focus:border-accent-2'
  const inputError = 'border-accent focus:ring-accent/20'

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-text mb-2 uppercase tracking-wider">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`${inputBase} ${errors.name ? inputError : inputValid}`}
            disabled={status === 'submitting'}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-accent">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text mb-2 uppercase tracking-wider">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`${inputBase} ${errors.email ? inputError : inputValid}`}
            disabled={status === 'submitting'}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-accent">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-text mb-2 uppercase tracking-wider">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={6}
            className={`${inputBase} resize-none ${errors.message ? inputError : inputValid}`}
            disabled={status === 'submitting'}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-accent">{errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full px-6 py-3 bg-accent text-white font-medium rounded-sharp hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-pop/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider text-sm group relative overflow-hidden"
        >
          <span className="relative z-10">{status === 'submitting' ? 'Sending...' : 'Send Message'}</span>
          <div className="absolute inset-0 bg-gradient-to-r from-accent via-soft-pop to-pop opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </form>

      {status === 'success' && (
        <div className="mt-6 p-4 bg-accent-2/10 border border-accent-2/30 rounded-sharp">
          <p className="text-detail text-sm">
            Thank you for your message! I&apos;ll get back to you soon.
          </p>
        </div>
      )}

      {status === 'error' && (
        <div className="mt-6 p-4 bg-accent/10 border border-accent/30 rounded-sharp">
          <p className="text-accent text-sm">
            Something went wrong. Please try again or email me directly.
          </p>
        </div>
      )}
    </div>
  )
}
