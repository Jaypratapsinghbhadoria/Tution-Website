"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Teacher {
  name: string
  email: string
  photo: string
  address: string
  phone: string
}

interface Content {
  id: string
  type: string
  title: string
  content: string
  classLevel: string
  fileUrl?: string
}

interface QuizQuestion {
  question: string
  options: string[]
  correctAnswer: number
}

interface Quiz extends Content {
  questions: QuizQuestion[]
}

const mockTeacher: Teacher = {
  name: "John Doe",
  email: "john@example.com",
  photo: "/avatars/01.png",
  address: "123 Education St, Learning City",
  phone: "+1 234 567 8900",
}

export default function TeacherDashboard() {
  const [teacher, setTeacher] = useState<Teacher>(mockTeacher)
  const [contentType, setContentType] = useState("quiz")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [classLevel, setClassLevel] = useState("")
  const [uploadedContent, setUploadedContent] = useState<Content[]>([])
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([])
  const [currentQuestion, setCurrentQuestion] = useState("")
  const [options, setOptions] = useState(["", "", "", ""])
  const [correctAnswer, setCorrectAnswer] = useState(0)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const storedTeacher = localStorage.getItem("currentUser")
    if (storedTeacher) {
      setTeacher(JSON.parse(storedTeacher))
    }

    const storedContent = localStorage.getItem("uploadedContent")
    if (storedContent) {
      setUploadedContent(JSON.parse(storedContent))
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    let newContent: Content | Quiz

    if (contentType === "quiz") {
      newContent = {
        id: Date.now().toString(),
        type: contentType,
        title,
        content: "Quiz",
        classLevel,
        questions: quizQuestions,
      }
    } else {
      newContent = {
        id: Date.now().toString(),
        type: contentType,
        title,
        content,
        classLevel,
        fileUrl: selectedFile ? URL.createObjectURL(selectedFile) : undefined,
      }
    }

    const updatedContent = [...uploadedContent, newContent]
    setUploadedContent(updatedContent)
    localStorage.setItem("uploadedContent", JSON.stringify(updatedContent))

    if (contentType === "notice") {
      const storedNotices = JSON.parse(localStorage.getItem("notices") || "[]")
      const updatedNotices = [...storedNotices, newContent]
      localStorage.setItem("notices", JSON.stringify(updatedNotices))
    }

    setTitle("")
    setContent("")
    setClassLevel("")
    setQuizQuestions([])
    setCurrentQuestion("")
    setOptions(["", "", "", ""])
    setCorrectAnswer(0)
    setSelectedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }

    alert("Content uploaded successfully!")
  }

  const addQuizQuestion = () => {
    if (currentQuestion && options.every((option) => option !== "")) {
      setQuizQuestions([
        ...quizQuestions,
        {
          question: currentQuestion,
          options,
          correctAnswer,
        },
      ])
      setCurrentQuestion("")
      setOptions(["", "", "", ""])
      setCorrectAnswer(0)
    } else {
      alert("Please fill in all fields for the question.")
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0])
    }
  }

  return (
    <div className="container mx-auto p-4 bg-gradient-to-br from-gradientStart to-gradientEnd text-accent">
      <h1 className="text-3xl font-bold mb-8">Teacher Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Teacher Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={teacher.photo} alt={teacher.name} />
                <AvatarFallback>
                  {teacher.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold mb-2">{teacher.name}</h2>
              <p className="text-sm text-gray-300 mb-4">{teacher.email}</p>
              <div className="text-sm">
                <p>
                  <strong>Address:</strong> {teacher.address}
                </p>
                <p>
                  <strong>Phone:</strong> {teacher.phone}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upload Content</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Tabs value={contentType} onValueChange={setContentType}>
                <TabsList className="mb-4">
                  <TabsTrigger value="quiz">Quiz</TabsTrigger>
                  <TabsTrigger value="test">Test Paper</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                  <TabsTrigger value="notice">Notice</TabsTrigger>
                </TabsList>
                <TabsContent value="quiz">
                  <div className="space-y-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="quizTitle">Quiz Title</Label>
                      <Input
                        id="quizTitle"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="bg-gradientStart text-accent"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="quizQuestion">Question</Label>
                      <Input
                        id="quizQuestion"
                        value={currentQuestion}
                        onChange={(e) => setCurrentQuestion(e.target.value)}
                        className="bg-gradientStart text-accent"
                      />
                    </div>
                    {options.map((option, index) => (
                      <div key={index} className="flex flex-col space-y-1.5">
                        <Label htmlFor={`option${index + 1}`}>Option {index + 1}</Label>
                        <Input
                          id={`option${index + 1}`}
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...options]
                            newOptions[index] = e.target.value
                            setOptions(newOptions)
                          }}
                          className="bg-gradientStart text-accent"
                        />
                      </div>
                    ))}
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="correctAnswer">Correct Answer</Label>
                      <Select
                        value={correctAnswer.toString()}
                        onValueChange={(value) => setCorrectAnswer(Number.parseInt(value))}
                      >
                        <SelectTrigger id="correctAnswer" className="bg-gradientStart text-accent">
                          <SelectValue placeholder="Select correct answer" />
                        </SelectTrigger>
                        <SelectContent position="popper" className="bg-gradientEnd text-accent">
                          {options.map((_, index) => (
                            <SelectItem key={index} value={index.toString()}>
                              Option {index + 1}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      type="button"
                      onClick={addQuizQuestion}
                      className="mt-4 bg-accent text-gradientStart hover:bg-gray-300"
                    >
                      Add Question
                    </Button>
                    <div>
                      <h3 className="font-semibold mb-2">Added Questions:</h3>
                      <ul className="list-disc pl-5">
                        {quizQuestions.map((q, index) => (
                          <li key={index}>{q.question}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="test">
                  <div className="space-y-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="testTitle">Test Paper Title</Label>
                      <Input
                        id="testTitle"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="bg-gradientStart text-accent"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="testFile">Upload Test Paper (PDF)</Label>
                      <Input
                        id="testFile"
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        className="bg-gradientStart text-accent"
                      />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="notes">
                  <div className="space-y-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="notesTitle">Notes Title</Label>
                      <Input
                        id="notesTitle"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="bg-gradientStart text-accent"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="notesFile">Upload Notes (PDF)</Label>
                      <Input
                        id="notesFile"
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        className="bg-gradientStart text-accent"
                      />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="notice">
                  <div className="space-y-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="noticeTitle">Notice Title</Label>
                      <Input
                        id="noticeTitle"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="bg-gradientStart text-accent"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="noticeContent">Notice Content</Label>
                      <Input
                        id="noticeContent"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        className="bg-gradientStart text-accent"
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              <div className="flex flex-col space-y-1.5 mt-4">
                <Label htmlFor="classLevel">Class Level</Label>
                <Select value={classLevel} onValueChange={setClassLevel}>
                  <SelectTrigger id="classLevel" className="bg-gradientStart text-accent">
                    <SelectValue placeholder="Select a class level" />
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
              <Button type="submit" className="mt-4 bg-accent text-gradientStart hover:bg-gray-300">
                Upload Content
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Uploaded Content</CardTitle>
        </CardHeader>
        <CardContent>
          {uploadedContent.length > 0 ? (
            <ul className="space-y-2">
              {uploadedContent.map((item) => (
                <li key={item.id} className="bg-gradientStart p-3 rounded-md text-gray-300">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-300">
                    Type: {item.type}, Class: {item.classLevel}
                  </p>
                  {item.fileUrl && (
                    <a
                      href={item.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline"
                    >
                      View File
                    </a>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No content uploaded yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

