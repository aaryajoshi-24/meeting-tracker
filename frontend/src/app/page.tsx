import React from "react";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-purple-500/30 selection:text-purple-200 overflow-x-hidden font-sans">
      
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[10%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-purple-600/10 blur-[80px] sm:blur-[120px] animate-pulse" />
        <div className="absolute top-[15%] right-[5%] w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] rounded-full bg-indigo-600/10 blur-[80px] sm:blur-[120px]" />
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none z-0" />

      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-800/60 bg-slate-950/70 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 shadow-md shadow-purple-500/20">
              <svg
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            </div>
            <span className="bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-xl font-bold tracking-tight text-transparent">
              MeetTrack
            </span>
          </div>

          {/* Navigation Items */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-purple-400 transition-colors">Features</a>
            <a href="#about" className="hover:text-purple-400 transition-colors">How It Works</a>
            <a href="#pricing" className="hover:text-purple-400 transition-colors">Pricing</a>
          </nav>

          {/* Action Button */}
          <div>
            <button className="inline-flex h-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/50 px-4 text-sm font-medium text-slate-300 transition-all hover:bg-slate-800 hover:text-white hover:border-slate-700 active:scale-95">
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-28 sm:pb-24">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-500/5 px-3 py-1 text-xs sm:text-sm font-medium text-purple-400 shadow-inner">
            <span className="flex h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />
            Introducing Meeting Accountability v1.0
          </div>

          {/* Heading */}
          <h1 className="mt-8 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-none">
            <span className="block bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
              Never Let Action Items
            </span>
            <span className="block mt-2 bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent pb-1">
              Fall Through the Cracks
            </span>
          </h1>

          {/* Subheading */}
          <p className="mt-6 max-w-2xl text-base sm:text-lg md:text-xl text-slate-400 font-normal leading-relaxed">
            MeetTrack automates accountability. Our AI transcribes your meetings, captures decisions, extracts action items, and nudges team members automatically until the job is done.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-8 text-base font-semibold text-white shadow-lg shadow-purple-500/25 transition-all hover:shadow-purple-500/35 hover:scale-[1.02] active:scale-95">
              Get Started Free
              <svg
                className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            <button className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/30 px-8 text-base font-medium text-slate-300 transition-all hover:bg-slate-900 hover:text-white hover:border-slate-700 active:scale-95">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section id="features" className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-t border-slate-900">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Everything you need to keep teams aligned
          </h2>
          <p className="mt-4 text-slate-400">
            A frictionless ecosystem to translate conversation into real, measurable progress.
          </p>
        </div>

        {/* 3-column Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          
          {/* Card 1: AI Transcription */}
          <div className="group relative rounded-2xl border border-slate-800/80 bg-slate-900/40 p-8 hover:bg-slate-900/60 hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="relative">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white tracking-tight">AI Transcription</h3>
              <p className="mt-4 text-slate-400 text-sm leading-relaxed">
                Convert meeting conversations into high-fidelity transcripts. Automatically summarize core topics and identify task items spoken during the session.
              </p>
              <ul className="mt-6 space-y-2 text-xs text-slate-400">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                  Real-time speech-to-text
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                  Speaker diarization
                </li>
              </ul>
            </div>
          </div>

          {/* Card 2: Auto Reminders */}
          <div className="group relative rounded-2xl border border-slate-800/80 bg-slate-900/40 p-8 hover:bg-slate-900/60 hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="relative">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white tracking-tight">Auto Reminders</h3>
              <p className="mt-4 text-slate-400 text-sm leading-relaxed">
                Keep the team focused. Automatically nudge task assignees via Email, Slack, or MS Teams prior to deadlines, providing conversational context.
              </p>
              <ul className="mt-6 space-y-2 text-xs text-slate-400">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                  Multi-channel notifications
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                  Custom escalation schedules
                </li>
              </ul>
            </div>
          </div>

          {/* Card 3: Analytics Dashboard */}
          <div className="group relative rounded-2xl border border-slate-800/80 bg-slate-900/40 p-8 hover:bg-slate-900/60 hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="relative">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white tracking-tight">Analytics Dashboard</h3>
              <p className="mt-4 text-slate-400 text-sm leading-relaxed">
                Measure team velocity and meeting efficiency. Identify completion rate patterns, overdue items, and individual accountability metrics in beautiful charts.
              </p>
              <ul className="mt-6 space-y-2 text-xs text-slate-400">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                  Accountability score tracking
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                  Meeting efficiency index
                </li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-12 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">MeetTrack</span>
            <span>&copy; {new Date().getFullYear()} MeetTrack Inc. All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
