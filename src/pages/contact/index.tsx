'use client'

import React, { useState } from 'react'
import {
  Mail,
  MapPin,
  Phone,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import ChatSupport from '@/components/common/chat-support'

const CONTACT_ADDRESS = 'Navi Mumbai, Maharashtra'
const CONTACT_EMAIL = 'bpp.headoffice@gmail.com'
const CONTACT_PHONE = '8828477674'

const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(CONTACT_ADDRESS)}&output=embed`

const bgHero =
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80' // Example bg image

const ContactPage = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const validate = () => {
    const newErrors = {
      name: '',
      phone: '',
      email: '',
      subject: '',
      message: '',
    }
    if (!form.name.trim()) newErrors.name = 'Name is required.'
    if (!form.phone.trim()) newErrors.phone = 'Phone is required.'
    if (!form.email.trim()) newErrors.email = 'Email is required.'
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      newErrors.email = 'Invalid email.'
    if (!form.subject.trim()) newErrors.subject = 'Subject is required.'
    if (!form.message.trim()) newErrors.message = 'Message is required.'
    setErrors(newErrors)
    return Object.values(newErrors).every((e) => !e)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.id]: e.target.value })
    setErrors({ ...errors, [e.target.id]: '' })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
      setForm({ name: '', phone: '', email: '', subject: '', message: '' })
    }, 1000)
  }

  return (
    <>
      {/* Hero Section */}
      <section
        className='relative flex min-h-[320px] items-center justify-center bg-cover bg-center'
        style={{ backgroundImage: `url(${bgHero})` }}
      >
        <div className='absolute inset-0 bg-black/50' />
        <div className='relative z-10 flex w-full flex-col items-center justify-center px-4 py-16 text-center text-white'>
          <h1 className='mb-4 text-4xl font-bold drop-shadow-lg md:text-5xl'>
            Contact us
          </h1>
          <p className='mx-auto max-w-2xl text-lg font-medium drop-shadow-lg md:text-2xl'>
            BPP is ready to provide the right solution according to your needs
          </p>
        </div>
      </section>
      {/* Card Section: Contact Info & Form */}
      <section className='container relative z-20 mx-auto -mt-20 mb-12 px-4'>
        <div className='mx-auto flex w-full max-w-5xl flex-col overflow-hidden bg-white dark:bg-zinc-900 sm:rounded-2xl sm:shadow-2xl dark:sm:shadow-zinc-800 md:flex-row'>
          {/* Left: Contact Info */}

          <div className='flex w-full flex-col justify-center gap-6 bg-white p-4 dark:bg-zinc-900 sm:p-8 md:w-1/2'>
            <h2 className='mb-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-100'>
              Get in touch
            </h2>
            <div className='flex flex-col gap-6'>
              <div className='flex items-start gap-4'>
                <span className='flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/40'>
                  <MapPin className='h-6 w-6' />
                </span>
                <div>
                  <p className='font-semibold text-zinc-900 dark:text-zinc-100'>
                    Head Office
                  </p>
                  <p className='text-sm text-muted-foreground dark:text-zinc-400'>
                    {CONTACT_ADDRESS}
                  </p>
                </div>
              </div>
              <div className='flex items-start gap-4'>
                <span className='flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/40'>
                  <Mail className='h-6 w-6' />
                </span>
                <div>
                  <p className='font-semibold text-zinc-900 dark:text-zinc-100'>
                    Email Us
                  </p>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className='text-sm text-blue-600 hover:underline dark:text-blue-400'
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>
              <div className='flex items-start gap-4'>
                <span className='flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/40'>
                  <Phone className='h-6 w-6' />
                </span>
                <div>
                  <p className='font-semibold text-zinc-900 dark:text-zinc-100'>
                    Call Us
                  </p>
                  <a
                    href={`tel:${CONTACT_PHONE}`}
                    className='text-sm text-blue-600 hover:underline dark:text-blue-400'
                  >
                    {CONTACT_PHONE}
                  </a>
                </div>
              </div>
            </div>
            <div className='mt-8'>
              <p className='mb-2 font-medium text-zinc-900 dark:text-zinc-100'>
                Follow our social media
              </p>
              <div className='flex gap-3'>
                <a
                  href='https://x.com/BharatiyaP20295'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group'
                >
                  <div className='flex h-8 w-8 items-center justify-center rounded-full bg-muted transition-colors group-hover:bg-primary group-hover:text-primary-foreground dark:bg-zinc-800'>
                    <TwitterIcon className='h-4 w-4' />
                  </div>
                </a>
                <a
                  href='https://www.facebook.com/profile.php?id=61570250152842'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group'
                >
                  <div className='flex h-8 w-8 items-center justify-center rounded-full bg-muted transition-colors group-hover:bg-primary group-hover:text-primary-foreground dark:bg-zinc-800'>
                    <FacebookIcon className='h-4 w-4' />
                  </div>
                </a>
                <a
                  href='https://www.instagram.com/bharatiya_popular_party'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group'
                >
                  <div className='flex h-8 w-8 items-center justify-center rounded-full bg-muted transition-colors group-hover:bg-primary group-hover:text-primary-foreground dark:bg-zinc-800'>
                    <InstagramIcon className='h-4 w-4' />
                  </div>
                </a>
                <a
                  href='https://www.linkedin.com/in/bharatiya-popular-party-b28543340/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group'
                >
                  <div className='flex h-8 w-8 items-center justify-center rounded-full bg-muted transition-colors group-hover:bg-primary group-hover:text-primary-foreground dark:bg-zinc-800'>
                    <LinkedinIcon className='h-4 w-4' />
                  </div>
                </a>
              </div>
            </div>
          </div>
          {/* Right: Contact Form */}
          <div className='flex w-full flex-col justify-center bg-gray-50 p-4 dark:bg-zinc-950 sm:p-8 md:w-1/2'>
            <h2 className='mb-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-100'>
              Send us a message
            </h2>
            <form
              className='flex flex-col gap-4'
              onSubmit={handleSubmit}
              noValidate
            >
              <div className='flex flex-col gap-4 sm:flex-row'>
                <div className='w-full sm:w-1/2'>
                  <Label htmlFor='name'>Name</Label>
                  <Input
                    type='text'
                    id='name'
                    placeholder='Name'
                    value={form.name}
                    onChange={handleChange}
                    required
                    aria-invalid={!!errors.name}
                    aria-describedby='name-error'
                    className={
                      errors.name
                        ? 'border-red-500 focus-visible:ring-red-500'
                        : ''
                    }
                  />
                  {errors.name && (
                    <p className='mt-1 text-xs text-red-500' id='name-error'>
                      {errors.name}
                    </p>
                  )}
                </div>
                <div className='w-full sm:w-1/2'>
                  <Label htmlFor='phone'>Phone</Label>
                  <Input
                    type='text'
                    id='phone'
                    placeholder='Phone'
                    value={form.phone}
                    onChange={handleChange}
                    required
                    aria-invalid={!!errors.phone}
                    aria-describedby='phone-error'
                    className={
                      errors.phone
                        ? 'border-red-500 focus-visible:ring-red-500'
                        : ''
                    }
                  />
                  {errors.phone && (
                    <p className='mt-1 text-xs text-red-500' id='phone-error'>
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>
              <div className='w-full'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  type='email'
                  id='email'
                  placeholder='Email'
                  value={form.email}
                  onChange={handleChange}
                  required
                  aria-invalid={!!errors.email}
                  aria-describedby='email-error'
                  className={
                    errors.email
                      ? 'border-red-500 focus-visible:ring-red-500'
                      : ''
                  }
                />
                {errors.email && (
                  <p className='mt-1 text-xs text-red-500' id='email-error'>
                    {errors.email}
                  </p>
                )}
              </div>
              <div className='w-full'>
                <Label htmlFor='subject'>Subject</Label>
                <Input
                  type='text'
                  id='subject'
                  placeholder='Subject'
                  value={form.subject}
                  onChange={handleChange}
                  required
                  aria-invalid={!!errors.subject}
                  aria-describedby='subject-error'
                  className={
                    errors.subject
                      ? 'border-red-500 focus-visible:ring-red-500'
                      : ''
                  }
                />
                {errors.subject && (
                  <p className='mt-1 text-xs text-red-500' id='subject-error'>
                    {errors.subject}
                  </p>
                )}
              </div>
              <div className='w-full'>
                <Label htmlFor='message'>Message</Label>
                <Textarea
                  id='message'
                  placeholder='Message'
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  required
                  aria-invalid={!!errors.message}
                  aria-describedby='message-error'
                  className={
                    errors.message
                      ? 'border-red-500 focus-visible:ring-red-500'
                      : ''
                  }
                />
                {errors.message && (
                  <p className='mt-1 text-xs text-red-500' id='message-error'>
                    {errors.message}
                  </p>
                )}
              </div>
              <Button
                className='w-full rounded-lg bg-blue-600 py-2 text-lg font-semibold text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800'
                type='submit'
                disabled={submitting}
              >
                {submitting ? 'Sending...' : 'Send'}
              </Button>
              {submitted && (
                <div className='mt-2 text-center text-sm font-medium text-green-600 dark:text-green-400'>
                  Thank you! Your message has been sent.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
      {/* Map Section */}
      <section className='w-full'>
        <iframe
          src={mapSrc}
          width='100%'
          height='400'
          style={{ border: 0 }}
          allowFullScreen={true}
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
          title='Google Map Location'
          className='bg-white dark:bg-zinc-900'
        ></iframe>
      </section>
      <Separator />
      <ChatSupport />
      <style>{`
        @media (max-width: 640px) {
          .max-w-3xl {
            border-radius: 0 !important;
            box-shadow: none !important;
          }
          .flex-col.md:flex-row {
            flex-direction: column !important;
          }
          .p-4.sm:p-8 {
            padding: 1rem !important;
          }
        }
      `}</style>
    </>
  )
}

export default ContactPage
