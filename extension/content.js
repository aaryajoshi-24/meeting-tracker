// Content script runs on Google Meet pages
// It can detect meeting title and participants

function getMeetingTitle() {
  // Try to get meeting title from page
  const titleElement = document.querySelector('[data-meeting-title]') || 
                       document.querySelector('.u6vdEc') ||
                       document.querySelector('[jsname="r4nke"]');
  
  if (titleElement) {
    return titleElement.textContent.trim();
  }
  
  // Fallback to URL code
  const meetCode = window.location.pathname.split('/').pop();
  return `Google Meet - ${meetCode}`;
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getMeetingInfo") {
    sendResponse({
      title: getMeetingTitle(),
      url: window.location.href,
      meetCode: window.location.pathname.split('/').pop()
    });
  }
});

console.log("MeetTrack extension loaded on Google Meet!");