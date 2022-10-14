import { defineStore } from 'pinia'
import { getTimezoneOffset } from 'date-fns-tz'

const systemTimezoneHourOffset = Math.floor(
  getTimezoneOffset(Intl.DateTimeFormat().resolvedOptions().timeZone)
    / (60 * 60 * 1000),
)

const systemTimezone = `${
  systemTimezoneHourOffset >= 0
    ? `+${systemTimezoneHourOffset.toString().padStart(2, '0')}`
    : `-${Math.abs(systemTimezoneHourOffset).toString().padStart(2, '0')}`
}:00`

export const useTimezoneStore = defineStore('timezone', {
  state: (): {
    timezone: string
  } => {
    const storedTimezone = localStorage.getItem('timezone')

    return {
      timezone: storedTimezone ?? systemTimezone,
    }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    setTimezone(timezone: string) {
      console.log('setTimezone', systemTimezone)
      this.timezone = timezone
      localStorage.setItem('timezone', timezone)
    },
    resetTimezone() {
      this.timezone = systemTimezone
      localStorage.removeItem('timezone')
    },
  },
})
