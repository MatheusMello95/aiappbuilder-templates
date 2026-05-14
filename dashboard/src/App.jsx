import { useState, useEffect } from 'react'
import {
  LayoutDashboard, ListTodo, Calendar, BarChart3, Users,
  Settings, HelpCircle, LogOut, Search, Mail, Bell,
  ArrowUpRight, TrendingUp, Plus, Video, Pause, Square, Play,
  Sun, Moon, Smartphone, Code2, Menu,
  Clock, AlertTriangle, X, ChevronRight, CalendarDays,
  Inbox, UserPlus, CalendarX,
  Palette
} from 'lucide-react'
import './App.css'

const sidebarMenu = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: ListTodo, label: 'Tasks', badge: '12+' },
  { icon: Calendar, label: 'Calendar' },
  { icon: BarChart3, label: 'Analytics' },
  { icon: Users, label: 'Team' },
]

const sidebarGeneral = [
  { icon: Settings, label: 'Settings' },
  { icon: HelpCircle, label: 'Help' },
  { icon: LogOut, label: 'Logout' },
]

const statCards = [
  {
    title: 'Total Projects', value: 24, change: '+18%', footer: 'from last month',
    highlighted: true, trend: 'up', accent: 'green',
  },
  {
    title: 'Ended Projects', value: 10, change: '+12%', footer: 'from last month',
    highlighted: false, trend: 'up', accent: 'blue',
  },
  {
    title: 'Running Projects', value: 12, change: '+8%', footer: 'from last month',
    highlighted: false, trend: 'up', accent: 'amber',
  },
  {
    title: 'Pending Projects', value: 2, change: '-3%', footer: '2 awaiting review',
    highlighted: false, trend: 'neutral', accent: 'purple',
  },
]

const chartData = [
  { day: 'S', value: 18, striped: true },
  { day: 'M', value: 32, striped: false },
  { day: 'T', value: 45, striped: false },
  { day: 'W', value: 28, striped: true },
  { day: 'T', value: 22, striped: true },
  { day: 'F', value: 38, striped: false },
  { day: 'S', value: 15, striped: true },
]

const maxChartValue = 50
const chartGoal = 35

const projects = [
  { name: 'Develop API Endpoints', date: 'Mar 26, 2026', progress: 85, overdue: false, emoji: '⚡', bg: '#eef2ff', iconColor: '#4f46e5' },
  { name: 'Onboarding Flow', date: 'Mar 28, 2026', progress: 62, overdue: false, emoji: '🔀', bg: '#fdf2f8', iconColor: '#db2777' },
  { name: 'Build Dashboard', date: 'Mar 20, 2026', progress: 45, overdue: true, emoji: '🎨', bg: '#f0fdfa', iconColor: '#0d9488' },
  { name: 'Optimize Page Load', date: 'Apr 5, 2026', progress: 30, overdue: false, emoji: '🚀', bg: '#fffbeb', iconColor: '#d97706' },
  { name: 'Cross-Browser Testing', date: 'Apr 6, 2026', progress: 10, overdue: false, emoji: '🌐', bg: '#faf5ff', iconColor: '#7c3aed' },
]

const reminders = [
  { title: 'Meeting with Arc Company', time: '02:00 PM – 04:00 PM', urgency: 'now' },
  { title: 'Design Review Sprint 4', time: '04:30 PM – 05:00 PM', urgency: 'soon' },
  { title: 'Weekly Standup', time: 'Tomorrow, 09:00 AM', urgency: 'later' },
]

const teamMembers = [
  { name: 'Sofia Martinez', task: 'Github Project Repository', status: 'completed', progress: 100, color: '#6366f1' },
  { name: 'James Chen', task: 'Integrate User Authentication', status: 'progress', progress: 68, color: '#ec4899' },
  { name: 'Priya Sharma', task: 'Search & Filter Functionality', status: 'pending', progress: 20, color: '#14b8a6' },
  { name: 'Lucas Bennett', task: 'Responsive Layout for Homepage', status: 'progress', progress: 45, color: '#f59e0b' },
]

const progressStats = { completed: 10, inProgress: 8, pending: 6, total: 24 }

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

