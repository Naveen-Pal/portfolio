---
layout: ../../layouts/post.astro
title: 'App Script to Auto Shedule meets based on mails'
description: 'I used Google App Script to Auto check my mail and shedule meet on calender if any'
pubDate: 2023-05-12
image: 
    url: '/project/calender_app_script.png'
    alt: 'calender'
links: [
    {
      "url": "https://students.iitgn.ac.in/eii",
      "text": "Visit EII Website",
      "class": "btn-primary"
    },
    {
      "url": "https://github.com/EII-IITGN",
      "text": "EII GitHub Organization",
      "class": "btn-secondary"
    },
    {
      "url": "https://students.iitgn.ac.in/esummit",
      "text": "E-Summit Website",
      "class": "btn-info"
    }
  ]
tags: ['Automation', 'Google App Script']
---

## App Script
Put this script in your Google App Scirpt. Dont't forget to change grok API Key.
Finally add a trigger to run it every hour.

```js
function getNewEmails() {
  // Search for unread emails from the last hour
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  const searchQuery = `is:unread in:inbox after:${Math.floor(oneHourAgo.getTime() / 1000)}`;
  
  const threads = GmailApp.search(searchQuery);
  const messages = [];

  for (const thread of threads) {
    const msgs = thread.getMessages();
    for (const msg of msgs) {
      if (msg.isUnread() && msg.getDate() >= oneHourAgo) {
        messages.push({
          subject: msg.getSubject(),
          body: msg.getPlainBody(),
          sender: msg.getFrom(),
          date: msg.getDate(),
          recipients: msg.getTo(),
          cc: msg.getCc(),
          messageId: msg.getId(),
          messageObject: msg
        });
        msg.markRead(); // Temporarily mark as read for processing
      }
    }
  }
  return messages;
}

function isSchedulableWithGroq(messageData) {
  const apiKey = 'gsk_YOUR_API_KEY';
  
  const prompt = `Analyze this email to determine if it contains schedulable events (meetings, appointments, classes, deadlines, etc.).

EMAIL DETAILS:
Subject: ${messageData.subject}
From: ${messageData.sender}
To: ${messageData.recipients}
CC: ${messageData.cc || 'None'}
Received Date: ${messageData.date.toDateString()}
Received Time: ${messageData.date.toTimeString()}

EMAIL BODY:
${messageData.body}

INSTRUCTIONS:
- If this email does NOT contain any schedulable events, respond with ONLY: {}
- If it DOES contain schedulable events, extract ALL events and respond with ONLY valid JSON
- Do NOT include any explanatory text, notes, or comments - ONLY JSON
- For each event, include: title, date (YYYY-MM-DD format), time (HH:MM format), and duration in minutes if specified
- If multiple events exist, return an array
- Use the email's received date as context for relative dates like "tomorrow", "next week", etc.

Response format for single event: {"title": "...", "date": "YYYY-MM-DD", "time": "HH:MM", "duration": 60}
Response format for multiple events: [{"title": "...", "date": "YYYY-MM-DD", "time": "HH:MM", "duration": 60}, {...}]

