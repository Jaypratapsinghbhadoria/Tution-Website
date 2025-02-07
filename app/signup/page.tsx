"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Signup() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userType, setUserType] = useState("")
  const [studentClass, setStudentClass] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (userType === "student" && !studentClass) {
      setError("Please select your class")
      return
    }
    // In a real app, you would send this data to your backend to create a new user
    const newUser = {
      name,
      email,
      password,
      type: userType,
      class: userType === "student" ? studentClass : null,
    }
    // For demonstration, we'll store the user in localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    users.push(newUser)
    localStorage.setItem("users", JSON.stringify(users))
    console.log("New user:", newUser)
    // Redirect to the login page
    router.push("/login")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gradientStart to-gradientEnd">
      <Card className="w-[350px] bg-gradientEnd text-accent border-accent">
        <CardHeader>
          <CardTitle className="text-2xl text-accent">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name" className="text-accent">
                  Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-gradientStart text-accent"
                />
              </div>
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
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="userType" className="text-accent">
                  I am a
                </Label>
                <Select value={userType} onValueChange={setUserType}>
                  <SelectTrigger id="userType" className="bg-gradientStart text-accent">
                    <SelectValue placeholder="Select user type" />
                  </SelectTrigger>
                  <SelectContent position="popper" className="bg-gradientEnd text-accent">
                    <SelectItem value="teacher">Teacher</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {userType === "student" && (
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="studentClass" className="text-accent">
                    Class
                  </Label>
                  <Select value={studentClass} onValueChange={setStudentClass}>
                    <SelectTrigger id="studentClass" className="bg-gradientStart text-accent">
                      <SelectValue placeholder="Select your class" />
                    </SelectTrigger>
                    <SelectContent position="popper" className="bg-gradientEnd text-accent">
                      <SelectItem value="1">Class 1</SelectItem>
                      <SelectItem value="2">Class 2</SelectItem>
                      <SelectItem value="3">Class 3</SelectItem>
                      <SelectItem value="4">Class 4</SelectItem>
                      <SelectItem value="5">Class 5</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <CardFooter className="flex justify-between mt-4">
              <Button type="submit" className="bg-accent text-gradientStart hover:bg-gray-300">
                Sign Up
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

