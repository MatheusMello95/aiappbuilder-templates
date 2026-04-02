import { useState, useRef, useEffect, useCallback } from "react";

// ─── Color palettes ─────────────────────────────────────────
const LIGHT = {
  bg: "#EFECE8",
  surface: "#FFFFFF",
  surfaceAlt: "#F5F3F0",
  border: "#D5D0CA",
  borderLight: "#E8E4E0",
  text: "#1C1917",
  textSecondary: "#78716C",
  textMuted: "#A8A29E",
  accent: "#E8553A",
  accentLight: "rgba(232, 85, 58, 0.08)",
  accentGlow: "rgba(232, 85, 58, 0.12)",
  user: "#1C1917",
  userGlow: "rgba(28, 25, 23, 0.12)",
  ai: "#FFFFFF",
  aiBorder: "#D5D0CA",
  headerBg: "rgba(255,255,255,0.7)",
  sidebarBackdrop: "rgba(0,0,0,0.15)",
  sidebarShadow: "4px 0 24px rgba(0,0,0,0.06)",
  dotColor: "#C4BBB2",
  ringColor: "rgba(0,0,0,0.035)",
  lineColor: "rgba(0,0,0,0.025)",
  codeBg: "#1C1917",
  codeBorder: "#2A2724",
  codeText: "#c9d1d9",
  scrollThumb: "rgba(0,0,0,0.1)",
  scrollThumbHover: "rgba(0,0,0,0.18)",
  onlineColor: "#16A34A",
};

const DARK = {
  bg: "#141418",
  surface: "#1E1E23",
  surfaceAlt: "#26262C",
  border: "#2E2E35",
  borderLight: "#252530",
  text: "#ECECEF",
  textSecondary: "#9898A0",
  textMuted: "#6A6A75",
  accent: "#E8553A",
  accentLight: "rgba(232, 85, 58, 0.12)",
  accentGlow: "rgba(232, 85, 58, 0.15)",
  user: "#E8553A",
  userGlow: "rgba(232, 85, 58, 0.2)",
  ai: "#1E1E23",
  aiBorder: "#2E2E35",
  headerBg: "rgba(20,20,24,0.9)",
  sidebarBackdrop: "rgba(0,0,0,0.4)",
  sidebarShadow: "4px 0 24px rgba(0,0,0,0.3)",
  dotColor: "#2A2A32",
  ringColor: "rgba(255,255,255,0.03)",
  lineColor: "rgba(255,255,255,0.02)",
  codeBg: "#111115",
  codeBorder: "#2A2A32",
  codeText: "#c9d1d9",
  scrollThumb: "rgba(255,255,255,0.08)",
  scrollThumbHover: "rgba(255,255,255,0.15)",
  onlineColor: "#4ADE80",
};

// Active palette — will be set by the app
let C = LIGHT;

// ─── Mobile detection hook ──────────────────────────────────
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < breakpoint);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return isMobile;
}

