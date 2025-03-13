"use client"

import React from "react"
import { useState, useEffect, useRef, Suspense } from "react"
import { useRouter } from "next/navigation"
import { Stethoscope, Users, Send, Mic, MicOff } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import axios from "axios"
import { FormattedMedicalResponse } from "@/components/formattedResponse"


// API URL from environment variable with fallback
const API_URL = process.env.NEXT_PUBLIC_CHAT_API_URL || "http://localhost:8000"

// Create a client component that safely uses useSearchParams
function ChatContent() {
  const router = useRouter()
  const [isListening, setIsListening] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: "1",
      content: "Hello! How can I help you with your healthcare needs today?",
      role: "assistant",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isFormatted: false,
      formattedData: null,
    },
  ])
  const [input, setInput] = useState("")
  const [recognition, setRecognition] = useState(null)
  const [isTyping, setIsTyping] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const recognitionRef = useRef(null)
  const messageProcessedRef = useRef(false)

  // We'll use URL parsing directly instead of useSearchParams to avoid Suspense issues
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      const messageFromQuery = params.get("message")
      const source = params.get("source")

      // Only process the message if it hasn't been processed yet and it exists
      if (messageFromQuery && !messageProcessedRef.current) {
        addMessage(messageFromQuery, "user")
        messageProcessedRef.current = true
        
        // Remove the query parameters from the URL without a page reload
        const newUrl = window.location.pathname
        window.history.replaceState({}, document.title, newUrl)

        // If the message is from navbar, we don't want to start speech recognition immediately
        if (source === "navbar") {
          // Add a delay before allowing speech recognition to start again
          const timer = setTimeout(() => {
            messageProcessedRef.current = false
          }, 2000)

          return () => clearTimeout(timer)
        }
      }
    }
  }, [])

  // Initialize speech recognition with safer browser checks
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        // @ts-ignore
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null

        if (SpeechRecognition) {
          const recognitionInstance = new SpeechRecognition()
          recognitionInstance.continuous = true
          recognitionInstance.interimResults = true
          recognitionInstance.lang = "en-US"

          let finalTranscript = ""
          let interimTranscript = ""

          recognitionInstance.onstart = () => {
            setIsListening(true)
            finalTranscript = ""
            interimTranscript = ""
          }

          recognitionInstance.onresult = (event) => {
            // Don't process speech if we just processed a URL message
            if (messageProcessedRef.current) return

            interimTranscript = ""

            for (let i = event.resultIndex; i < event.results.length; i++) {
              const transcript = event.results[i][0].transcript

              if (event.results[i].isFinal) {
                finalTranscript += transcript + " "
                setInput(finalTranscript.trim())
              } else {
                interimTranscript += transcript
                setInput(finalTranscript + interimTranscript)
              }
            }
          }

          recognitionInstance.onend = () => {
            setIsListening(false)

            // If we have a final transcript and user stopped manually (not auto-submit)
            if (finalTranscript.trim() && inputRef.current && !messageProcessedRef.current) {
              inputRef.current.focus()
            }
          }

          recognitionInstance.onerror = (event) => {
            console.error("Speech recognition error", event.error)
            setIsListening(false)
          }

          setRecognition(recognitionInstance)
          recognitionRef.current = recognitionInstance
        }
      } catch (error) {
        console.error("Speech recognition not supported in this browser", error)
      }
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop()
        } catch (e) {
          // Ignore errors when stopping on unmount
        }
      }
    }
  }, [])

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  // Function to call the backend API
  const fetchMedicalInfo = async (userQuery) => {
    try {
      setIsProcessing(true)
      console.log("Preparing to send request to", `${API_URL}/chat`, "with:", { userInput: userQuery })

      const response = await axios.post(
        `${API_URL}/chat`,
        { userInput: userQuery },
        {
          timeout: 15000, // 15 second timeout
        },
      )

      console.log("Received response:", response.data)
      return response.data
    } catch (error) {
      console.error("Error fetching medical information:", error)
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers,
        requestConfig: error.config,
      })

      return {
        error: "Sorry, I couldn't process your request. Please try again.",
        summary: "An error occurred while processing your request.",
      }
    } finally {
      setIsProcessing(false)
    }
  }

  const addMessage = async (content, role) => {
    if (!content || !content.trim()) return

    const newMessage = {
      id: Date.now().toString(),
      content,
      role,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isFormatted: false,
      formattedData: null,
    }
    setMessages((prev) => [...prev, newMessage])

    // Process user message and generate response
    if (role === "user") {
      setIsTyping(true)

      try {
        // Send all queries directly to the Express backend
        const medicalData = await fetchMedicalInfo(content)

        // Create a formatted response message
        const botResponse = {
          id: (Date.now() + 1).toString(),
          content: "", // We'll keep this empty as we're using the formatted component
          role: "assistant",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isFormatted: true,
          formattedData: medicalData,
        }

        setMessages((prev) => [...prev, botResponse])
      } catch (error) {
        console.error("Error processing query:", error)

        const errorResponse = {
          id: (Date.now() + 1).toString(),
          content: "I'm having trouble connecting to the server. Please try again later.",
          role: "assistant",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isFormatted: false,
          formattedData: null,
        }

        setMessages((prev) => [...prev, errorResponse])
      } finally {
        setIsTyping(false)
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim() && !isProcessing) {
      addMessage(input, "user")
      setInput("")

      // Stop listening if active
      if (isListening && recognition) {
        try {
          recognition.stop()
        } catch (error) {
          console.error("Error stopping speech recognition:", error)
        }
      }
    }
  }

  const toggleVoiceRecognition = () => {
    if (!recognition) {
      console.warn("Speech recognition not available in this browser")
      return
    }

    try {
      if (isListening) {
        recognition.stop()
      } else {
        // Don't start if we just processed a URL message
        if (messageProcessedRef.current) {
          messageProcessedRef.current = false
          return
        }

        setInput("")
        recognition.start()
      }
    } catch (error) {
      console.error("Error toggling speech recognition:", error)
      setIsListening(false)
    }
  }

  // Function to format message content with line breaks
  const formatMessageContent = (content) => {
    return content.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < content.split("\n").length - 1 && <br />}
      </React.Fragment>
    ))
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-teal-950 to-black overflow-hidden">
      {/* Header - Static */}
      <header className="flex justify-between items-center px-6 py-3 bg-teal-900/70 border-b border-teal-700/30">
        <Link href="/" className="cursor-pointer">
          <div className="flex items-center space-x-2">
            <div className="relative h-10 w-10">
              <Image
                src="https://img.icons8.com/arcade/64/hospital.png"
                alt="MediNexus Logo"
                width={40}
                height={40}
                priority
              />
            </div>
            <div className="text-lg font-bold text-teal-400">MediStore Assistant</div>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleVoiceRecognition}
            className={`p-2 rounded-full ${isListening ? "bg-red-500/20 text-red-400 animate-pulse" : "bg-teal-800/30 hover:bg-teal-800/50"} transition-colors`}
            aria-label={isListening ? "Stop listening" : "Start voice assistant"}
            disabled={isProcessing}
          >
            {isListening ? <MicOff size={20} className="text-red-400" /> : <Mic size={20} className="text-teal-300" />}
          </button>
        </div>
      </header>

      {/* Chat Messages - Scrollable */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            {message.role === "assistant" && (
              <div className="h-8 w-8 rounded-full bg-teal-700 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                <Stethoscope size={16} className="text-white" />
              </div>
            )}
            <div className="flex flex-col max-w-[75%]">
              <div
                className={`p-3 rounded-lg shadow-md ${
                  message.role === "user"
                    ? "bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-br-none"
                    : "bg-gradient-to-r from-teal-900 to-teal-950 border border-teal-700/50 text-teal-100 rounded-bl-none"
                }`}
              >
                {message.isFormatted && message.formattedData ? (
                  <FormattedMedicalResponse data={message.formattedData} />
                ) : (
                  formatMessageContent(message.content)
                )}
              </div>
              <div className={`text-xs mt-1 text-teal-400/70 ${message.role === "user" ? "text-right" : "text-left"}`}>
                {message.timestamp}
              </div>
            </div>
            {message.role === "user" && (
              <div className="h-8 w-8 rounded-full bg-teal-600 flex items-center justify-center ml-2 mt-1 flex-shrink-0">
                <Users size={16} className="text-white" />
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="h-8 w-8 rounded-full bg-teal-700 flex items-center justify-center mr-2 flex-shrink-0">
              <Stethoscope size={16} className="text-white" />
            </div>
            <div className="bg-gradient-to-r from-teal-900 to-teal-950 border border-teal-700/50 text-teal-100 p-3 rounded-lg rounded-bl-none shadow-md">
              <div className="flex space-x-1">
                <div
                  className="h-2 w-2 bg-teal-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="h-2 w-2 bg-teal-400 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="h-2 w-2 bg-teal-400 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Listening Indicator - Static */}
      {isListening && (
        <div className="text-center py-2 text-red-400 flex items-center justify-center gap-2 bg-teal-950/80 border-t border-teal-800/30">
          <span className="inline-block h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
          <p>Listening... Speak now</p>
        </div>
      )}

      {/* Processing Indicator */}
      {isProcessing && !isTyping && (
        <div className="text-center py-2 text-teal-400 flex items-center justify-center gap-2 bg-teal-950/80 border-t border-teal-800/30">
          <span className="inline-block h-2 w-2 bg-teal-500 rounded-full animate-pulse"></span>
          <p>Processing your request...</p>
        </div>
      )}

      {/* Input Form - Static */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-teal-800 flex gap-2 bg-teal-950/90">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isListening ? "Listening..." : isProcessing ? "Processing..." : "Type your message..."}
          className="flex-1 bg-teal-800 border border-teal-700/50 text-white px-4 py-3 rounded-md focus:outline-none focus:border-teal-500 placeholder-teal-300/50"
          disabled={isProcessing}
        />
        <button
          type="button"
          onClick={toggleVoiceRecognition}
          className={`p-3 rounded-md ${
            isListening ? "bg-red-600 hover:bg-red-700" : "bg-teal-800 hover:bg-teal-700"
          } transition-colors ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
          aria-label={isListening ? "Stop listening" : "Start voice input"}
          disabled={isProcessing}
        >
          {isListening ? <MicOff size={20} className="text-white" /> : <Mic size={20} className="text-white" />}
        </button>
        <button
          type="submit"
          className="bg-teal-600 hover:bg-teal-700 text-white p-3 rounded-md disabled:opacity-50 transition-colors"
          disabled={!input.trim() || isProcessing}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  )
}

// Add a loading component
function ChatLoading() {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-b from-teal-950 to-black">
      <div className="text-teal-400 text-center">
        <div className="flex space-x-2 justify-center items-center">
          <div className="h-4 w-4 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
          <div className="h-4 w-4 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
          <div className="h-4 w-4 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
        </div>
        <p className="mt-4">Loading chat assistant...</p>
      </div>
    </div>
  )
}

// Main component with Suspense boundary
export default function ChatPage() {
  return (
    <Suspense fallback={<ChatLoading />}>
      <ChatContent />
    </Suspense>
  )
}