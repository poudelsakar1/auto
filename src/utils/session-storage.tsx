const CAR_RESULT = 'CAR_RESULT'

const _saveToSession = (key: string, data: string): void => {
  if (window.sessionStorage) {
    window.sessionStorage.setItem(key, data)
  }
}

const _getDataFromSession = (key: string): string | null => {
  if (window.sessionStorage) {
    return window.sessionStorage.getItem(key)
  }

  return null
}

const cacheResquest = (endpoint: string, params: any, data: any): void => {
  const key: string = `${CAR_RESULT}_${endpoint}_${JSON.stringify(params)}`
  _saveToSession(key, JSON.stringify(data))
}

const getCache = (endpoint: string, params: any): any => {
  const key: string = `${CAR_RESULT}_${endpoint}_${JSON.stringify(params)}`
  return JSON.parse(_getDataFromSession(key) as string)
}

export { cacheResquest, getCache }
