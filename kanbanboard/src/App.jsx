import { useState, useRef, useMemo, useEffect } from 'react'
import './App.css'

const COLUMNS = [
  { id: 'todo', title: 'To-Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'review', title: 'Review' },
  { id: 'done', title: 'Complete' },
]

const TEAM_MEMBERS = [
  { id: 1, name: 'Amelia Fardan', avatar: 'AF', color: '#6366f1' },
  { id: 2, name: 'Bob Chen', avatar: 'BC', color: '#ec4899' },
  { id: 3, name: 'Carol Davis', avatar: 'CD', color: '#f59e0b' },
  { id: 4, name: 'Dan Wilson', avatar: 'DW', color: '#10b981' },
  { id: 5, name: 'Eva Lopez', avatar: 'EL', color: '#ef4444' },
]

const TAGS = {
  design: { label: 'Design', color: '#a78bfa' },
  development: { label: 'Development', color: '#60a5fa' },
  research: { label: 'Research', color: '#f472b6' },
  testing: { label: 'Testing', color: '#34d399' },
  content: { label: 'Content', color: '#fbbf24' },
}

const WORKSPACES = [
  { id: 'web', name: 'Web Design', active: true },
  { id: 'mobile', name: 'Mobile App', active: false },
  { id: 'ecommerce', name: 'Ecommerce', active: false },
  { id: 'marketing', name: 'Digital Marketing', active: false },
]

const THUMBNAILS = {
  gradient1: 'url(https://picsum.photos/seed/design-system/400/200)',
  gradient2: 'url(https://picsum.photos/seed/illustrations/400/200)',
  gradient3: 'url(https://picsum.photos/seed/wireframes/400/200)',
  gradient4: 'url(https://picsum.photos/seed/moodboard/400/200)',
  gradient5: 'url(https://picsum.photos/seed/brainstorm/400/200)',
  gradient6: 'url(https://picsum.photos/seed/research/400/200)',
}

function today() {
  return new Date().toISOString().slice(0, 10)
}

function addDays(dateStr, days) {
  const d = new Date(dateStr)
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

const NOW = today()

const initialTasks = [
  { id: 1, title: 'Design System', description: 'Create a comprehensive design system with components', tags: ['design'], column: 'todo', assignees: [], thumbnail: 'gradient1', startDate: addDays(NOW, -2), deadline: addDays(NOW, 8), subtasksDone: 0, subtasksTotal: 4, attachments: 2, priority: 'high' },
  { id: 2, title: 'High Fidelity - UI', description: 'Create high-fidelity UI mockups for all pages', tags: ['design'], column: 'todo', assignees: [], thumbnail: null, startDate: addDays(NOW, -7), deadline: addDays(NOW, 0), subtasksDone: 0, subtasksTotal: 6, attachments: 0, priority: 'high' },
  { id: 3, title: 'High Fidelity - Prototyping', description: 'Interactive prototype for user testing', tags: ['design', 'research'], column: 'todo', assignees: [], thumbnail: null, startDate: addDays(NOW, -10), deadline: addDays(NOW, -3), subtasksDone: 0, subtasksTotal: 3, attachments: 1, priority: 'urgent' },
  { id: 4, title: 'Usability Testing', description: 'Conduct usability testing sessions with users', tags: ['research'], column: 'todo', assignees: [], thumbnail: null, startDate: NOW, deadline: addDays(NOW, 21), subtasksDone: 0, subtasksTotal: 5, attachments: 0, priority: 'low' },
  { id: 5, title: 'Copywriting Guide', description: 'Write copy guidelines and tone of voice document', tags: ['content'], column: 'in-progress', assignees: [1, 2], thumbnail: null, startDate: addDays(NOW, -12), deadline: addDays(NOW, -2), subtasksDone: 3, subtasksTotal: 5, attachments: 1, priority: 'urgent' },
  { id: 6, title: 'Illustrations', description: 'Create custom illustration set for the platform', tags: ['design'], column: 'in-progress', assignees: [3], thumbnail: 'gradient2', startDate: addDays(NOW, -5), deadline: addDays(NOW, 10), subtasksDone: 2, subtasksTotal: 8, attachments: 4, priority: 'medium' },
  { id: 7, title: 'Wireframing', description: 'Low-fidelity wireframes for all user flows', tags: ['design'], column: 'in-progress', assignees: [4, 5], thumbnail: 'gradient3', startDate: addDays(NOW, -10), deadline: addDays(NOW, 0), subtasksDone: 5, subtasksTotal: 7, attachments: 2, priority: 'high' },
  { id: 8, title: 'Moodboard', description: 'Visual moodboard for brand direction', tags: ['design', 'research'], column: 'review', assignees: [1], thumbnail: 'gradient4', startDate: addDays(NOW, -12), deadline: addDays(NOW, -4), subtasksDone: 4, subtasksTotal: 4, attachments: 3, priority: 'medium' },
  { id: 9, title: 'Brainstorming', description: 'Brainstorm session notes and outcomes', tags: ['research'], column: 'review', assignees: [2, 3], thumbnail: 'gradient5', startDate: addDays(NOW, -6), deadline: addDays(NOW, 4), subtasksDone: 3, subtasksTotal: 3, attachments: 1, priority: 'low' },
  { id: 10, title: 'Component Library', description: 'Build reusable component library in Figma', tags: ['design', 'development'], column: 'done', assignees: [1, 4], thumbnail: null, startDate: addDays(NOW, -20), deadline: addDays(NOW, -2), subtasksDone: 6, subtasksTotal: 6, attachments: 5, priority: 'high' },
  { id: 11, title: 'User Research Report', description: 'Compile findings from user interviews', tags: ['research'], column: 'done', assignees: [5], thumbnail: 'gradient6', startDate: addDays(NOW, -14), deadline: addDays(NOW, -5), subtasksDone: 4, subtasksTotal: 4, attachments: 2, priority: 'medium' },
  { id: 12, title: 'API Integration', description: 'Connect frontend with backend REST API endpoints', tags: ['development'], column: 'in-progress', assignees: [2], thumbnail: null, startDate: addDays(NOW, -14), deadline: addDays(NOW, -5), subtasksDone: 2, subtasksTotal: 6, attachments: 3, priority: 'urgent' },
  { id: 13, title: 'Accessibility Audit', description: 'Run WCAG 2.1 AA compliance checks on all pages', tags: ['testing'], column: 'review', assignees: [5, 1], thumbnail: null, startDate: addDays(NOW, -8), deadline: addDays(NOW, -1), subtasksDone: 5, subtasksTotal: 7, attachments: 2, priority: 'high' },
]

const PRIORITIES = {
  urgent: { label: 'Urgent', color: '#ef4444', icon: '!!' },
  high: { label: 'High', color: '#f97316', icon: '!' },
  medium: { label: 'Medium', color: '#f59e0b', icon: '-' },
  low: { label: 'Low', color: '#22c55e', icon: null },
}

function getDeadlineInfo(startDate, deadline, column) {
  if (column === 'done') {
    return { status: 'completed' }
  }
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  const deadlineDate = new Date(deadline)
  deadlineDate.setHours(0, 0, 0, 0)
  const daysLeft = Math.ceil((deadlineDate - now) / 86400000)

  if (daysLeft < 0) return { status: 'overdue' }
  if (daysLeft === 0) return { status: 'due-today' }
  if (daysLeft <= 2) return { status: 'urgent' }
  if (daysLeft <= 5) return { status: 'warning' }
  return { status: 'on-track' }
}

function App() {
  const [tasks, setTasks] = useState(initialTasks)
  const [draggedTaskId, setDraggedTaskId] = useState(null)
  const [dragOverColumn, setDragOverColumn] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [activeTab, setActiveTab] = useState('board')
  const [activeFilter, setActiveFilter] = useState('all')
  const [newTask, setNewTask] = useState({ title: '', description: '', tags: ['design'] })
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    }
    return 'light'
  })
  const dragCounter = useRef({})

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark')

  const filters = [
    { id: 'all', label: 'All Tasks' },
    ...Object.entries(TAGS).map(([key, tag]) => ({ id: key, label: tag.label, color: tag.color })),
  ]

  const filteredTasks = useMemo(() => {
    if (activeFilter === 'all') return tasks
    return tasks.filter(t => t.tags.includes(activeFilter))
  }, [tasks, activeFilter])

  const handleDragStart = (e, taskId) => {
    setDraggedTaskId(taskId)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragEnd = () => {
    setDraggedTaskId(null)
    setDragOverColumn(null)
    dragCounter.current = {}
  }

  const handleDragEnter = (e, columnId) => {
    e.preventDefault()
    dragCounter.current[columnId] = (dragCounter.current[columnId] || 0) + 1
    setDragOverColumn(columnId)
  }

  const handleDragLeave = (_e, columnId) => {
    dragCounter.current[columnId] = (dragCounter.current[columnId] || 0) - 1
    if (dragCounter.current[columnId] <= 0) {
      dragCounter.current[columnId] = 0
      if (dragOverColumn === columnId) setDragOverColumn(null)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e, columnId) => {
    e.preventDefault()
    dragCounter.current[columnId] = 0
    setDragOverColumn(null)
    if (draggedTaskId === null) return

    setTasks(prev => prev.map(task => {
      if (task.id !== draggedTaskId) return task
      let assignees = task.assignees
      if (columnId === 'todo') {
        assignees = []
      } else if (assignees.length === 0 && columnId !== 'todo') {
        const usedIds = prev.filter(t => t.column === columnId).flatMap(t => t.assignees)
        const available = TEAM_MEMBERS.filter(m => !usedIds.includes(m.id))
        assignees = available.length > 0 ? [available[0].id] : [TEAM_MEMBERS[0].id]
      }
      return { ...task, column: columnId, assignees }
    }))
    setDraggedTaskId(null)
  }

  const handleAddTask = (e) => {
    e.preventDefault()
    if (!newTask.title.trim()) return
    const id = Math.max(...tasks.map(t => t.id), 0) + 1
    setTasks(prev => [...prev, {
      id, title: newTask.title.trim(), description: newTask.description.trim(),
      tags: newTask.tags, column: 'todo', assignees: [], thumbnail: null,
      startDate: NOW, deadline: addDays(NOW, 14), subtasksDone: 0, subtasksTotal: 0,
      attachments: 0, priority: 'medium',
    }])
    setNewTask({ title: '', description: '', tags: ['design'] })
    setShowAddModal(false)
  }

  const moveTask = (taskId, toColumn) => {
    setTasks(prev => prev.map(task => {
      if (task.id !== taskId) return task
      let assignees = task.assignees
      if (toColumn === 'todo') {
        assignees = []
      } else if (assignees.length === 0 && toColumn !== 'todo') {
        const usedIds = prev.filter(t => t.column === toColumn).flatMap(t => t.assignees)
        const available = TEAM_MEMBERS.filter(m => !usedIds.includes(m.id))
        assignees = available.length > 0 ? [available[0].id] : [TEAM_MEMBERS[0].id]
      }
      return { ...task, column: toColumn, assignees }
    }))
  }

  const getColumnTasks = (columnId) => filteredTasks.filter(t => t.column === columnId)
  const getMember = (id) => TEAM_MEMBERS.find(m => m.id === id)

  const tabs = [
    { id: 'list', label: 'List', icon: 'list' },
    { id: 'board', label: 'Board', icon: 'board' },
    { id: 'schedule', label: 'Schedule', icon: 'schedule' },
    { id: 'files', label: 'Files', icon: 'files' },
    { id: 'report', label: 'Report', icon: 'report' },
  ]

  return (
    <div className="app-layout">
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" rx="2" />
              <rect x="14" y="3" width="7" height="7" rx="2" />
              <rect x="3" y="14" width="7" height="7" rx="2" />
              <rect x="14" y="14" width="7" height="7" rx="2" />
            </svg>
          </div>
          <span className="logo-text">Dashboard</span>
        </div>
        <div className="sidebar-profile">
          <div className="sidebar-avatar" style={{ backgroundColor: '#6366f1' }}>AF</div>
          <div className="sidebar-profile-info">
            <span className="sidebar-profile-name">Amelia Fardan</span>
            <span className="sidebar-profile-role">Product Manager</span>
          </div>
        </div>
        <nav className="sidebar-nav">
          <a className="nav-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="22 12 16 12 14 15 10 9 8 12 2 12" /></svg>Inbox<span className="nav-badge">3</span></a>
          <a className="nav-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>Drive Files</a>
          <a className="nav-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>Google Calendar</a>
          <a className="nav-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>Analytics</a>
        </nav>
        <div className="sidebar-section">
          <span className="section-label">FAVORITES</span>
          <a className="nav-item workspace-item"><span className="workspace-dot" style={{ background: '#f59e0b' }} />CRM Dashboard</a>
          <a className="nav-item workspace-item active"><span className="workspace-dot" style={{ background: '#6366f1' }} />Ecommerce</a>
          <a className="nav-item workspace-item"><span className="workspace-dot" style={{ background: '#10b981' }} />Cryptocurrency</a>
        </div>
        <div className="sidebar-section">
          <span className="section-label">PROJECTS</span>
          {WORKSPACES.map(ws => (
            <a key={ws.id} className={`nav-item workspace-item ${ws.active ? 'active' : ''}`}><span className="workspace-dot" />{ws.name}</a>
          ))}
        </div>
        <div className="sidebar-bottom">
          <div className="sidebar-section">
            <span className="section-label">SCHEDULE</span>
            <a className="nav-item workspace-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>Brand Calendar</a>
            <a className="nav-item workspace-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>Brand Logo Design</a>
            <a className="nav-item workspace-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>User Research</a>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <div className="topbar">
          <button className="hamburger-btn" onClick={() => setSidebarOpen(prev => !prev)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
          </button>
          <div className="topbar-left">
            <div className="search-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              <input type="text" placeholder="Search project or task..." />
            </div>
          </div>
          <div className="topbar-right">
            <button className="theme-toggle" onClick={toggleTheme} title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
              <div className="toggle-track">
                <svg className="toggle-icon sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
                <svg className="toggle-icon moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
                <div className={`toggle-thumb ${theme === 'dark' ? 'dark' : ''}`} />
              </div>
            </button>
            <button className="topbar-icon-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
            </button>
            <div className="user-profile">
              <div className="user-avatar" style={{ backgroundColor: '#6366f1' }}>AF</div>
              <div className="user-info">
                <span className="user-name">Amelia Fardan</span>
                <span className="user-role">Moderator</span>
              </div>
            </div>
          </div>
        </div>

        <div className="project-header">
          <div className="breadcrumb">
            <span>Workspaces</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
            <span>Web Design</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
            <span className="breadcrumb-current">Board</span>
          </div>
          <div className="project-title-row">
            <h1>Web Design</h1>
            <div className="project-actions">
              <button className="icon-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" /></svg></button>
              <button className="icon-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg></button>
              <button className="icon-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg></button>
            </div>
          </div>
          <div className="tabs-row">
            <div className="tabs">
              {tabs.map(tab => (
                <button key={tab.id} className={`tab ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
                  <TabIcon type={tab.icon} />{tab.label}
                </button>
              ))}
            </div>
            <div className="tabs-right">
              <div className="team-avatars">
                {TEAM_MEMBERS.map(member => (
                  <div key={member.id} className="team-avatar" style={{ backgroundColor: member.color }} title={member.name}>{member.avatar}</div>
                ))}
              </div>
              <button className="add-task-btn" onClick={() => setShowAddModal(true)}>
                Add task
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
              </button>
            </div>
          </div>
        </div>

        <div className="filter-bar">
          {filters.map(filter => (
            <button key={filter.id} className={`filter-chip ${activeFilter === filter.id ? 'active' : ''}`} onClick={() => setActiveFilter(filter.id)}
              style={filter.color ? { '--chip-color': filter.color, '--chip-bg': filter.color + '18' } : undefined}>
              {filter.color && <span className="filter-dot" style={{ backgroundColor: filter.color }} />}
              {filter.label}
            </button>
          ))}
        </div>

        <div className="kanban-board">
          {COLUMNS.map(column => {
            const columnTasks = getColumnTasks(column.id)
            const isOver = dragOverColumn === column.id
            return (
              <div key={column.id} className={`kanban-column ${isOver ? 'drag-over' : ''}`}
                onDragEnter={(e) => handleDragEnter(e, column.id)} onDragLeave={(e) => handleDragLeave(e, column.id)}
                onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, column.id)}>
                <div className={`column-header col-${column.id}`}>
                  <div className="column-header-left">
                    <span className={`column-dot ${column.id}`} />
                    <h2>{column.title}</h2>
                    <span className="task-count">{columnTasks.length}</span>
                  </div>
                  <button className="column-add-btn" onClick={() => setShowAddModal(true)} title="Add task">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </button>
                </div>
                <div className="column-tasks">
                  {columnTasks.map(task => (
                    <TaskCard key={task.id} task={task} isDragging={draggedTaskId === task.id}
                      onDragStart={handleDragStart} onDragEnd={handleDragEnd} getMember={getMember} onMove={moveTask} />
                  ))}
                  {columnTasks.length === 0 && (
                    <div className="empty-column">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="3" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>
                      <p>Drop tasks here</p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </main>

      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>New Task</h2>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>
            <form onSubmit={handleAddTask}>
              <div className="form-group">
                <label htmlFor="task-title">Title</label>
                <input id="task-title" type="text" placeholder="Enter task title..." value={newTask.title}
                  onChange={e => setNewTask(prev => ({ ...prev, title: e.target.value }))} autoFocus />
              </div>
              <div className="form-group">
                <label htmlFor="task-desc">Description</label>
                <textarea id="task-desc" placeholder="Enter task description..." rows={3} value={newTask.description}
                  onChange={e => setNewTask(prev => ({ ...prev, description: e.target.value }))} />
              </div>
              <div className="form-group">
                <label>Tags</label>
                <div className="tag-select">
                  {Object.entries(TAGS).map(([key, tag]) => (
                    <label key={key} className="tag-option">
                      <input type="checkbox" checked={newTask.tags.includes(key)}
                        onChange={(e) => setNewTask(prev => ({ ...prev, tags: e.target.checked ? [...prev.tags, key] : prev.tags.filter(t => t !== key) }))} />
                      <span className="tag-chip" style={{ backgroundColor: tag.color + '25', color: tag.color }}>{tag.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <p className="form-hint">New tasks are added to "To-Do" as unassigned.</p>
              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="btn-submit">Create Task</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

function TaskCard({ task, isDragging, onDragStart, onDragEnd, getMember, onMove }) {
  const [showMoveMenu, setShowMoveMenu] = useState(false)
  const thumbnail = task.thumbnail ? THUMBNAILS[task.thumbnail] : null
  const primaryTag = TAGS[task.tags[0]]
  const accentColor = primaryTag ? primaryTag.color : '#94a3b8'
  const progressPercent = task.subtasksTotal > 0 ? Math.round((task.subtasksDone / task.subtasksTotal) * 100) : 0
  const isComplete = progressPercent === 100
  const deadlineInfo = getDeadlineInfo(task.startDate, task.deadline, task.column)
  const borderColor = task.column === 'done' ? '#22c55e' : deadlineInfo.status === 'overdue' || deadlineInfo.status === 'due-today' ? '#ef4444' : deadlineInfo.status === 'urgent' ? '#f97316' : accentColor
  const priority = PRIORITIES[task.priority]
  const otherColumns = COLUMNS.filter(c => c.id !== task.column)

  return (
    <div className={`task-card ${isDragging ? 'dragging' : ''} deadline-${deadlineInfo.status}`}
      draggable onDragStart={(e) => onDragStart(e, task.id)} onDragEnd={onDragEnd}
      style={{ '--card-accent': borderColor }}>
      <div className="card-accent" />
      <div className="task-body">
        <div className="task-top-row">
          <div className="task-tags">
            {task.tags.map(tagKey => {
              const tag = TAGS[tagKey]
              if (!tag) return null
              return (
                <span key={tagKey} className="tag-badge" style={{ backgroundColor: tag.color + '20', color: tag.color }}>
                  <span className="tag-dot" style={{ backgroundColor: tag.color }} />{tag.label}
                </span>
              )
            })}
          </div>
          <div className="task-top-actions">
            {priority && priority.icon && (
              <span className="priority-indicator" style={{ color: priority.color, backgroundColor: priority.color + '18' }} title={priority.label}>
                {priority.icon}
              </span>
            )}
            <button className="move-btn" onClick={(e) => { e.stopPropagation(); setShowMoveMenu(!showMoveMenu) }} title="Move task">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="5 9 2 12 5 15" /><polyline points="9 5 12 2 15 5" />
                <polyline points="15 19 12 22 9 19" /><polyline points="19 9 22 12 19 15" />
                <line x1="2" y1="12" x2="22" y2="12" /><line x1="12" y1="2" x2="12" y2="22" />
              </svg>
            </button>
          </div>
        </div>

        {showMoveMenu && (
          <div className="move-menu">
            <span className="move-menu-label">Move to:</span>
            <div className="move-menu-options">
              {otherColumns.map(col => (
                <button key={col.id} className={`move-option col-opt-${col.id}`}
                  onClick={(e) => { e.stopPropagation(); onMove(task.id, col.id); setShowMoveMenu(false) }}>
                  <span className={`move-dot ${col.id}`} />
                  {col.title}
                </button>
              ))}
            </div>
          </div>
        )}

        <h3 className="task-title">{task.title}</h3>

        {thumbnail && (
          <div className="task-thumbnail" style={{ background: thumbnail }}>
            <div className="thumbnail-overlay" />
          </div>
        )}

        {task.description && <p className="task-description">{task.description}</p>}

        {task.subtasksTotal > 0 && (
          <div className="subtask-progress">
            <div className={`progress-bar ${isComplete ? 'complete' : ''}`}>
              <div className="progress-fill" style={{ width: `${progressPercent}%`, backgroundColor: isComplete ? '#22c55e' : accentColor }} />
            </div>
            <span className={`progress-pill ${isComplete ? 'complete' : ''}`} style={isComplete ? {} : { color: accentColor, backgroundColor: accentColor + '18' }}>
              {task.subtasksDone}/{task.subtasksTotal}
            </span>
          </div>
        )}

        <div className="task-footer">
          <div className="task-footer-left">
            {task.assignees.length > 0 ? (
              <div className="task-avatars">
                {task.assignees.map(id => {
                  const member = getMember(id)
                  if (!member) return null
                  return (
                    <div key={id} className="mini-avatar" style={{ backgroundColor: member.color }} title={member.name}>
                      {member.avatar}
                      <span className="avatar-tooltip">{member.name}</span>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="task-unassigned">
                <div className="mini-avatar unassigned-av">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4" /><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" /></svg>
                </div>
              </div>
            )}
          </div>
          <div className="task-meta-row">
            {task.attachments > 0 && (
              <div className="meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>
                <span>{task.attachments}</span>
              </div>
            )}
            <div className="meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
              <span>{(task.id * 3 + 1) % 7 + 1}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TabIcon({ type }) {
  const p = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '1.8' }
  switch (type) {
    case 'list': return <svg {...p}><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>
    case 'board': return <svg {...p}><rect x="3" y="3" width="7" height="18" rx="1.5" /><rect x="14" y="3" width="7" height="10" rx="1.5" /></svg>
    case 'schedule': return <svg {...p}><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
    case 'files': return <svg {...p}><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>
    case 'report': return <svg {...p}><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
    default: return null
  }
}

export default App