IMPORTANT: Respond with ONLY the JSON - no additional text or explanations.`;

  const payload = {
    model: "llama3-8b-8192",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.1,
    max_tokens: 1000
  };

  try {
    const response = UrlFetchApp.fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + apiKey,
        "Content-Type": "application/json"
      },
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    });

    const result = JSON.parse(response.getContentText());
    
    if (result.error) {
      Logger.log("Groq API Error: " + JSON.stringify(result.error));
      return null;
    }

    const responseText = result.choices[0].message.content.trim();
    Logger.log("Groq response: " + responseText);
    
    // Extract JSON from response (handle cases where Groq adds explanatory text)
    let jsonText = responseText;
    
    // Look for JSON array or object in the response
    const arrayMatch = responseText.match(/\[[\s\S]*\]/);
    const objectMatch = responseText.match(/\{[\s\S]*\}/);
    
    if (arrayMatch) {
      jsonText = arrayMatch[0];
    } else if (objectMatch) {
      jsonText = objectMatch[0];
    }
    
    // Handle empty response
    if (jsonText === '{}') {
      return null;
    }
    
    return JSON.parse(jsonText);
  } catch (e) {
    Logger.log("Error processing Groq response: " + e.toString());
    return null;
  }
}

function addEventToCalendar(eventData, sourceEmail) {
  try {
    const startDateTime = new Date(`${eventData.date} ${eventData.time}`);
    
    // Use specified duration or default to 1 hour
    const durationMs = (eventData.duration || 60) * 60 * 1000;
    const endDateTime = new Date(startDateTime.getTime() + durationMs);
    
    // Create event description with email context
    const description = `Scheduled from email:
From: ${sourceEmail.sender}
Subject: ${sourceEmail.subject}
Received: ${sourceEmail.date}

Original email ID: ${sourceEmail.messageId}`;

    const event = CalendarApp.getDefaultCalendar().createEvent(
      eventData.title,
      startDateTime,
      endDateTime,
      {
        description: description,
      }
    );
    
    Logger.log(`Successfully created event: ${eventData.title} on ${eventData.date} at ${eventData.time}`);
    return event;
  } catch (e) {
    Logger.log(`Error creating calendar event: ${e.toString()}`);
    return null;
  }
}

function processAndScheduleEmails() {
  const messages = getNewEmails();
  let totalProcessed = 0;
  let totalScheduled = 0;
  let totalMarkedUnread = 0;

  Logger.log(`Processing ${messages.length} unread emails from the last hour...`);

  for (const message of messages) {
    totalProcessed++;
    Logger.log(`Processing email ${totalProcessed}: "${message.subject}" from ${message.sender}`);
    
    const result = isSchedulableWithGroq(message);
    
    if (result) {
      // Handle both single event and multiple events
      const events = Array.isArray(result) ? result : [result];
      let eventScheduled = false;
      
      for (const eventData of events) {
        if (eventData.title && eventData.date && eventData.time) {
          const createdEvent = addEventToCalendar(eventData, message);
          if (createdEvent) {
            totalScheduled++;
            eventScheduled = true;
            Logger.log(`✓ Scheduled: "${eventData.title}" on ${eventData.date} at ${eventData.time}`);
          }
        } else {
          Logger.log(`⚠ Incomplete event data: ${JSON.stringify(eventData)}`);
        }
      }
      
      // If no events were actually scheduled, mark email as unread again
      if (!eventScheduled) {
        message.messageObject.markUnread();
        totalMarkedUnread++;
        Logger.log(`↩ Marked as unread (scheduling failed): "${message.subject}"`);
      }
    } else {
      // No schedulable events found - mark email as unread again
      message.messageObject.markUnread();
      totalMarkedUnread++;
      Logger.log(`↩ Marked as unread (not schedulable): "${message.subject}"`);
    }
  }
  
  Logger.log(`\n=== SUMMARY ===`);
  Logger.log(`Emails processed: ${totalProcessed}`);
  Logger.log(`Events scheduled: ${totalScheduled}`);
  Logger.log(`Emails marked unread again: ${totalMarkedUnread}`);
}

// Optional: Function to test with a specific email
function testSchedulingWithEmailId(emailId) {
  const message = GmailApp.getMessageById(emailId);
  const messageData = {
    subject: message.getSubject(),
    body: message.getPlainBody(),
    sender: message.getFrom(),
    date: message.getDate(),
    recipients: message.getTo(),
    cc: message.getCc(),
    messageId: message.getId()
  };
  
  Logger.log("Testing email: " + messageData.subject);
  const result = isSchedulableWithGroq(messageData);
  Logger.log("Result: " + JSON.stringify(result, null, 2));
}
```