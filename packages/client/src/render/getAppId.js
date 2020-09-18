export const parseAppIdFromCookie = docCookie => {
  const cookie = docCookie
    .split(";")
    .find(c => c.trim().startsWith("budibase:appId"))

  return cookie.substring(lengthOfKey)
}

const lengthOfKey = "budibase:appId=".length
