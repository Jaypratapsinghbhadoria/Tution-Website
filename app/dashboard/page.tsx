"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import TeacherDashboard from "@/components/TeacherDashboard"
import StudentDashboard from "@/components/StudentDashboard"

export default function Dashboard() {
  const [userRole, setUserRole] = useState<"teacher" | "student" | null>(null)

  useEffect(() => {
    // Fetch user role from API or local storage
    // For demo purposes, we'll randomly assign a role
    setUserRole(Math.random() > 0.5 ? "teacher" : "student")
  }, [])

  if (!userRole) {
    return <div>Loading...</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-8"
    >
      {userRole === "teacher" ? <TeacherDashboard /> : <StudentDashboard />}
    </motion.div>
  )
}

