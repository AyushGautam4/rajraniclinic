import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Bot, MessageCircle, Send, X } from 'lucide-react';

const responses = [
  {
    type: 'greet',
    keywords: ['hello', 'hi', 'helo', 'namaste', 'namaskar', 'hey', 'हेलो', 'नमस्ते'],
    reply: 'Namaste! Welcome to Raj Rani Hospital. Main aapki kaise help kar sakta hoon?\n\n1. OPD Timing\n2. Doctor Info\n3. Lab Tests\n4. Emergency\n5. Book Appointment'
  },
  {
    type: 'opd',
    keywords: ['opd', 'timing', 'time', 'when', 'hours', 'open', 'समय', 'टाइम', '1'],
    reply: 'OPD Timings:\nMorning: 11 AM - 2 PM\nEvening: 7 PM - 10 PM\n\nEmergency: 24/7 Available\n\nCall us: +91-8700628028'
  },
  {
    type: 'doctor',
    keywords: ['doctor', 'dr', 'specialist', 'gynaecologist', 'physician', 'डॉक्टर', '2'],
    reply: 'Our Specialists:\nDr. Raj Rani - Gynaecologist\nDr. Sandeep Kumar - Internal Medicine\nDr. Jitendra Kumar - Orthopaedic\nDr. R.K. Shrivastav - Paediatrician\nDr. Waseem Farooqui - Cardiologist\n\nView all: [Doctors Page](/doctors)'
  },
  {
    type: 'lab',
    keywords: ['lab', 'test', 'blood', 'diagnostic', 'report', 'cbc', '3', 'जांच', 'टेस्ट'],
    reply: 'Relax Diagnostics (Linked with Raj Rani Hospital)\n\nOffer tests available:\nCBC - Rs.200\nLipid Profile - Rs.400\nTSH - Rs.200\nViral Marker - Rs.1000\n\nTiming: 8 AM - 10 PM (Mon-Sat)\nCall: +91-9990187799'
  },
  {
    type: 'emergency',
    keywords: ['emergency', 'urgent', 'help', 'accident', '4', 'इमरजेंसी', 'जरूरी'],
    reply: 'EMERGENCY SUPPORT\n\nCall immediately:\n+91-8700628028\n\nWe are available 24/7. Ambulance support available.\n\nPlease call right now if it is urgent!'
  },
  {
    type: 'appointment',
    keywords: ['appointment', 'book', 'visit', 'meet', '5', 'अपॉइंटमेंट', 'बुकिंग'],
    reply: 'Book Appointment:\n\nCall: +91-8700628028\nWhatsApp: +91-8700628028\nOnline Form: [Contact Page](/contact)\n\nWe usually respond within 2 hours!'
  },
  {
    type: 'fee',
    keywords: ['fee', 'charge', 'cost', 'price', 'rate', 'fees', 'फीस', 'पैसे'],
    reply: 'Consultation Fees:\nGeneral Medicine - Rs.300\nGynaecology - Rs.300-400\nPaediatrics - Rs.500\nOrthopaedic - Rs.500\nCardiology - Rs.1000\n\nFor exact fees, please call us.'
  },
  {
    type: 'location',
    keywords: ['location', 'address', 'where', 'map', 'kondli', 'पता', 'कहाँ'],
    reply: 'Our Address:\nPlot No. D-3, Main Market\nOld Kondli, New Delhi - 110096\n\nNear SBI Bank, Kondli Extension\n\n[View on Google Maps](https://maps.app.goo.gl/P5xfA87tjCE6Bit79)'
  }
];

const quickReplies = ['OPD Timing', 'Book Appointment', 'Lab Tests', 'Emergency'];

const now = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

function linkify(text) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const match = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
    if (!match) return <React.Fragment key={i}>{part}</React.Fragment>;
    const href = match[2];
    return (
      <a key={i} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="font-semibold underline underline-offset-2">
        {match[1]}
      </a>
    );
  });
}

