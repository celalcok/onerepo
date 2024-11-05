import { tzOffset } from '@date-fns/tz'

export const DEFAULT_TIMEZONE = 'Europe/Amsterdam'

const getTimezoneOffset = (
  timezone1: string,
  timezone2: string,
  date: Date | string | number = new Date(),
): number => {
  const offset1 = tzOffset(timezone1, new Date(date))
  const offset2 = tzOffset(timezone2, new Date(date))

  return offset2 - offset1
}

export const getTimeOffsetWithUTC = (
  date?: Date | string | number,
  timezone = DEFAULT_TIMEZONE,
) => getTimezoneOffset('UTC', timezone, date)

export const getLocalTimeOffset = (
  date?: Date | string | number,
  timeZone = DEFAULT_TIMEZONE,
) => {
  try {
    // Intl mat not be supported in some older browsers
    return getTimezoneOffset(
      Intl.DateTimeFormat().resolvedOptions().timeZone,
      timeZone,
      date,
    )
  } catch (error) {
    console.error(error)

    return getTimeOffsetWithUTC(date, timeZone)
  }
}
