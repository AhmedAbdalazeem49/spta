import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from "@/contexts/LanguageContext";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bot,
  Maximize2,
  MessageCircle,
  Minimize2,
  Send,
  Sparkles,
  User,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const Chatbot = () => {
  const { t, isRTL } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Welcome messages
  const welcomeMessages = {
    ar: [
      "مرحباً بك في الجمعية السعودية للعلاج الطبيعي! 👋",
      "كيف يمكنني مساعدتك اليوم؟ يمكنني الإجابة على أسئلتك حول:",
      "• العضوية والتسجيل\n• ورش العمل والدورات\n• المجلة العلمية\n• الخدمات المقدمة",
    ],
    en: [
      "Welcome to the Saudi Physical Therapy Association! 👋",
      "How can I help you today? I can answer your questions about:",
      "• Membership and registration\n• Workshops and courses\n• Scientific journal\n• Services offered",
    ],
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Show welcome messages with typing effect
      const lang = isRTL ? "ar" : "en";
      welcomeMessages[lang].forEach((msg, index) => {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now() + index,
              role: "assistant",
              content: msg,
              timestamp: new Date(),
            },
          ]);
        }, index * 500);
      });
    }
  }, [isOpen]);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const responses = isRTL
        ? [
            "شكراً لتواصلك معنا! سأقوم بمساعدتك في استفسارك.",
            "للمزيد من المعلومات، يمكنك التواصل معنا عبر البريد الإلكتروني: spta@ksu.edu.sa",
            "يسعدني مساعدتك! هل هناك شيء آخر تود معرفته؟",
          ]
        : [
            "Thank you for reaching out! I'll help you with your inquiry.",
            "For more information, you can contact us at: spta@ksu.edu.sa",
            "Happy to help! Is there anything else you'd like to know?",
          ];

      const botResponse: Message = {
        id: Date.now(),
        role: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 end-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="w-16 h-16 rounded-full shadow-lg bg-gradient-to-br from-primary to-blue-light hover:shadow-xl transition-all duration-300 group"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <MessageCircle className="w-7 h-7" />
              </motion.div>

              {/* Pulse effect */}
              <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
            </Button>

            {/* Tooltip */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="absolute bottom-full mb-2 end-0 bg-card rounded-lg shadow-lg px-3 py-2 text-sm whitespace-nowrap"
            >
              {t("كيف يمكننا مساعدتك؟", "How can we help?")}
              <div className="absolute bottom-0 end-6 translate-y-1/2 rotate-45 w-2 h-2 bg-card" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`fixed z-50 ${
              isMinimized
                ? "bottom-6 end-6"
                : "bottom-6 end-6 sm:bottom-6 sm:end-6"
            }`}
          >
            <div
              className={`bg-card rounded-2xl shadow-2xl overflow-hidden border border-border transition-all duration-300 ${
                isMinimized ? "w-72" : "w-[360px] sm:w-[400px]"
              }`}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-primary to-blue-light p-4 text-primary-foreground">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">
                        {t("مساعد SPTA", "SPTA Assistant")}
                      </h3>
                      <p className="text-xs opacity-80 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-accent" />
                        {t("متصل الآن", "Online")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-primary-foreground hover:bg-white/20"
                      onClick={() => setIsMinimized(!isMinimized)}
                    >
                      {isMinimized ? (
                        <Maximize2 className="w-4 h-4" />
                      ) : (
                        <Minimize2 className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-primary-foreground hover:bg-white/20"
                      onClick={() => setIsOpen(false)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <AnimatePresence>
                {!isMinimized && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ScrollArea className="h-80 p-4" ref={scrollRef}>
                      <div className="space-y-4">
                        {messages.map((message) => (
                          <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex items-end gap-2 ${
                              message.role === "user" ? "flex-row-reverse" : ""
                            }`}
                          >
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                                message.role === "user"
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {message.role === "user" ? (
                                <User className="w-4 h-4" />
                              ) : (
                                <Bot className="w-4 h-4" />
                              )}
                            </div>
                            <div
                              className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                                message.role === "user"
                                  ? "bg-primary text-primary-foreground rounded-br-sm"
                                  : "bg-muted rounded-bl-sm"
                              }`}
                            >
                              <p className="text-sm whitespace-pre-line">
                                {message.content}
                              </p>
                              <p
                                className={`text-[10px] mt-1 ${
                                  message.role === "user"
                                    ? "text-primary-foreground/60"
                                    : "text-muted-foreground"
                                }`}
                              >
                                {message.timestamp.toLocaleTimeString(
                                  isRTL ? "ar-SA" : "en-US",
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </p>
                            </div>
                          </motion.div>
                        ))}

                        {/* Typing Indicator */}
                        {isTyping && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-end gap-2"
                          >
                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                              <Bot className="w-4 h-4 text-muted-foreground" />
                            </div>
                            <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-3">
                              <div className="flex gap-1">
                                <motion.span
                                  animate={{ y: [0, -5, 0] }}
                                  transition={{
                                    duration: 0.6,
                                    repeat: Infinity,
                                    delay: 0,
                                  }}
                                  className="w-2 h-2 rounded-full bg-muted-foreground/50"
                                />
                                <motion.span
                                  animate={{ y: [0, -5, 0] }}
                                  transition={{
                                    duration: 0.6,
                                    repeat: Infinity,
                                    delay: 0.2,
                                  }}
                                  className="w-2 h-2 rounded-full bg-muted-foreground/50"
                                />
                                <motion.span
                                  animate={{ y: [0, -5, 0] }}
                                  transition={{
                                    duration: 0.6,
                                    repeat: Infinity,
                                    delay: 0.4,
                                  }}
                                  className="w-2 h-2 rounded-full bg-muted-foreground/50"
                                />
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </ScrollArea>

                    {/* Input Area */}
                    <div className="p-4 border-t border-border">
                      <div className="flex items-center gap-2">
                        <Input
                          ref={inputRef}
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder={t(
                            "اكتب رسالتك...",
                            "Type your message..."
                          )}
                          className="flex-1 rounded-full bg-muted border-0 focus-visible:ring-1"
                        />
                        <Button
                          onClick={handleSend}
                          disabled={!inputValue.trim() || isTyping}
                          size="icon"
                          className="rounded-full shrink-0 bg-primary hover:bg-primary/90"
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-[10px] text-muted-foreground text-center mt-2 flex items-center justify-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        {t("مدعوم بالذكاء الاصطناعي", "Powered by AI")}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
