"use client";
import React, { useState } from "react";
const API_BASE = "https://meettrack-api.onrender.com";
export default function AppPage() {
  const [step, setStep] = useState(1);
  const [meetingTitle, setMeetingTitle] = useState("");
  const [meetingId, setMeetingId] = useState("");
  const [transcript, setTranscript] = useState("");
  const [actionItems, setActionItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  async function createMeeting() {
    if (!meetingTitle) return alert("Please enter a meeting title!");
    setLoading(true); setLoadingText("Creating meeting...");
    try {
      const res = await fetch(API_BASE + "/meetings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title: meetingTitle, description: "Created via MeetTrack", meeting_date: new Date().toISOString() }) });
      const data = await res.json(); setMeetingId(data.id); setStep(2);
    } catch { alert("Error!"); }
    setLoading(false);
  }
  async function transcribeAudio() {
    if (!audioFile) return alert("Please upload an audio file!");
    setLoading(true); setLoadingText("Transcribing audio with AI...");
    try {
      const formData = new FormData(); formData.append("file", audioFile);
      const res = await fetch(API_BASE + "/transcribe", { method: "POST", body: formData });
      const data = await res.json(); setTranscript(data.transcript); setStep(3);
    } catch { alert("Error!"); }
    setLoading(false);
  }
  async function extractItems() {
    setLoading(true); setLoadingText("AI extracting action items...");
    try {
      const res = await fetch(API_BASE + "/extract", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ transcript: transcript, meeting_id: meetingId }) });
      const data = await res.json(); setActionItems(data.action_items); setStep(4);
    } catch { alert("Error!"); }
    setLoading(false);
  }
  async function sendReminder(item) {
    try {
      await fetch(API_BASE + "/notify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ task: item.task, assigned_to: item.assigned_to, deadline: item.deadline, meeting_title: meetingTitle }) });
      alert("Slack reminder sent!");
    } catch { alert("Error!"); }
  }
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <nav className="border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <a href="/" className="font-semibold text-lg text-white">MeetTrack</a>
        <a href="/dashboard" className="text-sm text-purple-400">Dashboard</a>
      </nav>
      <div className="max-w-3xl mx-auto px-6 py-10">
        {loading && <div className="text-center py-12"><p className="text-purple-300 text-lg">{loadingText}</p></div>}
        {!loading && step === 1 && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-2 text-white">Start a new meeting</h2>
            <p className="text-slate-400 mb-6">Give your meeting a name to get started</p>
            <input type="text" placeholder="e.g. Sprint Planning..." value={meetingTitle} onChange={function(e) { setMeetingTitle(e.target.value); }} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white mb-4" />
            <button onClick={createMeeting} className="w-full bg-purple-600 text-white font-semibold py-3 rounded-xl">Create Meeting</button>
          </div>
        )}
        {!loading && step === 2 && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-2 text-white">Upload meeting audio</h2>
            <p className="text-slate-400 mb-6">Supports mp3, mp4, wav, m4a</p>
            <div className="border-2 border-dashed border-slate-700 rounded-xl p-10 text-center cursor-pointer mb-4" onClick={function() { document.getElementById("audioInput").click(); }}>
              {audioFile ? <p className="text-green-400">{audioFile.name}</p> : <p className="text-slate-400">Click to upload audio file</p>}
              <input id="audioInput" type="file" accept=".mp3,.mp4,.wav,.m4a" className="hidden" onChange={function(e) { setAudioFile(e.target.files[0]); }} />
            </div>
            <button onClick={transcribeAudio} disabled={!audioFile} className="w-full bg-purple-600 disabled:opacity-50 text-white font-semibold py-3 rounded-xl">Transcribe with AI</button>
          </div>
        )}
        {!loading && step === 3 && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-2 text-white">Review transcript</h2>
            <textarea value={transcript} onChange={function(e) { setTranscript(e.target.value); }} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white h-48 resize-none mb-4" />
            <button onClick={extractItems} className="w-full bg-purple-600 text-white font-semibold py-3 rounded-xl">Extract Action Items with AI</button>
          </div>
        )}
        {!loading && step === 4 && (
          <div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mb-4">
              <h2 className="text-2xl font-bold mb-2 text-white">Action Items</h2>
              <p className="text-slate-400 mb-6">Found {actionItems.length} action items</p>
              <div className="space-y-4">
                {actionItems.map(function(item, i) { return (
                  <div key={i} className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium text-white">{item.task}</p>
                      <div className="flex gap-3 mt-2 text-sm text-slate-400">
                        <span>{item.assigned_to}</span>
                        <span>{item.deadline || "No deadline"}</span>
                        <span>{item.priority}</span>
                      </div>
                    </div>
                    <button onClick={function() { sendReminder(item); }} className="bg-purple-600 text-white text-sm px-3 py-2 rounded-lg">Remind</button>
                  </div>
                ); })}
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={function() { setStep(1); setMeetingTitle(""); setTranscript(""); setActionItems([]); setAudioFile(null); }} className="flex-1 bg-slate-800 text-white font-semibold py-3 rounded-xl">New Meeting</button>
              <a href="/dashboard" className="flex-1 bg-purple-600 text-white font-semibold py-3 rounded-xl text-center">Dashboard</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
