export class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code: string,
    public details?: unknown
  ) {
    super(message)
    this.name = 'APIError'
  }
}

export function handleAPIError(error: unknown): APIError {
  if (error instanceof APIError) {
    return error
  }

  if (error instanceof Response) {
    return new APIError(
      'API request failed',
      error.status,
      'API_ERROR'
    )
  }

  if (error instanceof Error) {
    return new APIError(
      error.message,
      500,
      'INTERNAL_ERROR'
    )
  }

  return new APIError(
    'An unexpected error occurred',
    500,
    'UNKNOWN_ERROR'
  )
}

export async function fetchAPI<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new APIError(
        error.message || 'API request failed',
        response.status,
        error.code || 'API_ERROR',
        error.details
      )
    }

    return response.json()
  } catch (error) {
    throw handleAPIError(error)
  }
}

export function isAPIError(error: unknown): error is APIError {
  return error instanceof APIError
} 