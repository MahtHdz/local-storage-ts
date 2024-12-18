export const northAmericaDateFormat = (date: Date) => {
  const rawDate = new Date(date)
  const day = rawDate.getDay()
  const month = rawDate.getMonth()
  const year = rawDate.getFullYear()
  return day + "/" + month + "/" + year
}

export const ISOToDMYFormat = (date: Date) => {
  function pad(n: number) {
    return (n < 10 ? "0" : "") + n
  }
  return (
    pad(date.getUTCDate()) +
    "/" +
    pad(date.getUTCMonth() + 1) +
    "/" +
    date.getUTCFullYear()
  )
}

export const addDaysToDate = (date: Date, days: number) => {
  let res = new Date(date)
  res.setDate(res.getDate() + days)
  return res
}

export const timestampCST = () => {
  const UTC = new Date()
  return Date.parse(UTC.toISOString()) - (UTC.getTimezoneOffset() * 60000)
}

export const dateTimezoneCST = () => {
  const UTC = new Date()
  const CST = Date.parse(UTC.toISOString()) - (UTC.getTimezoneOffset() * 60000)
  return new Date(CST)
}

const dateUtils = {
  timestampCST,
  addDaysToDate,
  ISOToDMYFormat,
  dateTimezoneCST,
  northAmericaDateFormat,
};

export default dateUtils
