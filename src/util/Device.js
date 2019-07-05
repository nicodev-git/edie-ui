export const getAgentStatus = device => {
  if (!device) return false
  const {lastSeen, agentType, agent} = device
  if (agentType) {
    const now = new Date().getTime()
    if (agentType === 'agent') {
      if (agent && (now - agent.lastSeen) < 3 * 60 * 1000) return true
    } else if (agentType === 'collector') {
      if ((now - lastSeen) < 3 * 60 * 1000) return true
    }
  }
  return false
}