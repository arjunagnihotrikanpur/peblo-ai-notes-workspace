import api from '../api/axios'

export const getNotes = async (params = {}) => {
  const { data } = await api.get('/notes', { params })
  return data
}

export const getNote = async (id) => {
  const { data } = await api.get(`/notes/${id}`)
  return data
}

export const createNote = async (payload) => {
  const { data } = await api.post('/notes', payload)
  return data
}

export const updateNote = async (id, payload) => {
  const { data } = await api.patch(`/notes/${id}`, payload)
  return data
}

export const archiveNote = async (id) => {
  const { data } = await api.delete(`/notes/${id}`)
  return data
}

export const generateAI = async (id) => {
  const { data } = await api.post(`/notes/${id}/ai`)
  return data
}

export const generateShareLink = async (id) => {
  const { data } = await api.post(`/notes/${id}/share`)
  return data
}

export const getSharedNote = async (shareId) => {
  const { data } = await api.get(`/notes/shared/${shareId}`)
  return data
}
