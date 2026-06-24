"use client"
import { useParams } from "next/navigation"
import { AuthCharacters } from "@/components/ui/authchars"

export default function AuthPage() {
  const { type } = useParams()

  const handleSubmit = async (values: { name?: string; email: string; password: string }) => {
    const endpoint = type === 'signup' ? '/api/signup' : '/api/login'
    const res = await fetch(`http://localhost:5000${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      throw new Error(data?.message ?? 'Request failed')
    }
  }

  return <AuthCharacters type={type as string} onSubmit={handleSubmit} />
}
