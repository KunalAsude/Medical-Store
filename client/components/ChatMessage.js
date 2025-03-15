import { Bot, User } from "lucide-react"
import { cn } from "@/lib/utils"


export function ChatMessage({ message }) {
  const isUser = message.type === "user"

  return (
    <div className={cn("flex items-start gap-3", isUser && "flex-row-reverse")}>
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full",
          isUser ? "bg-blue-600" : "bg-primary",
        )}
      >
        {isUser ? <User size={16} /> : <Bot size={16} />}
      </div>

      <div
        className={cn(
          "rounded-2xl p-3 text-sm",
          isUser ? "bg-blue-600 text-white rounded-tr-none" : "bg-white text-teal-950 rounded-tl-none",
        )}
      >
        {message.content}
      </div>
    </div>
  )
}

