import { generalStore } from '@/stores/generalStore'
import './Loader.css'
export const Loader = () => {
  const generalLoading = generalStore((state) => state.generalLoading)
  return (
    <>
      {generalLoading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
    </>
  )
}
