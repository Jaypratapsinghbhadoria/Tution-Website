"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, MessageSquare } from "lucide-react"

const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

const feedbackFormSchema = z.object({
  rating: z.enum(["1", "2", "3", "4", "5"], {
    required_error: "Please select a rating.",
  }),
  feedback: z.string().min(10, {
    message: "Feedback must be at least 10 characters.",
  }),
})

export default function ContactAndFeedbackSection() {
  const [isContactSubmitting, setIsContactSubmitting] = useState(false)
  const [isFeedbackSubmitting, setIsFeedbackSubmitting] = useState(false)

  const contactForm = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  const feedbackForm = useForm<z.infer<typeof feedbackFormSchema>>({
    resolver: zodResolver(feedbackFormSchema),
    defaultValues: {
      rating: undefined,
      feedback: "",
    },
  })

  function onContactSubmit(values: z.infer<typeof contactFormSchema>) {
    setIsContactSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsContactSubmitting(false)
      toast({
        title: "Message Sent",
        description: "We've received your message and will get back to you soon.",
      })
      contactForm.reset()
    }, 1000)
  }

  function onFeedbackSubmit(values: z.infer<typeof feedbackFormSchema>) {
    setIsFeedbackSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsFeedbackSubmitting(false)
      toast({
        title: "Feedback Submitted",
        description: "Thank you for your feedback!",
      })
      feedbackForm.reset()
    }, 1000)
  }

  return (
    <section className="py-16 bg-site-bg text-text-primary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-card-bg border-border-color">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center">
                <Send className="mr-2" /> Contact Us
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...contactForm}>
                <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-6">
                  <FormField
                    control={contactForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} className="bg-site-bg text-text-primary" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={contactForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Your email" {...field} className="bg-site-bg text-text-primary" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={contactForm.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Your message" {...field} className="bg-site-bg text-text-primary" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full bg-hover-bg text-text-primary hover:bg-card-bg"
                    disabled={isContactSubmitting}
                  >
                    {isContactSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card className="bg-card-bg border-border-color">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center">
                <MessageSquare className="mr-2" /> Your Feedback
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...feedbackForm}>
                <form onSubmit={feedbackForm.handleSubmit(onFeedbackSubmit)} className="space-y-6">
                  <FormField
                    control={feedbackForm.control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>How would you rate your experience?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex space-x-4"
                          >
                            {[1, 2, 3, 4, 5].map((value) => (
                              <FormItem key={value}>
                                <FormControl>
                                  <RadioGroupItem value={value.toString()} className="sr-only" />
                                </FormControl>
                                <FormLabel
                                  className={`cursor-pointer p-2 rounded-full ${
                                    field.value === value.toString()
                                      ? "bg-hover-bg text-text-primary"
                                      : "bg-site-bg text-text-secondary"
                                  }`}
                                >
                                  {value}
                                </FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={feedbackForm.control}
                    name="feedback"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Feedback</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your experience"
                            {...field}
                            className="bg-site-bg text-text-primary"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full bg-hover-bg text-text-primary hover:bg-card-bg"
                    disabled={isFeedbackSubmitting}
                  >
                    {isFeedbackSubmitting ? "Submitting..." : "Submit Feedback"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

