"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Retrieve users from localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const user = users.find((u: any) => u.email === email && u.password === password)
    if (user) {
      // Add more details to the user object
      const enhancedUser = {
        ...user,
        avatar: `/avatars/${user.type}.png`,
        role: user.type === "teacher" ? "Mathematics Instructor" : `Class ${user.class} Student`,
      }
      // Store the logged-in user in localStorage
      localStorage.setItem("currentUser", JSON.stringify(enhancedUser))
      // Trigger a storage event to update the Navbar
      window.dispatchEvent(new Event("storage"))
      if (user.type === "teacher") {
        router.push("/teacher-dashboard")
      } else {
        router.push("/student-dashboard")
      }
    } else {
      setError("Invalid email or password")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gradientStart to-gradientEnd">
      <Card className="w-[350px] bg-gradientEnd text-accent border-accent">
        <CardHeader>
          <CardTitle className="text-2xl text-accent">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email" className="text-accent">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-gradientStart text-accent"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password" className="text-accent">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-gradientStart text-accent"
                />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <CardFooter className="flex justify-between mt-4">
              <Button type="submit" className="bg-accent text-gradientStart hover:bg-gray-300">
                Login
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

