import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const predefinedResponses: Record<string, string> = {
  hello: "Hello! I'm here to help you with your Goovista experience. How can I assist you today?",
  booking: "To book a ride, simply click the 'Book Your Ride Now' button on our homepage or use our mobile app. You can enter your pickup and destination locations, choose your vehicle type, and confirm your booking.",
  pricing: "Our pricing varies by vehicle type. Sedan rides start at $2.50 base rate + $1.20/mile. We also offer subscription plans starting at $29.99/month for regular users.",
  vehicles: "We offer 5 vehicle types: Sedan (4 passengers), SUV (6 passengers), Maxi (8 passengers), Accessible vehicles, and Premium luxury cars.",
  support: "For immediate support, call us at +1 (555) 123-4567. For emergencies, dial +1 (555) 911-HELP. You can also email support@goovista.com.",
  hours: "Goovista operates 24/7! Our drivers are available around the clock to serve you.",
  safety: "Safety is our top priority. All drivers are thoroughly vetted, vehicles are regularly inspected, and every ride includes comprehensive insurance coverage.",
  default: "I'm here to help! You can ask me about booking rides, pricing, vehicle types, safety measures, or any other questions about Goovista services."
};

const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your Goovista assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const getResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('hello') || message.includes('hi')) {
      return predefinedResponses.hello;
    } else if (message.includes('book') || message.includes('ride')) {
      return predefinedResponses.booking;
    } else if (message.includes('price') || message.includes('cost')) {
      return predefinedResponses.pricing;
    } else if (message.includes('vehicle') || message.includes('car')) {
      return predefinedResponses.vehicles;
    } else if (message.includes('support') || message.includes('help') || message.includes('contact')) {
      return predefinedResponses.support;
    } else if (message.includes('hour') || message.includes('time') || message.includes('available')) {
      return predefinedResponses.hours;
    } else if (message.includes('safe') || message.includes('security')) {
      return predefinedResponses.safety;
    } else {
      return predefinedResponses.default;
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Widget Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 300 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-shadow duration-300"
          size="icon"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="h-6 w-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 z-50"
          >
            <Card className="shadow-2xl border-primary/20">
              <CardHeader className="bg-gradient-to-r from-primary to-accent text-primary-foreground p-4 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                      <Bot className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Goovista Assistant</h3>
                      <p className="text-xs opacity-90">Usually replies instantly</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => setIsOpen(false)}
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-primary-foreground hover:bg-white/20"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                {/* Messages */}
                <div className="h-80 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.sender === 'bot' && (
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Bot className="h-4 w-4 text-primary" />
                        </div>
                      )}
                      <div
                        className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                          message.sender === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        {message.text}
                      </div>
                      {message.sender === 'user' && (
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                          <User className="h-4 w-4" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Input */}
                <div className="p-4 border-t bg-muted/30">
                  <div className="flex gap-2">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSendMessage}
                      size="icon"
                      className="bg-primary hover:bg-primary/90"
                      disabled={!inputMessage.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    Powered by Goovista AI Assistant
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotWidget;