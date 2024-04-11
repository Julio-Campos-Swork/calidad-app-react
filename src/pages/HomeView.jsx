import { generalStore } from '@/stores/generalStore'
export const HomeView = () => {
  const showNotification = generalStore((state) => state.showNotification)
  return (
    <>
      <h1>Este es un h1</h1>
      <h1>Este es un h2</h1>
      <button
        onClick={() =>
          showNotification(
            'Mensaje de prueba pero es demasiado largo para que quepa en el contenedor voy a ver como se ve, aunque no sabemos que ancho sera el mejor',
            'red'
          )
        }
      >
        Abrir notificacion
      </button>
    </>
  )
}
