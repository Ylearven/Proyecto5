import './memory.css'
import { crearBotones } from '../Boton/boton'
import { portada } from '../00-Portada/portada'

const imagenes = [
  './assets/memory/españa.png',
  './assets/memory/argentina.png',
  './assets/memory/korea.png',
  './assets/memory/surafrica.png'
]
export const MemoryGame = () => {
  const seccionMemory = document.createElement('section')
  seccionMemory.id = 'SeccionMemory'

  const mainTitulo = document.createElement('h2')
  mainTitulo.textContent = 'Memory Game'
  seccionMemory.appendChild(mainTitulo)
  const mensaje = document.createElement('h3')
  mensaje.id = 'mensajeVictoria'
  seccionMemory.appendChild(mensaje)

  const cartas = [...imagenes, ...imagenes]

  function Aleatorio(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
  }
  let estadoJuego = {
    tabla: [],
    cartaSeleccionada: [],
    parejasEncontradas: 0
  }

  function inicio() {
    Aleatorio(cartas)
    estadoJuego.tabla = cartas.map((imagen, index) => ({
      id: index,
      imagen,
      encontrada: false,
      vuelta: false
    }))
    localStorage.setItem('memoryGame', JSON.stringify(estadoJuego))
    actualizarTabla()
  }
  function actualizarTabla() {
    const tablaContenedor = document.createElement('div')
    tablaContenedor.className = 'tablaContainer'
    estadoJuego.tabla.forEach((carta) => {
      const elementoCarta = document.createElement('div')
      elementoCarta.className = 'Carta'
      const elementoImagen = document.createElement('img')

      if (carta.vuelta || carta.encontrada) {
        elementoImagen.src = carta.imagen
      } else {
        elementoImagen.src = './assets/memory/negro.png'
      }
      elementoCarta.appendChild(elementoImagen)
      elementoCarta.addEventListener('click', () => voltearCarta(carta))
      tablaContenedor.appendChild(elementoCarta)
    })
    seccionMemory.innerHTML = ''
    seccionMemory.appendChild(mainTitulo)
    seccionMemory.appendChild(mensaje)
    seccionMemory.appendChild(tablaContenedor)
    seccionMemory.appendChild(btnInicio)
  }
  function voltearCarta(carta) {
    if (estadoJuego.cartaSeleccionada.length < 2 && !carta.vuelta) {
      carta.vuelta = true
      estadoJuego.cartaSeleccionada.push(carta)
      actualizarTabla()
      if (estadoJuego.cartaSeleccionada.length === 2) {
        setTimeout(comprobarPareja, 1000)
      }
    }
  }
  function comprobarPareja() {
    const [carta1, carta2] = estadoJuego.cartaSeleccionada
    if (carta1.imagen === carta2.imagen) {
      carta1.encontrada = true
      carta2.encontrada = true
      estadoJuego.parejasEncontradas++
      comprobarGanador()
    } else {
      carta1.vuelta = false
      carta2.vuelta = false
    }
    estadoJuego.cartaSeleccionada = []
    localStorage.setItem('memoryGame', JSON.stringify(estadoJuego))
    actualizarTabla()
  }

  function comprobarGanador() {
    if (estadoJuego.parejasEncontradas == imagenes.length) {
      mensaje.textContent = '!Felicidades! Has encontrado todas las parejas'
      setTimeout(() => {
        reset()
      }, 5000)
    }
  }
  function reset() {
    localStorage.removeItem('memoryGame')
    estadoJuego = {
      tabla: [],
      cartaSeleccionada: [],
      parejasEncontradas: 0
    }
    mensaje.textContent = ''
    inicio()
  }

  const btnInicio = crearBotones('Volver a Inicio', portada, 'btnInicio')
  seccionMemory.appendChild(btnInicio)
  inicio()
  return seccionMemory
}
