import { authAPI } from './api'

export const useAuth = () => {
  const user = authAPI.getCurrentUser()
  const isAuthenticated = authAPI.isAuthenticated()

  return {
    user,
    isAuthenticated,
    login: authAPI.login,
    register: authAPI.register,
    logout: authAPI.logout,
  }
}