/** True while a value still looks like "[YOUR …]" or is empty. */
export const isPlaceholder = (value?: string): boolean => !value || /\[[^\]]+\]/.test(value)

/** Returns the URL only if it is a real, valid http(s) address. */
export const validUrl = (value?: string): string | undefined => {
  if (isPlaceholder(value)) return undefined
  try {
    const u = new URL(value as string)
    return u.protocol === 'http:' || u.protocol === 'https:' ? u.href : undefined
  } catch {
    return undefined
  }
}

export const validEmail = (value?: string): string | undefined =>
  !isPlaceholder(value) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value as string) ? value : undefined

/** Returns digits (with optional leading +) for a tel: link, or undefined while it is a placeholder. */
export const validPhone = (value?: string): string | undefined =>
  !isPlaceholder(value) && /^\+?[0-9\s\-()]{6,}$/.test(value as string) ? (value as string).replace(/[^\d+]/g, '') : undefined
