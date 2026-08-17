export async function submitForm(prompt: string): Promise<void> {
  const session = await createSession(prompt);
  navigateToSession(session.id);
}

async function createSession(prompt: string): Promise<{ id: string }> {
  await persistPrompt(prompt);
  return launchAgent(prompt);
}

async function persistPrompt(prompt: string): Promise<void> {
  await database.prompts.insert({ prompt });
}

async function launchAgent(prompt: string): Promise<{ id: string }> {
  return agentRuntime.launch({ prompt });
}

function navigateToSession(sessionId: string): void {
  router.navigate(`/sessions/${sessionId}`);
}