// ─── Global styles & keyframes ──────────────────────────────
const GlobalStyles = ({ theme }) => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      background: ${theme.bg};
      font-family: 'Inter', -apple-system, sans-serif;
      color: ${theme.text};
      overflow: hidden;
      transition: background 0.3s ease, color 0.3s ease;
    }

    @keyframes breathe {
      0%, 100% { transform: scale(1); box-shadow: 0 4px 20px ${theme === DARK ? "rgba(232,85,58,0.1)" : "rgba(0,0,0,0.06)"}; }
      50% { transform: scale(1.03); box-shadow: 0 8px 32px ${theme === DARK ? "rgba(232,85,58,0.18)" : "rgba(0,0,0,0.1)"}; }
    }

    @keyframes fade-in-up {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes cursor-blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }

    @keyframes dot-bounce {
      0%, 60%, 100% { transform: translateY(0); opacity: 0.3; }
      30% { transform: translateY(-5px); opacity: 0.8; }
    }

    @keyframes slide-in {
      from { transform: translateX(-100%); }
      to { transform: translateX(0); }
    }

    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: ${theme.scrollThumb}; border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: ${theme.scrollThumbHover}; }

    pre {
      background: ${theme.codeBg} !important;
      border: 1px solid ${theme.codeBorder};
      border-radius: 10px;
      padding: 16px;
      overflow-x: auto;
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px;
      line-height: 1.6;
      margin: 12px 0;
    }

    code {
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px;
      background: ${theme.accentLight};
      padding: 2px 6px;
      border-radius: 4px;
      color: ${theme.accent};
    }

    pre code { background: none; padding: 0; color: ${theme.codeText}; }
  `}</style>
);

// ─── Clean background: dot grid + decorative rings ──────────
const Background = ({ mobile }) => (
  <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
    <div style={{ position: "absolute", inset: 0, opacity: 0.25, backgroundImage: `radial-gradient(circle, ${C.dotColor} 0.7px, transparent 0.7px)`, backgroundSize: "24px 24px" }} />
    {!mobile && <>
      <div style={{ position: "absolute", width: 220, height: 220, borderRadius: "50%", border: `1px solid ${C.ringColor}`, top: "12%", left: "6%" }} />
      <div style={{ position: "absolute", width: 140, height: 140, borderRadius: "50%", border: `1px solid ${C.ringColor}`, bottom: "18%", right: "10%" }} />
      <div style={{ position: "absolute", width: 320, height: 320, borderRadius: "50%", border: `1px solid ${C.ringColor}`, top: "45%", right: "22%", transform: "translateY(-50%)" }} />
      <div style={{ position: "absolute", width: 1, height: "140%", background: `linear-gradient(to bottom, transparent, ${C.lineColor}, transparent)`, top: "-20%", left: "70%", transform: "rotate(15deg)" }} />
      <div style={{ position: "absolute", width: 1, height: "140%", background: `linear-gradient(to bottom, transparent, ${C.lineColor}, transparent)`, top: "-20%", left: "30%", transform: "rotate(-12deg)" }} />
    </>}
  </div>
);

// ─── Streaming cursor ───────────────────────────────────────
const StreamingCursor = () => (
  <span style={{ display: "inline-block", width: 7, height: 17, background: C.accent, marginLeft: 2, verticalAlign: "text-bottom", animation: "cursor-blink 0.8s step-end infinite", borderRadius: 1 }} />
);

// ─── Simple markdown renderer ───────────────────────────────
const renderMarkdown = (text) => {
  const lines = text.split("\n");
  const elements = [];
  let inCodeBlock = false;
  let codeLines = [];

  lines.forEach((line, i) => {
    if (line.startsWith("```")) {
      if (inCodeBlock) {
        elements.push(<pre key={`code-${i}`}><code>{codeLines.join("\n")}</code></pre>);
        codeLines = [];
        inCodeBlock = false;
      } else { inCodeBlock = true; }
      return;
    }
    if (inCodeBlock) { codeLines.push(line); return; }

    let processed = line.replace(/\*\*(.*?)\*\*/g, `<strong style="color: ${C.text}; font-weight: 600;">$1</strong>`);
    processed = processed.replace(/`([^`]+)`/g, '<code>$1</code>');

    if (line.trim() === "") { elements.push(<br key={i} />); }
    else { elements.push(<p key={i} style={{ margin: "4px 0", lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: processed }} />); }
  });

  if (inCodeBlock && codeLines.length > 0) {
    elements.push(<pre key="code-end"><code>{codeLines.join("\n")}</code></pre>);
  }
  return elements;
};

// ─── Avatars ────────────────────────────────────────────────
const UserAvatar = () => (
  <div style={{ width: 32, height: 32, borderRadius: "50%", background: C.user, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff", flexShrink: 0 }}>U</div>
);

const AIAvatar = () => (
  <div style={{ width: 32, height: 32, borderRadius: "50%", background: C.accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
    </svg>
  </div>
);

// ─── Message bubble ─────────────────────────────────────────
const MessageBubble = ({ message, isStreaming, mobile }) => {
  const isUser = message.role === "user";
  return (
    <div style={{ display: "flex", gap: mobile ? 8 : 12, alignItems: "flex-start", animation: "fade-in-up 0.3s ease-out", flexDirection: isUser ? "row-reverse" : "row", padding: "4px 0" }}>
      {isUser ? <UserAvatar /> : <AIAvatar />}
      <div
        style={{
          maxWidth: mobile ? "85%" : "75%", padding: mobile ? "10px 14px" : "14px 18px",
          borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
          background: isUser ? C.user : C.ai,
          border: isUser ? "none" : `1px solid ${C.border}`,
          fontSize: 14.5, lineHeight: 1.7,
          color: isUser ? "#fff" : C.text,
          boxShadow: isUser ? `0 2px 12px ${C.userGlow}` : "0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
        {isUser ? message.content : renderMarkdown(message.content)}
        {isStreaming && <StreamingCursor />}
      </div>
    </div>
  );
};

// ─── Typing indicator ───────────────────────────────────────
const TypingIndicator = () => (
  <div style={{ display: "flex", gap: 12, alignItems: "flex-start", animation: "fade-in-up 0.3s ease-out", padding: "4px 0" }}>
    <AIAvatar />
    <div style={{ padding: "14px 20px", borderRadius: "18px 18px 18px 4px", background: C.surface, border: `1px solid ${C.border}`, display: "flex", gap: 6, alignItems: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: C.accent, animation: `dot-bounce 1.4s ${i * 0.2}s ease-in-out infinite` }} />
      ))}
    </div>
  </div>
);

// ─── Suggestion chip icons ──────────────────────────────────
const ChipIcons = {
  code: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
  component: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>,
  api: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" /></svg>,
  sparkle: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5z" /></svg>,
};

// ─── Suggestion chips (2x2) ─────────────────────────────────
const SuggestionChips = ({ onSelect }) => {
  const suggestions = [
    { text: "How do I build a streaming chat?", icon: ChipIcons.code },
    { text: "Explain React Server Components", icon: ChipIcons.component },
    { text: "Help me design an API", icon: ChipIcons.api },
    { text: "What can you help me with?", icon: ChipIcons.sparkle },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, padding: "20px 0 0", maxWidth: 500, width: "100%" }}>
      {suggestions.map((s, i) => (
        <button
          key={i}
          onClick={() => onSelect(s.text)}
          style={{
            padding: "14px 16px", borderRadius: 14,
            border: `1px solid ${C.border}`,
            background: C.surface, color: C.textSecondary,
            fontSize: 13, fontFamily: "'Inter', sans-serif",
            cursor: "pointer", transition: "all 0.2s ease",
            display: "flex", alignItems: "center", gap: 10,
            textAlign: "left", lineHeight: 1.4,
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = C.accent;
            e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)";
            e.currentTarget.style.color = C.text;
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = C.border;
            e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.05)";
            e.currentTarget.style.color = C.textSecondary;
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <span style={{ flexShrink: 0, opacity: 0.5, display: "flex" }}>{s.icon}</span>
          {s.text}
        </button>
      ))}
    </div>
  );
};

// ─── Capability pills (non-clickable, with label) ───────────
const CapabilityPills = () => {
  const items = ["Code Generation", "Debugging", "Architecture", "Explanations"];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", justifyContent: "center", marginTop: 16 }}>
      <span style={{ fontSize: 11, color: C.textMuted, fontWeight: 500 }}>Great at:</span>
      {items.map((label, i) => (
        <span
          key={i}
          style={{
            fontSize: 11, fontWeight: 500, color: C.textMuted,
            padding: "3px 10px", borderRadius: 20,
            background: "rgba(0,0,0,0.03)",
            letterSpacing: 0.2,
          }}
        >
          {label}
        </span>
      ))}
    </div>
  );
};

// ─── Icons ──────────────────────────────────────────────────
const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const StopIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="4" width="16" height="16" rx="3" /></svg>
);

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const MenuIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const ClockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ─── Sidebar (inline on desktop, overlay on mobile) ─────────
const Sidebar = ({ open, onClose, chatHistory, activeChatIndex, onSelectChat, onNewChat, mobile }) => (
  <>
    {/* Mobile backdrop */}
    {mobile && open && (
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: C.sidebarBackdrop, zIndex: 50 }} />
    )}
    <div
      style={mobile ? {
        position: "fixed", top: 0, left: 0, bottom: 0,
        width: 280, zIndex: 51,
        background: C.surface,
        borderRight: `1px solid ${C.border}`,
        display: "flex", flexDirection: "column",
        transform: open ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.25s ease",
        boxShadow: open ? C.sidebarShadow : "none",
      } : {
        width: open ? 280 : 0, minWidth: open ? 280 : 0,
        height: "100%", overflow: "hidden",
        background: C.surface,
        borderRight: open ? `1px solid ${C.border}` : "none",
        display: "flex", flexDirection: "column",
        transition: "width 0.25s ease, min-width 0.25s ease",
        flexShrink: 0, zIndex: 5,
      }}
    >
    <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.borderLight}`, display: "flex", alignItems: "center", justifyContent: "space-between", minWidth: 280 }}>
      <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>Chat History</span>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <button
          onClick={onNewChat}
          style={{
            padding: "6px 12px", borderRadius: 8,
            border: `1px solid ${C.border}`, background: C.surfaceAlt,
            color: C.textSecondary, fontSize: 12, fontFamily: "'Inter', sans-serif",
            cursor: "pointer", display: "flex", alignItems: "center", gap: 4,
          }}
        >
          <PlusIcon /> New
        </button>
        <button
          onClick={onClose}
          style={{
            width: 30, height: 30, borderRadius: 8,
            border: `1px solid ${C.border}`, background: C.surfaceAlt,
            color: C.textSecondary, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.15s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = C.text; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = C.textSecondary; }}
        >
          <CloseIcon />
        </button>
      </div>
    </div>
    <div style={{ flex: 1, overflowY: "auto", padding: "8px 12px", minWidth: 280 }}>
      {chatHistory.length === 0 && (
        <div style={{ padding: "24px 8px", textAlign: "center", color: C.textMuted, fontSize: 13 }}>
          No conversations yet
        </div>
      )}
      {chatHistory.map((chat, i) => (
        <button
          key={i}
          onClick={() => onSelectChat(i)}
          style={{
            width: "100%", padding: "10px 12px", borderRadius: 10,
            border: "none",
            background: i === activeChatIndex ? C.surfaceAlt : "transparent",
            color: i === activeChatIndex ? C.text : C.textSecondary,
            fontSize: 13, fontFamily: "'Inter', sans-serif",
            cursor: "pointer", textAlign: "left",
            display: "flex", alignItems: "center", gap: 8,
            transition: "background 0.15s, color 0.15s",
            marginBottom: 2,
            fontWeight: i === activeChatIndex ? 500 : 400,
          }}
          onMouseEnter={(e) => { if (i !== activeChatIndex) e.currentTarget.style.background = C.surfaceAlt; }}
          onMouseLeave={(e) => { if (i !== activeChatIndex) e.currentTarget.style.background = "transparent"; }}
        >
          <span style={{ flexShrink: 0, opacity: 0.4, display: "flex" }}><ClockIcon /></span>
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{chat.title}</span>
        </button>
      ))}
    </div>
  </div>
  </>
);

