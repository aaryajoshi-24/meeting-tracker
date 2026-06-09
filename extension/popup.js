const API_BASE = "https://meettrack-api.onrender.com";
let currentMeetingId = null;
let currentMeetingTitle = null;

// Check if we're on a Google Meet page
async function checkMeetStatus() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const statusDot = document.getElementById("statusDot");
  const statusText = document.getElementById("statusText");
  const meetingTitle = document.getElementById("meetingTitle");
  const trackBtn = document.getElementById("trackBtn");

  if (tab.url && tab.url.includes("meet.google.com")) {
    statusDot.classList.remove("inactive");
    statusText.textContent = "Google Meet detected!";
    
    // Extract meeting code from URL
    const meetCode = tab.url.split("/").pop().split("?")[0];
    currentMeetingTitle = `Google Meet - ${meetCode}`;
    meetingTitle.textContent = currentMeetingTitle;
    trackBtn.disabled = false;
  } else {
    statusDot.classList.add("inactive");
    statusText.textContent = "Not on Google Meet";
    meetingTitle.textContent = "Open a Google Meet to start tracking";
  }
}

// Create a meeting in our backend
async function createMeeting() {
  const response = await fetch(`${API_BASE}/meetings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: currentMeetingTitle,
      description: "Tracked via MeetTrack Chrome Extension",
      meeting_date: new Date().toISOString()
    })
  });
  const data = await response.json();
  return data.id;
}

// Extract action items from transcript
async function extractActionItems(transcript, meetingId) {
  const response = await fetch(`${API_BASE}/extract`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      transcript: transcript,
      meeting_id: meetingId
    })
  });
  return await response.json();
}

// Send Slack notification
async function sendSlackNotification(item, meetingTitle) {
  await fetch(`${API_BASE}/notify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      task: item.task,
      assigned_to: item.assigned_to,
      deadline: item.deadline,
      meeting_title: meetingTitle
    })
  });
}

// Track button click
document.getElementById("trackBtn").addEventListener("click", async () => {
  const loader = document.getElementById("loader");
  const extractBtn = document.getElementById("extractBtn");
  
  loader.style.display = "block";
  
  try {
    currentMeetingId = await createMeeting();
    
    // Store meeting ID
    chrome.storage.local.set({ 
      meetingId: currentMeetingId,
      meetingTitle: currentMeetingTitle 
    });
    
    extractBtn.disabled = false;
    loader.style.display = "none";
    
    document.getElementById("statusText").textContent = "Meeting tracked! ✅";
    document.getElementById("resultBox").style.display = "block";
    document.getElementById("resultBox").innerHTML = 
      `<div style="color:#22c55e">✅ Meeting created successfully!<br>ID: ${currentMeetingId}</div>`;
      
  } catch (err) {
    loader.style.display = "none";
    alert("Error connecting to MeetTrack backend!");
  }
});

// Extract button click
document.getElementById("extractBtn").addEventListener("click", async () => {
  const loader = document.getElementById("loader");
  const resultBox = document.getElementById("resultBox");
  
  // Sample transcript for demo
  const sampleTranscript = `
    Hi team, let's wrap up. John will finish the login page by Monday.
    Sarah needs to review the database schema by Wednesday.
    Mike will deploy the app to production by Friday.
    Everyone should review the PRD document by end of week.
  `;
  
  loader.style.display = "block";
  resultBox.style.display = "none";
  
  try {
    const stored = await chrome.storage.local.get(["meetingId", "meetingTitle"]);
    const meetId = stored.meetingId || currentMeetingId;
    const meetTitle = stored.meetingTitle || currentMeetingTitle;
    
    const result = await extractActionItems(sampleTranscript, meetId);
    
    loader.style.display = "none";
    resultBox.style.display = "block";
    
    let html = `<div style="color:#a78bfa; margin-bottom:8px">
      Found ${result.count} action items:</div>`;
    
    for (const item of result.action_items) {
      html += `<div class="action-item">
        <div class="task">📋 ${item.task}</div>
        <div class="meta">👤 ${item.assigned_to} · ⏰ ${item.deadline || "No deadline"} · 🔴 ${item.priority}</div>
      </div>`;
      
      // Send Slack notification for each item
      await sendSlackNotification(item, meetTitle);
    }
    
    html += `<div style="color:#22c55e; margin-top:8px">
      ✅ Slack notifications sent!</div>`;
    
    resultBox.innerHTML = html;
    
  } catch (err) {
    loader.style.display = "none";
    resultBox.style.display = "block";
    resultBox.innerHTML = `<div style="color:#ef4444">Error: ${err.message}</div>`;
  }
});

// Initialize
checkMeetStatus();