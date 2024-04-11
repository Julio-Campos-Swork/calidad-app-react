import { generalStore } from '@/stores/GeneralStore'

const maxRetries = 5

/**
 * The function `retryConnection` retries a callback function a specified number of times with a delay
 * of 5 seconds between retries.
 * @param callback - The `callback` parameter is a function that will be executed after a certain delay
 * when the `retryConnection` function is called.
 * @param retries - The `retries` parameter in the `retryConnection` function represents the number of
 * times the connection should be retried before showing an error message.
 * @returns The function `retryConnection` returns either nothing (undefined) if the number of retries
 * is greater than or equal to `maxRetries`, or it returns the result of calling the `callback`
 * function after a 5-second delay if the number of retries is less than `maxRetries`.
 */
export const retryConnection = (callback, retries) => {
  const showNotification = generalStore((state) => state.showNotification)
  const updateGeneralLoading = generalStore(
    (state) => state.updateGeneralLoading
  )
  if (retries >= maxRetries) {
    showNotification(
      'Por favor revisa tu conexión a internet o ponte en contacto con soporte',
      'red'
    )
    return
  } else {
    updateGeneralLoading()
    setTimeout(() => {
      callback()
    }, 5000)
  }
}
