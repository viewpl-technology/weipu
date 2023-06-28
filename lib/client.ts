type ClientConfig = {
  body?: any
  token?: string
  headers?: HeadersInit | undefined
}

export function client(
  url: string,
  { body, token, ...customConfig }: ClientConfig = {}
) {
  const headers: HeadersInit = {
    'content-type': 'application/json',
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  const config = {
    method: body ? 'POST' : 'GET',
    body,
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  }
  if (body) {
    config.body = JSON.stringify(body)
  }
  return window.fetch(url, config).then(async (response) => {
    if (response.ok) {
      return await response.json()
    } else {
      const errorMessage = await response.text()
      return Promise.reject(new Error(errorMessage))
    }
  })
}
