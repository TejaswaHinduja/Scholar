'use client'
import Link from 'next/link'
import { Logo } from '@/components/logo'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import React from 'react'
import { cn } from '@/lib/utils'

const menuItems = [
    { name: 'Network', href: '#link' },
    { name: 'Tuitions', href: '#link' },
    { name: 'About', href: '#link' },
]

export const HeroHeader = () => {
    const [menuOpen, setMenuOpen] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header className="fixed inset-x-0 top-0 z-20">
            <nav className={cn(
                'w-full transition-all duration-300',
                isScrolled && 'bg-background/75 border-b border-black/5 backdrop-blur-lg'
            )}>
                <div className={cn(
                    'mx-auto flex w-full items-center justify-between px-6 transition-all duration-300',
                    isScrolled ? 'py-2' : 'py-4 lg:py-5'
                )}>
                    {/* Logo */}
                    <Link href="/" aria-label="home" className="flex shrink-0 items-center">
                        <Logo />
                    </Link>

                    {/* Desktop nav links — centered */}
                    <ul className="hidden items-center gap-1 lg:flex">
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                <Button asChild variant="ghost" size="lg" className="text-base px-4">
                                    <Link href={item.href}>{item.name}</Link>
                                </Button>
                            </li>
                        ))}
                    </ul>

                    {/* Desktop auth buttons + mobile hamburger */}
                    <div className="flex items-center gap-3">
                        <div className="hidden items-center gap-3 lg:flex">
                            {isScrolled ? (
                                <Button asChild size="sm" className="px-4">
                                    <Link href="#">Get Started</Link>
                                </Button>
                            ) : (
                                <>
                                    <Button asChild variant="ghost" size="lg" className="text-base px-4">
                                        <Link href="#">Login</Link>
                                    </Button>
                                    <Button asChild size="lg" className="text-base px-4">
                                        <Link href="#">Sign Up</Link>
                                    </Button>
                                </>
                            )}
                        </div>

                        {/* Hamburger — mobile only */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label={menuOpen ? 'Close Menu' : 'Open Menu'}
                            className="relative z-20 cursor-pointer p-2 lg:hidden">
                            <Menu className={cn('size-6 transition-all duration-200', menuOpen && 'rotate-180 scale-0 opacity-0')} />
                            <X className={cn('absolute inset-0 m-auto size-6 transition-all duration-200', menuOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-180 scale-0 opacity-0')} />
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {menuOpen && (
                    <div className="bg-background border-t px-6 pb-6 pt-4 lg:hidden">
                        <ul className="mb-6 space-y-4">
                            {menuItems.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        href={item.href}
                                        onClick={() => setMenuOpen(false)}
                                        className="text-muted-foreground hover:text-foreground block text-base duration-150">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <Button asChild variant="outline" size="lg" className="w-full text-base sm:w-auto">
                                <Link href="#">Login</Link>
                            </Button>
                            <Button asChild size="lg" className="w-full text-base sm:w-auto">
                                <Link href="#">Sign Up</Link>
                            </Button>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    )
}