const HospitalChatbot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!open || messages.length) return;
    const timer = window.setTimeout(() => {
      setMessages([{ role: 'bot', text: 'Namaste! Main Raj Rani Hospital ka assistant hoon. Kaise help kar sakta hoon? Type karein ya neeche se choose karein:', time: now(), type: 'greet' }]);
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [open, messages.length]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  const getReply = (value) => {
    const text = value.toLowerCase();
    return responses.find((item) => item.keywords.some((keyword) => text.includes(keyword.toLowerCase()))) || {
      type: 'default',
      reply: 'Main samjha nahi. Aap yeh try karein:\n1. OPD Timing\n2. Doctor Info\n3. Lab Tests\n4. Emergency\n5. Book Appointment\n\nYa seedha call karein: +91-8700628028'
    };
  };

  const send = (value) => {
    const clean = value.trim();
    if (!clean) return;
    setMessages((prev) => [...prev, { role: 'user', text: clean, time: now() }]);
    setInput('');
    setTyping(true);
    window.setTimeout(() => {
      const bot = getReply(clean);
      setMessages((prev) => [...prev, { role: 'bot', text: bot.reply, time: now(), type: bot.type }]);
      setTyping(false);
    }, 800);
  };

  const hasQuickReplies = useMemo(() => messages.length === 1 && messages[0]?.role === 'bot', [messages]);

  return (
    <>
      <div className="fixed bottom-5 left-5 z-[150]">
        <div className="group relative">
          <span className="pointer-events-none absolute bottom-full left-0 mb-2 whitespace-nowrap rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
            Chat with us
          </span>
          <button
            type="button"
            onClick={() => setOpen((current) => !current)}
            className="chatbot-pulse flex h-14 w-14 items-center justify-center rounded-full bg-teal-600 text-white shadow-xl hover:bg-teal-700"
            aria-label="Chat with Raj Rani Hospital"
          >
            {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed bottom-24 left-4 z-[150] flex h-[500px] max-h-[72vh] w-[calc(100vw-2rem)] max-w-[360px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <div className="flex items-center gap-3 bg-gradient-to-r from-teal-600 to-blue-600 px-4 py-3 text-white">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
              <Bot className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold">Raj Rani Hospital Assistant</p>
              <p className="flex items-center gap-1.5 text-xs text-white/85"><span className="h-2 w-2 rounded-full bg-green-300" /> Online</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} className="rounded-full p-1 hover:bg-white/15" aria-label="Close chat">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-3">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[86%] rounded-2xl px-3.5 py-2 text-sm leading-6 shadow-sm ${message.role === 'user' ? 'bg-teal-600 text-white' : message.type === 'emergency' ? 'bg-red-50 text-red-800 ring-1 ring-red-100' : 'bg-white text-slate-800 ring-1 ring-slate-100'}`}>
                  <div className="whitespace-pre-line">{linkify(message.text)}</div>
                  <div className={`mt-1 text-[10px] ${message.role === 'user' ? 'text-white/75' : 'text-slate-400'}`}>{message.time}</div>
                </div>
              </div>
            ))}
            {typing && (
              <div className="inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-slate-100">
                <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
              </div>
            )}
            {hasQuickReplies && (
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply) => (
                  <button key={reply} onClick={() => send(reply)} className="rounded-full border border-teal-200 bg-white px-3 py-1.5 text-xs font-semibold text-teal-700 hover:bg-teal-50">
                    {reply}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form onSubmit={(event) => { event.preventDefault(); send(input); }} className="flex gap-2 border-t border-slate-200 bg-white p-2">
            <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Type your message..." className="min-h-[44px] min-w-0 flex-1 rounded-full border border-slate-200 px-4 text-sm outline-none focus:border-teal-500" />
            <button type="submit" className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-600 text-white hover:bg-teal-700" aria-label="Send message">
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default HospitalChatbot;