// ─── API streaming helper ───────────────────────────────────
const API_URL = "/api/chat";

async function streamChat(messages, onChunk, abortSignal) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
    signal: abortSignal,
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({ error: "Request failed" }));
    throw new Error(err.error || `HTTP ${response.status}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value, { stream: true });
    const lines = chunk.split("\n");

    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;
      const data = line.slice(6);
      if (data === "[DONE]") return;

      try {
        const parsed = JSON.parse(data);
        if (parsed.error) throw new Error(parsed.error);
        if (parsed.text) onChunk(parsed.text);
      } catch (e) {
        if (e.message && !e.message.includes("JSON")) throw e;
      }
    }
  }
}

// ─── Main Chat App ──────────────────────────────────────────
export default function AIChatInterface() {
  const isMobile = useIsMobile();
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [activeChatIndex, setActiveChatIndex] = useState(-1);
  const messagesEndRef = useRef(null);
  const abortRef = useRef(null);
  const inputRef = useRef(null);

  // Update palette on theme change
  C = darkMode ? DARK : LIGHT;

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(scrollToBottom, [messages, scrollToBottom]);

  // Save current chat to history when messages change
  useEffect(() => {
    if (messages.length < 2) return;
    const title = messages[0]?.content?.slice(0, 40) + (messages[0]?.content?.length > 40 ? "..." : "");
    setChatHistory(prev => {
      const updated = [...prev];
      if (activeChatIndex >= 0) {
        updated[activeChatIndex] = { title, messages: [...messages] };
      } else {
        updated.unshift({ title, messages: [...messages] });
        setActiveChatIndex(0);
      }
      return updated;
    });
  }, [messages]);

  const handleSend = useCallback(async () => {
    if (!input.trim() || isStreaming) return;

    const userMessage = { role: "user", content: input.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsThinking(true);
    setIsStreaming(true);

    const abortController = new AbortController();
    abortRef.current = abortController;

    try {
      setMessages(prev => [...prev, { role: "assistant", content: "" }]);
      setIsThinking(false);

      let accumulated = "";
      await streamChat(
        updatedMessages.map(m => ({ role: m.role, content: m.content })),
        (text) => {
          accumulated += text;
          const current = accumulated;
          setMessages(prev => {
            const updated = [...prev];
            updated[updated.length - 1] = { role: "assistant", content: current };
            return updated;
          });
        },
        abortController.signal
      );
    } catch (error) {
      if (error.name === "AbortError") return;
      setIsThinking(false);
      setMessages(prev => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (last?.role === "assistant" && !last.content) {
          updated[updated.length - 1] = { role: "assistant", content: `Error: ${error.message}` };
        }
        return updated;
      });
    } finally {
      setIsStreaming(false);
      setIsThinking(false);
      abortRef.current = null;
    }
  }, [input, isStreaming, messages]);

  const handleStop = useCallback(() => {
    abortRef.current?.abort();
    setIsStreaming(false);
    setIsThinking(false);
  }, []);

  const handleNewChat = useCallback(() => {
    if (isStreaming) handleStop();
    setMessages([]);
    setActiveChatIndex(-1);
    inputRef.current?.focus();
  }, [isStreaming, handleStop]);

  const handleSelectChat = useCallback((index) => {
    if (isStreaming) handleStop();
    setMessages([...chatHistory[index].messages]);
    setActiveChatIndex(index);
  }, [chatHistory, isStreaming, handleStop]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  const isEmpty = messages.length === 0;

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex", background: C.bg, position: "relative", overflow: "hidden" }}>
      <GlobalStyles theme={C} />
      <Background mobile={isMobile} />

      {/* ─── Sidebar (inline) ───────────────────────────── */}
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        chatHistory={chatHistory}
        activeChatIndex={activeChatIndex}
        onSelectChat={(i) => { handleSelectChat(i); if (isMobile) setSidebarOpen(false); }}
        onNewChat={() => { handleNewChat(); if (isMobile) setSidebarOpen(false); }}
        mobile={isMobile}
      />

      {/* ─── Main content column ────────────────────────── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, transition: "all 0.25s ease" }}>

      {/* ─── Header ─────────────────────────────────────── */}
      <div
        style={{
          padding: isMobile ? "10px 14px" : "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between",
          background: C.headerBg, backdropFilter: "blur(20px)",
          zIndex: 10, position: "relative", borderBottom: `1px solid ${C.borderLight}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Hamburger / sidebar toggle */}
          <button
            onClick={() => setSidebarOpen(prev => !prev)}
            style={{
              width: 36, height: 36, borderRadius: 10,
              border: `1px solid ${C.border}`, background: C.surface,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: C.textSecondary, transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = C.surfaceAlt; e.currentTarget.style.color = C.text; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = C.surface; e.currentTarget.style.color = C.textSecondary; }}
          >
            <MenuIcon />
          </button>
          <div
            style={{
              width: 36, height: 36, borderRadius: 10, background: C.accent,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: C.text }}>Slash AI</div>
            <div style={{ fontSize: 11, color: C.onlineColor, fontWeight: 500, display: "flex", alignItems: "center", gap: 5 }}>
              Online
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.onlineColor, boxShadow: `0 0 6px ${C.onlineColor}40` }} />
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* Theme toggle */}
          <button
            onClick={() => setDarkMode(prev => !prev)}
            aria-label="Toggle theme"
            style={{
              width: 36, height: 36, borderRadius: 10,
              border: `1px solid ${C.border}`, background: C.surface,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: C.textSecondary, transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = C.surfaceAlt; e.currentTarget.style.color = C.text; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = C.surface; e.currentTarget.style.color = C.textSecondary; }}
          >
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </button>
          {/* New Chat */}
          <button
            onClick={handleNewChat}
            style={{
              padding: isMobile ? "8px" : "8px 16px", borderRadius: 10,
              border: `1px solid ${C.border}`, background: C.surface,
              color: C.textSecondary, fontSize: 13, fontWeight: 500,
              fontFamily: "'Inter', sans-serif", cursor: "pointer",
              transition: "all 0.2s", display: "flex", alignItems: "center", gap: 6,
              width: isMobile ? 36 : "auto", height: isMobile ? 36 : "auto",
              justifyContent: "center",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.color = C.accent; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textSecondary; }}
          >
            <PlusIcon />
            {!isMobile && "New Chat"}
          </button>
        </div>
      </div>

      {/* ─── Empty state: centered landing ────────────── */}
      {isEmpty && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 1, padding: isMobile ? "20px 16px" : "24px", animation: "fade-in-up 0.6s ease-out" }}>
          {/* Logo */}
          <div
            style={{
              width: isMobile ? 70 : 90, height: isMobile ? 70 : 90, borderRadius: isMobile ? 18 : 24,
              background: C.surface, border: `1px solid ${C.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              animation: "breathe 4s ease-in-out infinite",
              marginBottom: isMobile ? 20 : 28,
            }}
          >
            <svg width={isMobile ? "32" : "40"} height={isMobile ? "32" : "40"} viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
            </svg>
          </div>

          {/* Heading */}
          <h1 style={{ fontSize: isMobile ? 24 : 32, fontWeight: 700, color: C.text, marginBottom: 8, textAlign: "center" }}>
            How can I help you today?
          </h1>
          <p style={{ fontSize: isMobile ? 14 : 15, color: C.textMuted, maxWidth: 460, lineHeight: 1.6, textAlign: "center", marginBottom: isMobile ? 20 : 28 }}>
            {isMobile ? "Your AI assistant — ready to help." : "I'm your AI assistant — ready to brainstorm, write code, debug, or explain anything."}
          </p>

          {/* Centered input */}
          <div style={{ width: "100%", maxWidth: 640, marginBottom: 14 }}>
            <div
              style={{
                display: "flex", gap: 10, alignItems: "flex-end",
              }}
            >
              <div
                style={{
                  flex: 1, borderRadius: 20,
                  border: `1.5px solid ${inputFocused ? C.accent : C.border}`,
                  background: C.surface,
                  transition: "all 0.2s ease",
                  boxShadow: inputFocused
                    ? "0 0 0 3px rgba(232,85,58,0.06), 0 4px 20px rgba(0,0,0,0.08)"
                    : "0 2px 12px rgba(0,0,0,0.06)",
                }}
              >
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setInputFocused(true)}
                  onBlur={() => setInputFocused(false)}
                  placeholder="Describe what you need help with..."
                  rows={1}
                  style={{
                    width: "100%", padding: "16px 20px",
                    background: "transparent", border: "none", outline: "none",
                    color: C.text, fontSize: 15, fontFamily: "'Inter', sans-serif",
                    resize: "none", lineHeight: 1.5, maxHeight: 120,
                  }}
                />
              </div>
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                style={{
                  width: 50, height: 50, borderRadius: "50%", border: "none",
                  background: input.trim() ? C.accent : C.surfaceAlt,
                  color: input.trim() ? "#fff" : C.textMuted,
                  cursor: input.trim() ? "pointer" : "default",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.2s ease",
                  boxShadow: input.trim() ? "0 4px 14px rgba(232,85,58,0.25)" : "none",
                  flexShrink: 0,
                  transform: input.trim() ? "scale(1)" : "scale(0.92)",
                }}
              >
                <SendIcon />
              </button>
            </div>
          </div>

          {/* Compact suggestion pills */}
          {(() => {
            const items = isMobile
              ? ["Streaming chat", "React components", "Design an API", "Debug my code"]
              : ["Build a streaming chat", "Explain React components", "Design an API", "Debug my code", "Write a function"];
            return (
              <div style={isMobile ? {
                display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8,
                width: "100%", maxWidth: 640,
              } : {
                display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center",
                width: "100%", maxWidth: 640,
              }}>
                {items.map((text) => (
                  <button
                    key={text}
                    onClick={() => { setInput(text); inputRef.current?.focus(); }}
                    style={{
                      padding: isMobile ? "10px 12px" : "7px 16px",
                      borderRadius: isMobile ? 12 : 20,
                      border: `1px solid ${C.border}`, background: C.surface,
                      color: C.textSecondary,
                      fontSize: isMobile ? 12 : 13,
                      fontFamily: "'Inter', sans-serif",
                      cursor: "pointer", transition: "all 0.2s",
                      whiteSpace: "nowrap",
                      textAlign: "center",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.color = C.accent; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textSecondary; }}
                  >
                    {text}
                  </button>
                ))}
              </div>
            );
          })()}

          {/* Footer hint */}
          <div style={{ marginTop: 24, fontSize: 11, color: C.textMuted }}>
            Slash AI can make mistakes. Verify important information.
          </div>
        </div>
      )}

      {/* ─── Conversation view ──────────────────────────── */}
      {!isEmpty && (
        <>
          <div style={{ flex: 1, overflowY: "auto", padding: isMobile ? "16px 12px 12px" : "24px 24px 16px", display: "flex", flexDirection: "column", gap: isMobile ? 10 : 16, zIndex: 1 }}>
            {messages.map((msg, i) => (
              <MessageBubble key={i} message={msg} isStreaming={isStreaming && i === messages.length - 1 && msg.role === "assistant"} mobile={isMobile} />
            ))}
            {isThinking && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* ─── Bottom input (conversation mode) ──────────── */}
          <div style={{ padding: isMobile ? "10px 12px 14px" : "14px 24px 18px", background: C.headerBg, backdropFilter: "blur(20px)", zIndex: 10, borderTop: `1px solid ${C.borderLight}` }}>
            <div style={{ display: "flex", gap: isMobile ? 8 : 10, alignItems: "flex-end", maxWidth: 800, margin: "0 auto" }}>
              <div
                style={{
                  flex: 1, borderRadius: 20,
                  border: `1.5px solid ${inputFocused ? C.accent : C.border}`,
                  background: C.surface,
                  transition: "all 0.2s ease",
                  boxShadow: inputFocused
                    ? "0 0 0 3px rgba(232,85,58,0.06), 0 4px 16px rgba(0,0,0,0.06)"
                    : "0 2px 8px rgba(0,0,0,0.05)",
                }}
              >
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setInputFocused(true)}
                  onBlur={() => setInputFocused(false)}
                  placeholder="Type your message..."
                  rows={1}
                  style={{
                    width: "100%", padding: isMobile ? "12px 16px" : "14px 20px",
                    background: "transparent", border: "none", outline: "none",
                    color: C.text, fontSize: isMobile ? 14 : 14.5, fontFamily: "'Inter', sans-serif",
                    resize: "none", lineHeight: 1.5, maxHeight: 120,
                  }}
                />
              </div>
              <button
                onClick={isStreaming ? handleStop : handleSend}
                disabled={!isStreaming && !input.trim()}
                style={{
                  width: isMobile ? 44 : 50, height: isMobile ? 44 : 50, borderRadius: "50%", border: "none",
                  background: isStreaming ? C.accent : input.trim() ? C.accent : C.surfaceAlt,
                  color: input.trim() || isStreaming ? "#fff" : C.textMuted,
                  cursor: input.trim() || isStreaming ? "pointer" : "default",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.2s ease",
                  boxShadow: (input.trim() || isStreaming) ? "0 4px 14px rgba(232,85,58,0.25)" : "none",
                  flexShrink: 0,
                  transform: (input.trim() || isStreaming) ? "scale(1)" : "scale(0.92)",
                }}
              >
                {isStreaming ? <StopIcon /> : <SendIcon />}
              </button>
            </div>
            {!isMobile && (
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 14, marginTop: 10, fontSize: 11 }}>
                <span style={{ color: C.textMuted }}>
                  <kbd style={{ padding: "1px 5px", borderRadius: 4, border: `1px solid ${C.border}`, background: C.surfaceAlt, fontSize: 10, color: C.textSecondary, fontFamily: "'Inter', sans-serif" }}>Enter</kbd>
                  {" "}to send &middot;{" "}
                  <kbd style={{ padding: "1px 5px", borderRadius: 4, border: `1px solid ${C.border}`, background: C.surfaceAlt, fontSize: 10, color: C.textSecondary, fontFamily: "'Inter', sans-serif" }}>Shift+Enter</kbd>
                  {" "}for new line
                </span>
                <span style={{ color: C.textMuted }}>&middot;</span>
                <span style={{ color: C.textMuted }}>Slash AI can make mistakes. Verify important information.</span>
              </div>
            )}
          </div>
        </>
      )}

      </div>{/* end main content column */}
    </div>
  );
}
