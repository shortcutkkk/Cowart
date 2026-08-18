// Analytics is intentionally disabled in this fork. Keep this module's public
// API so the canvas can run without loading external tracking resources.

function disabled() {
  return false
}

export function createCowartAnalytics() {
  return {
    measurementId: null,
    trackCanvasOpened: disabled,
    trackAnnotationCreated: disabled,
    trackAiGenerationRequested: disabled,
    trackWidgetPromptSent: disabled
  }
}

export const trackCanvasOpened = disabled
export const trackAnnotationCreated = disabled
export const trackAiGenerationRequested = disabled
export const trackWidgetPromptSent = disabled

export async function sendTrackedWidgetMessage(sendMessage, message) {
  return await sendMessage(message)
}
