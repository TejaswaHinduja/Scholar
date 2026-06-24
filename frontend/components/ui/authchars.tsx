import { useState, useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { useForm } from 'react-hook-form'

type FormValues = {
  name?: string
  email: string
  password: string
}

interface AuthCharactersProps {
  type?: string
  onSubmit?: (data: FormValues) => Promise<void>
}

type CharacterFigureProps = {
  bodyColor: string
  strokeColor: string
  width: number
  height: number
  svgRef?: React.RefObject<SVGSVGElement | null>
  bodyPath: string
  lookAwayOffset: { x: number; y: number; normX: number }
  eyeLift: number
  eyeShift: number
  isBlinking: boolean
  isShaking: boolean
  isSad: boolean
  leftEyeBase: number
  rightEyeBase: number
  leftEyeScale: number
  rightEyeScale: number
  mouthShift: number
}

function CharacterFigure({
  bodyColor, strokeColor, width, height, svgRef,
  bodyPath, lookAwayOffset, eyeLift, eyeShift,
  isBlinking, isShaking, isSad,
  leftEyeBase, rightEyeBase, leftEyeScale, rightEyeScale, mouthShift,
}: CharacterFigureProps) {
  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      viewBox="0 0 260 460"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        d={bodyPath}
        fill={bodyColor}
        stroke={strokeColor}
        strokeWidth="3"
        animate={{ d: bodyPath }}
        transition={{ type: 'spring', stiffness: 180, damping: 18 }}
      />
      <motion.g
        animate={{
          x: eyeShift,
          y: eyeLift,
          rotate: isShaking ? [0, -5, 5, -5, 5, 0] : 0,
        }}
        transition={{
          x: { type: 'spring', stiffness: 180, damping: 18 },
          y: { type: 'spring', stiffness: 180, damping: 18 },
          rotate: { duration: 0.5 },
        }}
        style={{ originX: '50%', originY: '50%' }}
      >
        <motion.ellipse
          cx={leftEyeBase + lookAwayOffset.x * 0.5}
          cy={120 + lookAwayOffset.y * 0.5}
          rx={10 * leftEyeScale}
          ry={isBlinking ? 1 : 10}
          fill="#1a1a1a"
          animate={{ cx: leftEyeBase + lookAwayOffset.x * 0.5, cy: 120 + lookAwayOffset.y * 0.5 }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        />
        <motion.ellipse
          cx={rightEyeBase + lookAwayOffset.x * 0.5}
          cy={120 + lookAwayOffset.y * 0.5}
          rx={10 * rightEyeScale}
          ry={isBlinking ? 1 : 10}
          fill="#1a1a1a"
          animate={{ cx: rightEyeBase + lookAwayOffset.x * 0.5, cy: 120 + lookAwayOffset.y * 0.5 }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        />
        <motion.circle
          cx={leftEyeBase + lookAwayOffset.x * 0.5 - 3}
          cy={120 + lookAwayOffset.y * 0.5 - 3}
          r={3 * leftEyeScale}
          fill="#fff"
          animate={{ cx: leftEyeBase + lookAwayOffset.x * 0.5 - 3, cy: 120 + lookAwayOffset.y * 0.5 - 3 }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        />
        <motion.circle
          cx={rightEyeBase + lookAwayOffset.x * 0.5 - 3}
          cy={120 + lookAwayOffset.y * 0.5 - 3}
          r={3 * rightEyeScale}
          fill="#fff"
          animate={{ cx: rightEyeBase + lookAwayOffset.x * 0.5 - 3, cy: 120 + lookAwayOffset.y * 0.5 - 3 }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        />
        <motion.path
          d={
            isSad
              ? `M${93 + mouthShift} 185 Q${112 + mouthShift} 175 ${135 + mouthShift} 185`
              : `M${93 + mouthShift} 175 Q${112 + mouthShift} 195 ${135 + mouthShift} 175`
          }
          stroke="#1a1a1a"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          animate={{
            d: isSad
              ? `M${93 + mouthShift} 185 Q${112 + mouthShift} 175 ${135 + mouthShift} 185`
              : `M${93 + mouthShift} 175 Q${112 + mouthShift} 195 ${135 + mouthShift} 175`,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        />
      </motion.g>
    </svg>
  )
}

export function AuthCharacters({ type = 'login', onSubmit }: AuthCharactersProps) {
  const isSignup = type === 'signup'

  const [showPassword, setShowPassword] = useState(false)
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0, normX: 0 })
  const [isFocused, setIsFocused] = useState(false)
  const [isPasswordFocused, setIsPasswordFocused] = useState(false)
  const [isBlinking, setIsBlinking] = useState(false)
  const [lookAwayOffset, setLookAwayOffset] = useState({ x: 0, y: 0, normX: 0 })
  const [isShaking, setIsShaking] = useState(false)
  const [isSad, setIsSad] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const characterRef = useRef<SVGSVGElement>(null)

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!characterRef.current) return
      const rect = characterRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height * 0.38

      const dx = e.clientX - centerX
      const dy = e.clientY - centerY
      const distance = Math.sqrt(dx * dx + dy * dy)
      const maxOffset = 8

      const x = (dx / Math.max(distance, 1)) * Math.min(distance / 40, maxOffset)
      const y = (dy / Math.max(distance, 1)) * Math.min(distance / 40, maxOffset)
      const normX = Math.max(-1, Math.min(1, dx / 300))

      setEyeOffset({ x, y, normX })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const scheduleBlink = () => {
      const randomDelay = Math.random() * 3000 + 2000
      return setTimeout(() => {
        setIsBlinking(true)
        setTimeout(() => setIsBlinking(false), 150)
      }, randomDelay)
    }

    let timeoutId = scheduleBlink()
    const intervalId = setInterval(() => {
      timeoutId = scheduleBlink()
    }, 5000)

    return () => {
      clearTimeout(timeoutId)
      clearInterval(intervalId)
    }
  }, [])

  useEffect(() => {
    const targetOffset = isPasswordFocused ? { x: -15, y: -8, normX: -0.6 } : eyeOffset
    setLookAwayOffset(targetOffset)
  }, [isPasswordFocused, eyeOffset])

  const faceShift = lookAwayOffset.normX * 12
  const eyeGap = 45 - lookAwayOffset.normX * 10
  const leftEyeBase = 100 + faceShift - eyeGap / 2
  const rightEyeBase = 100 + faceShift + eyeGap / 2
  const leftEyeScale = 1 - lookAwayOffset.normX * 0.15
  const rightEyeScale = 1 + lookAwayOffset.normX * 0.15
  const mouthShift = faceShift * 0.8

  const handleFocus = () => setIsFocused(true)
  const handleBlur = () => setIsFocused(false)

  // Password focus → body leans back (negative topShift/bend); other field → lean forward
  const bend = isPasswordFocused ? -50 : (isFocused ? 60 : 0)
  const topShift = isPasswordFocused ? -25 : (isFocused ? 50 : 0)
  const eyeLift = isPasswordFocused ? 8 : (isFocused ? -30 : 0)
  const eyeShift = isPasswordFocused ? -12 : (isFocused ? 25 : 0)

  const left = 33
  const right = 167
  const top = 30
  const bottom = 430

  const bodyPath = `
    M ${left + topShift} ${top}
    L ${right + topShift} ${top}
    C ${right} ${top + 60} ${right - bend * 0.4} ${(top + bottom) / 2} ${right} ${bottom}
    L ${left} ${bottom}
    C ${left - bend * 0.4} ${bottom - 60} ${left - bend * 0.3} ${(top + bottom) / 2} ${left + topShift} ${top}
    Z
  `

  const handleFormSubmit = async (data: FormValues) => {
    if (!onSubmit) return
    try {
      await onSubmit(data)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong'
      setSubmitError(message)
      setIsShaking(true)
      setIsSad(true)
      setTimeout(() => {
        setIsShaking(false)
        setIsSad(false)
      }, 1500)
    }
  }

  const inputClass = (hasError?: boolean) =>
    `w-full appearance-none bg-white border ${hasError ? 'border-red-400' : 'border-gray-200'} rounded-full px-5 py-3 text-gray-900 text-sm font-[inherit] placeholder:text-gray-400 outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all`

  const sharedCharProps = {
    bodyPath, lookAwayOffset, eyeLift, eyeShift,
    isBlinking, isShaking, isSad,
    leftEyeBase, rightEyeBase, leftEyeScale, rightEyeScale, mouthShift,
  }

  return (
    <div className="flex w-screen h-screen">
      {/* Left panel — three characters bottom-aligned */}
      <div className="w-1/2 h-full bg-[#dbeafe] flex items-end justify-center gap-4 overflow-hidden">
        <CharacterFigure
          {...sharedCharProps}
          bodyColor="#f472b6"
          strokeColor="#ec4899"
          width={168}
          height={300}
        />
        <CharacterFigure
          {...sharedCharProps}
          bodyColor="#E8751A"
          strokeColor="#D4650F"
          width={260}
          height={460}
          svgRef={characterRef}
        />
        <CharacterFigure
          {...sharedCharProps}
          bodyColor="#4ade80"
          strokeColor="#22c55e"
          width={168}
          height={300}
        />
      </div>

      {/* Right panel — form */}
      <div className="w-1/2 h-full bg-white flex items-center justify-center">
        <div className="w-full max-w-md px-8">
          <h1 className="text-gray-900 text-3xl font-semibold tracking-tight mb-2">
            {isSignup ? 'Create an account' : 'Welcome back'}
          </h1>
          <p className="text-gray-500 text-sm mb-10">
            {isSignup ? 'Sign up to get started.' : 'Enter your credentials.'}
          </p>

          <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
            {isSignup && (
              <div className="mb-5">
                <label htmlFor="name" className="block text-gray-500 text-xs font-medium uppercase tracking-wider mb-2">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  autoComplete="off"
                  {...register('name', { required: isSignup ? 'Name is required' : false })}
                  onFocus={handleFocus}
                  onBlur={(e) => { register('name').onBlur(e); handleBlur() }}
                  className={inputClass(!!errors.name)}
                />
                {errors.name && <p className="text-red-500 text-xs mt-2 ml-5">{errors.name.message}</p>}
              </div>
            )}

            <div className="mb-5">
              <label htmlFor="email" className="block text-gray-500 text-xs font-medium uppercase tracking-wider mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                autoComplete="off"
                {...register('email', { required: 'Email is required' })}
                onFocus={handleFocus}
                onBlur={(e) => { register('email').onBlur(e); handleBlur() }}
                className={inputClass(!!errors.email)}
              />
              {errors.email && <p className="text-red-500 text-xs mt-2 ml-5">{errors.email.message}</p>}
            </div>

            <div className="mb-8">
              <label htmlFor="password" className="block text-gray-500 text-xs font-medium uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  autoComplete="off"
                  {...register('password', { required: 'Password is required' })}
                  onFocus={() => { handleFocus(); setIsPasswordFocused(true) }}
                  onBlur={(e) => { register('password').onBlur(e); handleBlur(); setIsPasswordFocused(false) }}
                  className={`${inputClass(!!errors.password || !!submitError)} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none text-gray-400 hover:text-gray-700 transition-colors cursor-pointer p-0"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
              {(errors.password || submitError) && (
                <p className="text-red-500 text-xs mt-2 ml-5">{errors.password?.message || submitError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gray-900 text-white font-medium text-sm rounded-full py-3 border-none hover:bg-gray-700 transition-colors cursor-pointer"
            >
              {isSignup ? 'Create Account' : 'Sign In'}
            </button>

            <p className="text-center text-gray-400 text-xs mt-6">
              {isSignup ? 'Already have an account? ' : "Don't have an account? "}
              <a href={isSignup ? '/auth/login' : '/auth/signup'} className="text-gray-900 hover:underline no-underline font-medium">
                {isSignup ? 'Sign in' : 'Sign up'}
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
