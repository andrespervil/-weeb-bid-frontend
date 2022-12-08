import { toast } from 'react-toastify'

export const notify = (message) => {
  toast(message, {
    type: 'info',
  })
}

export const notifyError = (message) => {
  toast(message, {
    type: 'error',
  })
}

export const notifySuccess = (message) => {
  toast(message, {
    type: 'success',
  })
}
