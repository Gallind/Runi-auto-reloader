// --- Configuration ---
const TARGET_URL_PATTERNS = [
  "https://yedion.runi.ac.il/*",
  "https://my.runi.ac.il/*",
  "https://moodle.runi.ac.il/*"
];
const RELOAD_INTERVAL_MINUTES = 15;
// -------------------

// Create an alarm when the extension is installed or updated.
chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create('runiReloader', {
    delayInMinutes: RELOAD_INTERVAL_MINUTES,
    periodInMinutes: RELOAD_INTERVAL_MINUTES
  });
  console.log(`RUNI Reloader alarm set for every ${RELOAD_INTERVAL_MINUTES} minutes.`);
});

// Listener for when the alarm triggers
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'runiReloader') {
    // Find all tabs that match any of the URL patterns.
    chrome.tabs.query({ url: TARGET_URL_PATTERNS }, (tabs) => {
      if (tabs.length > 0) {
        tabs.forEach((tab) => {
          chrome.tabs.reload(tab.id);
          console.log(`Reloaded tab: ${tab.url}`);
        });
      } else {
        console.log('No open RUNI tabs found to reload.');
      }
    });
  }
});