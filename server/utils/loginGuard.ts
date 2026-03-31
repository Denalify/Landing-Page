const MAX_ATTEMPTS = 3

let failedAttempts = 0
let locked = false

export const loginGuard = {
  get isLocked() {
    return locked
  },

  get attemptsLeft() {
    return Math.max(0, MAX_ATTEMPTS - failedAttempts)
  },

  recordFailure() {
    failedAttempts++
    if (failedAttempts >= MAX_ATTEMPTS) {
      locked = true
    }
  },

  recordSuccess() {
    failedAttempts = 0
    // Intentionally NOT resetting `locked` — once locked, restart is required
  },

  assertNotLocked() {
    if (locked) {
      throw createError({
        statusCode: 423,
        statusMessage: 'Panel locked. Restart the server to regain access.',
      })
    }
  },
}
