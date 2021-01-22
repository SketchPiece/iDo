export const byDate = (field = 'created', method = 'DESC') => {
  if (method.toUpperCase() === 'DESC') {
    return (a, b) => {
      return new Date(b[field]) - new Date(a[field])
    }
  } else
    return (a, b) => {
      return new Date(a[field]) - new Date(b[field])
    }
}
