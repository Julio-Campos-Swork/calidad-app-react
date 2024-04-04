import { useEffect, useState } from 'react'

export const Footer = () => {
  const [date, setDate] = useState('')

  useEffect(() => {
    const intervalId = setInterval(() => {
      const addZero = (i) => {
        if (i < 10) {
          i = '0' + i
        }
        return i
      }

      const currentDate = new Date()

      setDate(
        `${addZero(currentDate.getHours())}:${addZero(
          currentDate.getMinutes()
        )}:${addZero(currentDate.getSeconds())} - ${addZero(
          currentDate.getDate()
        )}/${addZero(currentDate.getMonth() + 1)}/${currentDate.getFullYear()}`
      )
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="bg-blue-600">
      <footer className="text-center py-2 text-light-blue-200">
        <p className="pt-2 pb-2">{date}</p>
      </footer>
    </div>
  )
}
