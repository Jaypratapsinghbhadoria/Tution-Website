"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface Student {
  name: string
  email: string
  photo: string
  address: string
  phone: string
  class: string
}

interface Notice {
  id: string
  type: string
  title: string
  content: string
  classLevel: string
}

interface QuizQuestion {
  question: string
  options: string[]
  correctAnswer: number
}

interface Quiz {
  id: string
  type: string
  title: string
  classLevel: string
  questions: QuizQuestion[]
}

interface QuizResult {
  quizId: string
  score: number
  totalQuestions: number
}

const mockStudent: Student = {
  name: "Jane Smith",
  email: "jane@example.com",
  photo: "/avatars/02.png",
  address: "456 Learning Ave, Student City",
  phone: "+1 987 654 3210",
  class: "2",
}

export default function StudentDashboard() {
  const [student, setStudent] = useState<Student>(mockStudent)
  const [notices, setNotices] = useState<Notice[]>([])
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [quizResults, setQuizResults] = useState<QuizResult[]>([])
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [score, setScore] = useState(0)

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")
    if (currentUser) {
      setStudent({
        ...mockStudent,
        name: currentUser.name,
        email: currentUser.email,
        class: currentUser.class,
      })
    }

    const storedNotices = JSON.parse(localStorage.getItem("notices") || "[]")
    setNotices(storedNotices)

    const storedContent = JSON.parse(localStorage.getItem("uploadedContent") || "[]")
    const availableQuizzes = storedContent.filter(
      (item: any) => item.type === "quiz" && item.classLevel === currentUser.class,
    )
    setQuizzes(availableQuizzes)

    const storedQuizResults = JSON.parse(localStorage.getItem("quizResults") || "[]")
    setQuizResults(storedQuizResults)
  }, [])

  const relevantNotices = notices.filter((notice) => notice.classLevel === student.class)

  const startQuiz = (quiz: Quiz) => {
    setCurrentQuiz(quiz)
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setQuizCompleted(false)
    setScore(0)
  }

  const handleAnswerSelection = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const submitAnswer = () => {
    if (currentQuiz && selectedAnswer !== null) {
      if (selectedAnswer === currentQuiz.questions[currentQuestionIndex].correctAnswer) {
        setScore(score + 1)
      }

      if (currentQuestionIndex + 1 < currentQuiz.questions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setSelectedAnswer(null)
      } else {
        completeQuiz()
      }
    }
  }

  const completeQuiz = () => {
    setQuizCompleted(true)
    const result: QuizResult = {
      quizId: currentQuiz!.id,
      score: score,
      totalQuestions: currentQuiz!.questions.length,
    }
    const updatedResults = [...quizResults, result]
    setQuizResults(updatedResults)
    localStorage.setItem("quizResults", JSON.stringify(updatedResults))
  }

  return (
    <div className="container mx-auto p-4 bg-gradient-to-br from-gradientStart to-gradientEnd text-accent">
      <h1 className="text-3xl font-bold mb-8">Student Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Student Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={student.photo} alt={student.name} />
                <AvatarFallback className="bg-accent text-gradientStart">
                  {student.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold mb-2">{student.name}</h2>
              <p className="text-sm text-gray-300 mb-1">{student.email}</p>
              <p className="text-sm text-gray-300 mb-4">Class {student.class}</p>
              <div className="text-sm">
                <p>
                  <strong>Address:</strong> {student.address}
                </p>
                <p>
                  <strong>Phone:</strong> {student.phone}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Progress Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span>Quizzes Completed</span>
                  <span>
                    {quizResults.length} / {quizzes.length}
                  </span>
                </div>
                <Progress value={(quizResults.length / quizzes.length) * 100} className="bg-gray-700" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Average Score</span>
                  <span>
                    {quizResults.length > 0
                      ? `${
                          Math.round(
                            (quizResults.reduce(
                              (acc, result) => acc + (result.score / result.totalQuestions) * 100,
                              0,
                            ) /
                              quizResults.length) *
                              100,
                          ) / 100
                        }%`
                      : "N/A"}
                  </span>
                </div>
                <Progress
                  value={
                    quizResults.length > 0
                      ? quizResults.reduce((acc, result) => acc + (result.score / result.totalQuestions) * 100, 0) /
                        quizResults.length
                      : 0
                  }
                  className="bg-gray-700"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Available Quizzes</CardTitle>
          </CardHeader>
          <CardContent>
            {quizzes.length > 0 ? (
              <ul className="space-y-2">
                {quizzes.map((quiz) => (
                  <li key={quiz.id} className="bg-gradientStart p-3 rounded-md flex justify-between items-center">
                    <span>{quiz.title}</span>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          onClick={() => startQuiz(quiz)}
                          className="bg-accent text-gradientStart hover:bg-gray-300"
                        >
                          Start Quiz
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-gradientEnd text-accent border-accent">
                        <DialogHeader>
                          <DialogTitle>{quiz.title}</DialogTitle>
                        </DialogHeader>
                        {!quizCompleted ? (
                          <div>
                            <p className="mb-4">{quiz.questions[currentQuestionIndex].question}</p>
                            <RadioGroup
                              value={selectedAnswer?.toString()}
                              onValueChange={(value) => handleAnswerSelection(Number.parseInt(value))}
                            >
                              {quiz.questions[currentQuestionIndex].options.map((option, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                  <RadioGroupItem
                                    value={index.toString()}
                                    id={`option-${index}`}
                                    className="border-accent text-accent"
                                  />
                                  <Label htmlFor={`option-${index}`}>{option}</Label>
                                </div>
                              ))}
                            </RadioGroup>
                            <Button
                              onClick={submitAnswer}
                              className="mt-4 bg-accent text-gradientStart hover:bg-gray-300"
                              disabled={selectedAnswer === null}
                            >
                              {currentQuestionIndex + 1 < quiz.questions.length ? "Next" : "Finish"}
                            </Button>
                          </div>
                        ) : (
                          <div>
                            <p>Quiz completed!</p>
                            <p>
                              Your score: {score} / {quiz.questions.length}
                            </p>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No quizzes available for your class at the moment.</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Class Notices</CardTitle>
          </CardHeader>
          <CardContent>
            {relevantNotices.length > 0 ? (
              <ul className="space-y-2">
                {relevantNotices.map((notice) => (
                  <li key={notice.id} className="bg-gradientStart p-3 rounded-md">
                    <h3 className="font-semibold">{notice.title}</h3>
                    <p className="text-sm text-gray-300">{notice.content}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No notices for your class at the moment.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

