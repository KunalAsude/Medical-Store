"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, Loader2, Mic, MicOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ChatMessage } from "@/components/ChatMessage"
import { HealthAnalysisDisplay } from "@/components/HealthAnalysisDisplay"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { DisclaimerPopup } from "@/components/DisclaimerPopup"
import { useRouter, useSearchParams } from "next/navigation"

// Ensure API_URL has a fallback value
const API_URL = process.env.NEXT_PUBLIC_API_URL_CHAT || "http://localhost:5001"

export default function Home() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      type: "bot",
      content:
        "Hello! I'm your Health Assistant. Describe your symptoms by typing or using voice commands, and I'll analyze them for you.",
      timestamp: new Date(),
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [speechTimeout, setSpeechTimeout] = useState(null)
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [hasShownDisclaimer, setHasShownDisclaimer] = useState(false);
  const messagesEndRef = useRef(null)
  const cardRef = useRef(null)
  const inputRef = useRef(null)
  const initialMessageProcessed = useRef(false)

  // SpeechRecognition setup
  const recognitionRef = useRef(null)

  // Process URL message param on initial load
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlMessage = searchParams.get("message")
      const source = searchParams.get("source")
      
      // Only process the message if it exists AND we haven't processed it before
      if (urlMessage && !initialMessageProcessed.current) {
        console.log(`Processing message from URL: "${urlMessage}" (source: ${source || "unknown"})`)
        
        // Process the message
        handleSubmitWithInput(urlMessage)
        
        // Remove the parameter from URL to prevent reprocessing on reload
        const newUrl = window.location.pathname
        window.history.replaceState({}, document.title, newUrl)
        
        // Mark as processed
        initialMessageProcessed.current = true
        
        // Store a flag in sessionStorage to prevent processing on reload
        sessionStorage.setItem('messageProcessed', 'true')
      }
    }
  }, [searchParams])
  
  // Initialize the flag on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check if we've already processed a message in this session
      const alreadyProcessed = sessionStorage.getItem('messageProcessed') === 'true'
      initialMessageProcessed.current = alreadyProcessed
    }
  }, [])
  // Initialize speech recognition once on component mount
  useEffect(() => {
    // Initialize speech recognition
    if (typeof window !== "undefined") {
      if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = true
        recognitionRef.current.interimResults = true
        recognitionRef.current.lang = "en-US"

        // Log successful initialization
        console.log("Speech recognition initialized successfully")
      } else {
        console.error("Speech recognition not supported in this browser")
      }
    }

    return () => {
      stopRecognition()
    }
  }, [])

  // Set up speech recognition event handlers when isRecording changes
  useEffect(() => {
    if (!recognitionRef.current) return

    const handleSpeechResult = (event) => {
      console.log("Speech result received", event)
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("")

      console.log("Transcript:", transcript)
      setInput(transcript)

      // Auto submit after silence
      if (speechTimeout) {
        clearTimeout(speechTimeout)
      }

      const timeout = setTimeout(() => {
        if (transcript.trim() && isRecording) {
          console.log("Auto-submitting after silence")
          handleSubmitWithInput(transcript)
        }
      }, 2000) // Auto-submit after 2 seconds of silence

      setSpeechTimeout(timeout)
    }

    const handleSpeechError = (event) => {
      console.error("Speech recognition error", event.error)
      setIsRecording(false)
      setIsListening(false)
    }

    const handleSpeechEnd = () => {
      console.log("Speech recognition ended")
      setIsListening(false)

      if (isRecording) {
        // Try to restart if stopped unexpectedly
        try {
          console.log("Attempting to restart speech recognition")
          recognitionRef.current.start()
          setIsListening(true)
        } catch (e) {
          console.error("Could not restart speech recognition", e)
          setIsRecording(false)
        }
      }
    }

    // Add event listeners
    if (isRecording) {
      recognitionRef.current.onresult = handleSpeechResult
      recognitionRef.current.onerror = handleSpeechError
      recognitionRef.current.onend = handleSpeechEnd
    }

    return () => {
      // Remove event listeners
      if (recognitionRef.current) {
        recognitionRef.current.onresult = null
        recognitionRef.current.onerror = null
        recognitionRef.current.onend = null
      }

      // Clear timeout
      if (speechTimeout) {
        clearTimeout(speechTimeout)
      }
    }
  }, [isRecording, speechTimeout])

  // Helper function to stop recognition
  const stopRecognition = () => {
    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.stop()
        console.log("Speech recognition stopped")
      } catch (e) {
        console.error("Error stopping speech recognition", e)
      }
    }

    setIsListening(false)

    // Clear timeout
    if (speechTimeout) {
      clearTimeout(speechTimeout)
      setSpeechTimeout(null)
    }
  }

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in your browser.")
      return
    }

    if (isRecording) {
      console.log("Stopping recording")
      stopRecognition()
      setIsRecording(false)

      // Auto-submit if there's content when stopping manually
      if (input.trim()) {
        handleSubmitWithInput(input)
      }
    } else {
      console.log("Starting recording")
      setInput("")
      try {
        recognitionRef.current.start()
        setIsRecording(true)
        setIsListening(true)
        console.log("Speech recognition started")

        // Focus the input to show keyboard on mobile
        if (inputRef.current) {
          inputRef.current.focus()
        }
      } catch (e) {
        console.error("Could not start speech recognition", e)
        alert("Could not start speech recognition. Please try again.")
      }
    }
  }

  const handleSubmitWithInput = (submittedInput) => {
    if (!submittedInput.trim()) return

    // Stop recording if active
    if (isRecording) {
      stopRecognition()
      setIsRecording(false)
    }

    // Add user message to chat
    const userMessage = {
      id: Date.now().toString(),
      type: "user",
      content: submittedInput,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Process the input
    processSymptoms(submittedInput)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    handleSubmitWithInput(input)
  }

  // Text-to-speech function (uncommented and fixed)
  // const speakText = (text) => {
  //   if (!window.speechSynthesis) return

  //   // Cancel any ongoing speech
  //   window.speechSynthesis.cancel()

  //   const utterance = new SpeechSynthesisUtterance(text)
  //   utterance.lang = 'en-US'
  //   utterance.rate = 1.0
  //   utterance.pitch = 1.0

  //   window.speechSynthesis.speak(utterance)
  // }

  const processSymptoms = async (symptoms) => {

    if (!hasShownDisclaimer) {
      setShowDisclaimer(true);
      setHasShownDisclaimer(true);
    }

    try {
      // Replace with your actual API endpoint
      const res = await fetch(`${API_URL}/api/symptoms/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms }),
      })

      if (!res.ok) {
        throw new Error(`Failed to analyze symptoms: ${res.status}`)
      }

      const analysisData = await res.json()
      console.log("Analysis data received:", analysisData)

      // Handle potential null or undefined values with fallbacks
      const adaptedData = {
        possibleConditions: [
          {
            name: analysisData.summary?.replace(/^Symptom Analysis: /i, "") || "Analysis complete",
            description: analysisData.description || "No additional details available",
          },
        ],
        symptoms: [],
        remedies: [],
        precautions: [],
        // Add the Indian alternatives data
        indianAlternatives: analysisData.indianAlternatives || {},
        alternativesStats: analysisData.alternativesStats || null,
      }

      // Safely add possible conditions if they exist
      if (analysisData.conditions?.possible_conditions && Array.isArray(analysisData.conditions.possible_conditions)) {
        adaptedData.possibleConditions = [
          adaptedData.possibleConditions[0],
          ...analysisData.conditions.possible_conditions,
        ]
      }

      // Safely add symptoms if they exist
      if (analysisData.conditions?.common_symptoms && Array.isArray(analysisData.conditions.common_symptoms)) {
        adaptedData.symptoms = analysisData.conditions.common_symptoms
      }

      // Safely add remedies if they exist
      if (analysisData.remedies && Array.isArray(analysisData.remedies)) {
        adaptedData.remedies = analysisData.remedies
      }

      // Safely add precautions if they exist
      if (analysisData.precautions && Array.isArray(analysisData.precautions)) {
        adaptedData.precautions = analysisData.precautions
      }

      // Add bot response with adapted analysis
      const botMessage = {
        id: Date.now().toString(),
        type: "analysis",
        content: "Here's my analysis of your symptoms:",
        timestamp: new Date(),
        analysis: adaptedData,
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Error processing symptoms:", error)

      // Add error message
      const errorMessage = {
        id: Date.now().toString(),
        type: "bot",
        content: "Sorry, I couldn't analyze your symptoms. Please try again.",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col bg-cyan-900 w-full h-screen border-0 shadow-none rounded-none">
      <div className="px-3 py-2 sm:px-4 sm:py-3 border-b border-cyan-800 flex items-center gap-2">
        <Bot size={18} className="text-cyan-300 size-8" />
        <h2 className="text-base sm:text-lg font-semibold text-white whitespace-nowrap">AI Health Assistant</h2>
        <div className="flex-1"></div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleRecording}
                className={`shrink-0 text-white cursor-pointer h-8 w-8 ${isRecording ? "bg-red-600 hover:bg-red-700" : "bg-cyan-700 hover:bg-cyan-600"}`}
              >
                {isRecording ? <MicOff size={16} /> : <Mic size={16} />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isRecording ? "Stop voice recording" : "Start voice recording"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="flex-1 m-2 sm:m-5 overflow-hidden">
        <Card ref={cardRef} className="h-full bg-cyan-800/20 border-cyan-800/50 overflow-y-auto scrollbar-none">
          <CardContent className="p-2 sm:p-4 h-full">
            <div className="flex flex-col gap-3 sm:gap-4">
              {messages.map((message) => (
                <div key={message.id}>
                  {message.type === "analysis" ? (
                    <div className="space-y-2 sm:space-y-5">
                      <ChatMessage message={message} />
                      <HealthAnalysisDisplay data={message.analysis} />
                    </div>
                  ) : (
                    <ChatMessage message={message} />
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 select-none items-center justify-center rounded-full bg-cyan-700 text-cyan-300">
                    <Bot size={16} />
                  </div>
                  <div className="flex items-center gap-2 rounded-2xl rounded-tl-none bg-cyan-800 p-2 sm:p-3 text-xs sm:text-sm text-cyan-100">
                    <Loader2 size={14} className="animate-spin text-cyan-300" />
                    <span className="whitespace-normal">Analyzing your symptoms...</span>
                  </div>
                </div>
              )}

              {isRecording && (
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 select-none items-center justify-center rounded-full bg-red-600 text-white">
                    <Mic size={16} />
                  </div>
                  <div className="flex items-center gap-2 rounded-2xl rounded-tl-none bg-red-500/20 border border-red-500/30 p-2 sm:p-3 text-xs sm:text-sm text-white">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                    <span className="whitespace-normal">
                      {isListening
                        ? "Listening... Speak your symptoms (will auto-submit after pause)"
                        : "Initializing microphone..."}
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </CardContent>
        </Card>
      </div>

      <form onSubmit={handleSubmit} className="border-t border-cyan-800 p-2 sm:p-4 bg-cyan-900">
        <div className="flex gap-2 mb-3">
          <Input
            ref={inputRef}
            placeholder={isRecording ? "Listening... (will auto-submit after pause)" : "Describe your symptoms..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-cyan-800 border-cyan-700 text-white text-sm sm:text-base placeholder-cyan-300/70 focus:border-cyan-500 focus:ring-cyan-500"
            disabled={isLoading}
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  size="icon"
                  onClick={toggleRecording}
                  className={`shrink-0 cursor-pointer ${isRecording ? "bg-red-600 hover:bg-red-700" : "bg-cyan-700 hover:bg-cyan-600"} text-white h-12 w-9 sm:h-12 sm:w-12`}
                >
                  {isRecording ? <MicOff size={16} /> : <Mic size={16} />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isRecording ? "Stop voice recording" : "Start voice recording"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
            className="shrink-0 bg-cyan-600 hover:bg-cyan-500 text-white h-12 w-9 sm:h-12 sm:w-12"
          >
            <Send size={16} className="" />
          </Button>
        </div>
        <div className="text-xs text-cyan-400/80 mt-2 text-center px-4 hidden sm:block">
          <strong className="text-cyan-300">Disclaimer:</strong> This chatbot provides
          <span className="font-semibold"> symptom analysis, home remedies, and medicine alternatives</span>
          for <span className="font-semibold">informational purposes only</span> and
          <span className="text-red-400 font-semibold"> does not</span> offer
          <span className="font-semibold"> medical advice, diagnosis, or treatment</span>.
          Consult a <span className="font-semibold">qualified healthcare professional</span> before making medical decisions.
          The information is <span className="font-semibold">suggested, not prescribed</span>, may not always be accurate, and
          <span className="font-semibold"> developers are not responsible</span> for its use.
        </div>



      </form>
      <DisclaimerPopup
        isOpen={showDisclaimer}
        onClose={() => setShowDisclaimer(false)}
      />
    </div>
  )
}

