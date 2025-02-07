"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu } from "lucide-react"

type UserType = "teacher" | "student" | null

interface User {
  name: string
  email: string
  type: UserType
  avatar?: string
  role?: string
}

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkLoggedInUser = () => {
      const currentUser = localStorage.getItem("currentUser")
      if (currentUser) {
        setUser(JSON.parse(currentUser))
      } else {
        setUser(null)
      }
    }

    checkLoggedInUser()
    window.addEventListener("storage", checkLoggedInUser)

    return () => {
      window.removeEventListener("storage", checkLoggedInUser)
    }
  }, [])

  const logout = () => {
    setUser(null)
    localStorage.removeItem("currentUser")
    router.push("/")
  }

  return (
    <nav className="bg-site-bg text-text-primary shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold">Foundation First</span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link
                href="/courses"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium hover:border-text-primary hover:text-text-secondary"
              >
                Courses
              </Link>
              <Link
                href="/tutors"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium hover:border-text-primary hover:text-text-secondary"
              >
                Tutors
              </Link>
              <Link
                href="/resources"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium hover:border-text-primary hover:text-text-secondary"
              >
                Resources
              </Link>
            </div>
          </div>
          <div className="hidden md:ml-6 md:flex md:items-center">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar || `/avatars/${user.type}.png`} alt={user.name} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-card-bg" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-text-muted">{user.email}</p>
                      <p className="text-xs leading-none text-text-muted capitalize">{user.type}</p>
                      {user.role && <p className="text-xs leading-none text-text-muted">{user.role}</p>}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href={user.type === "teacher" ? "/teacher-dashboard" : "/student-dashboard"}>Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <button onClick={logout}>Log out</button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="space-x-4">
                <Button variant="ghost" asChild className="text-text-primary hover:text-text-secondary">
                  <Link href="/login">Log in</Link>
                </Button>
                <Button asChild className="bg-card-bg text-text-primary hover:bg-hover-bg">
                  <Link href="/signup">Sign up</Link>
                </Button>
              </div>
            )}
          </div>
          <div className="flex items-center md:hidden">
            <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-card-bg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/courses"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-hover-bg hover:text-text-secondary"
            >
              Courses
            </Link>
            <Link
              href="/tutors"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-hover-bg hover:text-text-secondary"
            >
              Tutors
            </Link>
            <Link
              href="/resources"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-hover-bg hover:text-text-secondary"
            >
              Resources
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-border-color">
            {user ? (
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatar || `/avatars/${user.type}.png`} alt={user.name} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium">{user.name}</div>
                  <div className="text-sm font-medium text-text-muted">{user.email}</div>
                </div>
              </div>
            ) : (
              <div className="mt-3 px-2 space-y-1">
                <Button asChild className="w-full bg-card-bg text-text-primary hover:bg-hover-bg">
                  <Link href="/login">Log in</Link>
                </Button>
                <Button asChild className="w-full bg-card-bg text-text-primary hover:bg-hover-bg">
                  <Link href="/signup">Sign up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

