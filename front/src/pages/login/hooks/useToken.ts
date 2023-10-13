
export function useToken() {
  const getToken = () => {
    return localStorage.getItem('token')
  }

  const changeToken = (newToke: string) => {
    localStorage.setItem('token', newToke)
  }

  return {
    getToken,
    changeToken
  }
}