function EmptyState({ icon: Icon, message }) {
  return (
    <div className="empty-state">
      <Icon size={32} />
      <p>{message}</p>
    </div>
  )
}

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')
  const [time, setTime] = useState({ h: 1, m: 24, s: 8 })
  const [isRunning, setIsRunning] = useState(true)
  const [showBanner, setShowBanner] = useState(true)
  const [loaded, setLoaded] = useState(false)
  const [trackerTask] = useState('Build Dashboard')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    requestAnimationFrame(() => setLoaded(true))
  }, [])

  useEffect(() => {
    if (!isRunning) return
    const interval = setInterval(() => {
      setTime(prev => {
        let { h, m, s } = prev
        s++
        if (s >= 60) { s = 0; m++ }
        if (m >= 60) { m = 0; h++ }
        return { h, m, s }
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [isRunning])

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light')
  const pad = (n) => String(n).padStart(2, '0')

  const gaugeRadius = 90
  const semiCircumference = Math.PI * gaugeRadius
  const completedPct = (progressStats.completed / progressStats.total) * 100
  const inProgressPct = ((progressStats.completed + progressStats.inProgress) / progressStats.total) * 100
  const completedOffset = semiCircumference - (completedPct / 100) * semiCircumference
  const inProgressOffset = semiCircumference - (inProgressPct / 100) * semiCircumference

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
  const goalLineY = ((maxChartValue - chartGoal) / maxChartValue) * 110

  return (
    <div className={`app-layout ${loaded ? 'loaded' : ''}`}>
      {/* Desktop Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-inner">
          <div className="sidebar-logo">
            <div className="logo-icon">
              <LayoutDashboard size={20} />
            </div>
            <h1>SlashDev</h1>
          </div>

          <div className="sidebar-section">
            <div className="sidebar-section-title">Menu</div>
            <nav className="sidebar-nav">
              {sidebarMenu.map((item) => (
                <button key={item.label} className={`sidebar-item ${item.active ? 'active' : ''}`}>
                  <item.icon size={20} />
                  {item.label}
                  {item.badge && <span className="badge">{item.badge}</span>}
                </button>
              ))}
            </nav>
          </div>

          <div className="sidebar-section">
            <div className="sidebar-section-title">General</div>
            <nav className="sidebar-nav">
              {sidebarGeneral.map((item) => (
                <button key={item.label} className="sidebar-item">
                  <item.icon size={20} />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="sidebar-spacer" />

          {showBanner && (
            <div className="sidebar-mobile-card">
              <button className="mobile-dismiss" onClick={() => setShowBanner(false)}>
                <X size={14} />
              </button>
              <div className="mobile-icon">
                <Smartphone size={20} />
              </div>
              <h4>Download our Mobile App</h4>
              <p>Get easy in another way</p>
              <button className="download-btn">Download</button>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-menu-panel" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <div className="sidebar-logo">
                <div className="logo-icon">
                  <LayoutDashboard size={20} />
                </div>
                <h1>SlashDev</h1>
              </div>
              <button className="mobile-menu-close" onClick={() => setMobileMenuOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <nav className="mobile-menu-nav">
              {sidebarMenu.map((item) => (
                <button key={item.label} className={`mobile-menu-item ${item.active ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
                  <item.icon size={20} />
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="mobile-menu-divider" />

            <nav className="mobile-menu-nav">
              {sidebarGeneral.map((item) => (
                <button key={item.label} className="mobile-menu-item" onClick={() => setMobileMenuOpen(false)}>
                  <item.icon size={20} />
                  {item.label}
                </button>
              ))}
            </nav>

            <button className="mobile-menu-cta" onClick={() => setMobileMenuOpen(false)}>
              <Plus size={16} />
              Add Project
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="main-content">
        {/* Top Bar */}
        <header className="topbar">
          <div className="topbar-left">
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(o => !o)}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
          <div className="topbar-search">
            <Search size={18} />
            <input type="text" placeholder="Search task" />
            <span className="shortcut">⌘ F</span>
          </div>

          <div className="topbar-right">
            <button className="theme-toggle" onClick={toggleTheme} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
              <div className="toggle-thumb">
                {theme === 'light' ? <Sun size={12} /> : <Moon size={12} />}
              </div>
            </button>

            <button className="topbar-icon-btn" title="Messages">
              <Mail size={20} />
            </button>
            <button className="topbar-icon-btn" title="Notifications">
              <Bell size={20} />
              <span className="notification-dot" />
            </button>

            <div className="topbar-divider" />

            <div className="topbar-profile">
              <div className="profile-info">
                <div className="profile-name">Alex Rivera</div>
                <div className="profile-email">arivera@mail.com</div>
              </div>
              <div className="avatar">AR</div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          <div className="dashboard-header">
            <div>
              <h2 className="greeting">{getGreeting()}, Alex</h2>
              <p className="header-subtitle">
                <CalendarDays size={14} />
                {today} &middot; Plan, prioritize, and accomplish your tasks with ease.
              </p>
            </div>
            <div className="dashboard-actions">
              <button className="btn-primary">
                <Plus size={16} />
                Add Project
              </button>
              <button className="btn-outline">Import Data</button>
            </div>
          </div>

          {/* Stat Cards */}
          <div className="stats-grid">
            {statCards.map((card, i) => (
              <div
                key={card.title}
                className={`stat-card stat-${card.accent} ${card.highlighted ? 'highlighted' : ''}`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="stat-card-header">
                  <span className="title">{card.title}</span>
                  <button className="arrow-btn" title="View details">
                    <ArrowUpRight size={16} />
                  </button>
                </div>
                <div className="stat-value">{card.value}</div>
                <div className="stat-footer">
                  {card.trend === 'up' && <TrendingUp size={14} />}
                  {card.change && <span className="stat-change">{card.change}</span>}
                  {card.footer}
                </div>
              </div>
            ))}
          </div>

          {/* Main Dashboard Grid */}
          <div className="dashboard-grid">
            {/* Project Analytics */}
            <div className="card grid-analytics">
              <div className="card-header">
                <h3>Project Analytics</h3>
                <span className="chart-legend-label">Tasks Completed</span>
              </div>
              <div className="analytics-chart">
                <div className="chart-y-axis">
                  <span>50</span>
                  <span>25</span>
                  <span>0</span>
                </div>
                <div className="chart-area">
                  <div className="chart-goal-line" style={{ bottom: `${(chartGoal / maxChartValue) * 110 + 24}px` }}>
                    <span className="goal-label">Goal: {chartGoal}</span>
                  </div>
                  {chartData.map((day, di) => (
                    <div key={di} className="chart-day">
                      <div className="chart-bars">
                        <div
                          className={`chart-bar pill ${day.striped ? 'striped' : 'solid'}`}
                          style={{ height: `${(day.value / maxChartValue) * 100}%` }}
                        >
                          <span className="tooltip">{day.value}</span>
                        </div>
                      </div>
                      <span className="chart-day-label">{day.day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Reminders */}
            <div className="card grid-reminders">
              <div className="card-header">
                <h3>Reminders</h3>
                <span className="reminder-count">{reminders.length} upcoming</span>
              </div>
              {reminders.length > 0 ? (
                <>
                  <div className="reminder-list">
                    {reminders.map((r, i) => (
                      <div key={i} className={`reminder-item urgency-${r.urgency}`}>
                        <div className={`reminder-dot dot-${r.urgency}`} />
                        <div className="reminder-info">
                          <div className="reminder-title">{r.title}</div>
                          <div className="reminder-time">
                            <Clock size={12} />
                            {r.time}
                          </div>
                        </div>
                        {r.urgency === 'now' && (
                          <button className="reminder-btn-sm">
                            <Video size={14} />
                            Join
                          </button>
                        )}
                        {r.urgency !== 'now' && <ChevronRight size={16} className="reminder-arrow" />}
                      </div>
                    ))}
                  </div>
                  <div className="reminder-urgency">
                    <Clock size={14} />
                    Next meeting starts in 45 min
                  </div>
                </>
              ) : (
                <EmptyState icon={CalendarX} message="No reminders today" />
              )}
            </div>

            {/* Project List */}
            <div className="card grid-projects">
              <div className="card-header">
                <h3>Projects</h3>
                <button className="btn-sm">+ New</button>
              </div>
              {projects.length > 0 ? (
                <div className="project-list">
                  {projects.map((project, i) => {
                    return (
                      <div key={project.name} className={`project-item ${project.overdue ? 'overdue' : ''}`}>
                        <div className="project-icon" style={{ background: project.bg }}>
                          <span className="project-emoji">{project.emoji}</span>
                        </div>
                        <div className="project-info">
                          <div className="project-name-row">
                            <span className="project-name">{project.name}</span>
                            {project.overdue && (
                              <span className="overdue-badge">
                                <AlertTriangle size={10} />
                                Overdue
                              </span>
                            )}
                          </div>
                          <div className="project-date">Due: {project.date}</div>
                          <div className="project-progress-row">
                            <div className="project-progress-bar">
                              <div
                                className="project-progress-fill"
                                style={{
                                  width: `${project.progress}%`,
                                  background: project.overdue ? 'var(--status-overdue)' : project.iconColor,
                                }}
                              />
                            </div>
                            <span className="project-percent">{project.progress}%</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <EmptyState icon={Inbox} message="No projects yet. Create one!" />
              )}
            </div>

            {/* Team Collaboration */}
            <div className="card grid-team">
              <div className="card-header">
                <h3>Team Collaboration</h3>
                <button className="btn-sm">+ Add Member</button>
              </div>
              {teamMembers.length > 0 ? (
                <div className="team-list">
                  {teamMembers.map((member) => (
                    <div key={member.name} className="team-member">
                      <div className="member-avatar" style={{ background: member.color }}>
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="member-info">
                        <div className="member-name">{member.name}</div>
                        <div className="member-task">
                          Working on <strong>{member.task}</strong>
                        </div>
                        <div className="member-progress-bar">
                          <div className="member-progress-fill" style={{ width: `${member.progress}%`, background: member.color }} />
                        </div>
                      </div>
                      <div className="member-right">
                        <span className={`member-status status-${member.status}`}>
                          {member.status === 'progress' ? 'In Progress' : member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                        </span>
                        <span className="member-percent">{member.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState icon={UserPlus} message="No team members yet" />
              )}
            </div>

            {/* Project Progress */}
            <div className="card grid-progress">
              <div className="card-header">
                <h3>Project Progress</h3>
              </div>
              <div className="progress-container">
                <div className="progress-gauge-wrapper">
                  <svg width="260" height="150" viewBox="0 0 260 150">
                    <defs>
                      <pattern id="gauge-stripes" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
                        <rect width="2.5" height="5" fill="var(--chart-stripe-fg)" />
                        <rect x="2.5" width="2.5" height="5" fill="var(--chart-stripe-bg)" />
                      </pattern>
                    </defs>
                    <path d="M 20,140 A 90,90 0 1,1 240,140" fill="none" stroke="url(#gauge-stripes)" strokeWidth="22" strokeLinecap="round" />
                    <path d="M 20,140 A 90,90 0 1,1 240,140" fill="none" stroke="var(--status-progress)" strokeWidth="22" strokeLinecap="round" strokeDasharray={semiCircumference} strokeDashoffset={inProgressOffset} className="progress-gauge-fill" />
                    <path d="M 20,140 A 90,90 0 1,1 240,140" fill="none" stroke="var(--status-completed)" strokeWidth="22" strokeLinecap="round" strokeDasharray={semiCircumference} strokeDashoffset={completedOffset} className="progress-gauge-fill" />
                  </svg>
                  <div className="progress-text">
                    <div className="percentage">{Math.round(completedPct)}%</div>
                    <div className="label">Project Ended</div>
                  </div>
                </div>
                <div className="progress-detail">
                  {progressStats.completed} of {progressStats.total} tasks completed
                </div>
                <div className="progress-legend">
                  <div className="legend-item">
                    <span className="legend-dot" style={{ background: 'var(--status-completed)' }} />
                    <span className="legend-text">Completed</span>
                    <span className="legend-count">{progressStats.completed}</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-dot" style={{ background: 'var(--status-progress)' }} />
                    <span className="legend-text">In Progress</span>
                    <span className="legend-count">{progressStats.inProgress}</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-dot legend-dot-striped" />
                    <span className="legend-text">Pending</span>
                    <span className="legend-count">{progressStats.pending}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Time Tracker */}
            <div className="card time-tracker-card grid-timer">
              <div className="card-header">
                <h3>Time Tracker</h3>
              </div>
              <div className="time-tracker-content">
                <div className="tracker-task-label">
                  <Palette size={12} />
                  {trackerTask}
                </div>
                <div className="time-display">
                  {pad(time.h)}:{pad(time.m)}:{pad(time.s)}
                </div>
                <div className="time-controls">
                  <button
                    className="pause-btn"
                    onClick={() => setIsRunning(r => !r)}
                    title={isRunning ? 'Pause' : 'Resume'}
                  >
                    {isRunning ? <Pause size={20} /> : <Play size={20} />}
                  </button>
                  <button
                    className="stop-btn"
                    onClick={() => { setIsRunning(false); setTime({ h: 0, m: 0, s: 0 }) }}
                    title="Stop & Reset"
                  >
                    <Square size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
