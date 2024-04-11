import './Notification.css'
import { generalStore } from '@/stores/generalStore'
export const Notifications = () => {
  const notificationIsOpen = generalStore((state) => state.notificationIsOpen)
  const notificationMessage = generalStore((state) => state.notificationMessage)
  const notificationColor = generalStore((state) => state.notificationColor)
  const notificationIcon = generalStore((state) => state.notificationIcon)
  const hideNotification = generalStore((state) => state.hideNotification)

  const backgroundColorStyle = {
    backgroundColor: notificationColor ? notificationColor : 'green',
  }
  function handleClose() {
    const notification = document.querySelector('.notification-container')
    notification.classList.add('hide')
    setTimeout(() => {
      notification.classList.remove('hide')
      hideNotification()
    }, 1000)
  }
  setTimeout(() => {
    if (notificationIsOpen) handleClose()
  }, 5000)
  return (
    <>
      {notificationIsOpen && (
        <div className="notification-container">
          <div
            className="notification-content"
            style={backgroundColorStyle}
            role="alert"
          >
            <p className="notification-text">{notificationMessage}</p>
            <button
              onClick={() => handleClose()}
              type="button"
              className="button-close"
              aria-label="Close"
            >
              <svg
                className="svg-close"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
