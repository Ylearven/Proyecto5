import './ahoracado.css'
import { crearBotones, boton } from '../Boton/boton'
import { reset } from '../Funciones/funciones'
import { portada } from '../00-Portada/portada'

const ahorcadoImg = [
  './assets/ahorcado/0.jpeg',
  './assets/ahorcado/1.jpeg',
  './assets/ahorcado/2.jpeg',
  './assets/ahorcado/3.jpeg',
  './assets/ahorcado/4.jpeg',
  './assets/ahorcado/5.jpeg',
  './assets/ahorcado/6.jpeg',
  './assets/ahorcado/7.jpeg',
  './assets/ahorcado/8.jpeg',
  './assets/ahorcado/9.jpeg',
  './assets/ahorcado/10.jpeg'
]

export const ahorcado = () => {
  const seccionAhorcado = document.createElement('section')
  seccionAhorcado.id = 'SeccionAhorcado'

  const controles = document.createElement('div')
  controles.id = 'controles'
  seccionAhorcado.appendChild(controles)

  const mainTitulo = document.createElement('h2')
  mainTitulo.textContent = 'Ahorcado'
  controles.appendChild(mainTitulo)

  const palabraContainer = document.createElement('div')
  palabraContainer.id = 'palabra'
  controles.appendChild(palabraContainer)

  const mensajeContainer = document.createElement('div')
  mensajeContainer.id = 'mensajeContainer'
  mensajeContainer.classList.add('oculto')
  controles.appendChild(mensajeContainer)

  const mensajeVP = document.createElement('h3')
  mensajeVP.id = 'mensajeVP'
  mensajeVP.classList.add('oculto')
  controles.appendChild(mensajeVP)

  const fraseTitulo = document.createElement('p')
  fraseTitulo.textContent = 'Introduce una letra'
  controles.appendChild(fraseTitulo)

  const ahorcadoImgContainer = document.createElement('div')
  ahorcadoImgContainer.id = 'ahorcadoImgContainer'

  const ahorcadoImgElement = document.createElement('img')
  ahorcadoImgElement.id = 'ahorcadoImg'
  ahorcadoImgElement.src = ahorcadoImg[0]
  ahorcadoImgContainer.appendChild(ahorcadoImgElement)
  seccionAhorcado.appendChild(ahorcadoImgContainer)

  const inputLetra = document.createElement('input')
  inputLetra.id = 'guess'
  inputLetra.type = 'text'
  inputLetra.maxLength = 1
  controles.appendChild(inputLetra)

  const botonesContainer = document.createElement('div')
  botonesContainer.id = 'botones'
  controles.appendChild(botonesContainer)

  const botonAdivinar = boton('Adivinar', 'btnAdivinar', adivina)
  botonesContainer.appendChild(botonAdivinar)

  const palabras = ['perro', 'ordenador', 'programar', 'manzana']
  let selectPalabra = ''
  let muestraPalabra = []
  let errores = []
  const maxErrores = 10

  function Juego() {
    selectPalabra = palabras[Math.floor(Math.random() * palabras.length)]
    muestraPalabra = Array(selectPalabra.length).fill('_')
    errores = []
    actualizarJuego()
    guardarJuego()
  }
  function actualizarJuego() {
    const elementoPalabra = document.getElementById('palabra')
    const entrada = document.getElementById('guess')
    const elementoMensaje = document.getElementById('mensajeContainer')
    const ahorcadoImgElement = document.getElementById('ahorcadoImg')

    if (elementoPalabra) {
      elementoPalabra.innerHTML = muestraPalabra.join(' ')
    }

    if (entrada) {
      entrada.value = ''
      entrada.focus()
    }
    if (elementoMensaje) {
      if (errores.length > 0) {
        elementoMensaje.innerHTML = `Incorrecto: ${errores.join(', ')}`
        elementoMensaje.classList.remove('oculto')
      } else {
        elementoMensaje.classList.add('oculto')
      }
    }

    if (ahorcadoImgElement && errores.length <= maxErrores) {
      ahorcadoImgElement.src = ahorcadoImg[errores.length]
    }
  }

  function adivina() {
    const guess = document.getElementById('guess').value.toLowerCase()
    if (guess.length === 1 && /[a-z]/.test(guess)) {
      if (guess && selectPalabra.includes(guess)) {
        for (let i = 0; i < selectPalabra.length; i++) {
          if (selectPalabra[i] === guess) {
            muestraPalabra[i] = guess
          }
        }
      } else {
        if (!errores.includes(guess)) {
          errores.push(guess)
          console.log('Errores:', errores)
        }
      }
    } else {
      console.log('Entrada inválida')
    }
    comprobarJuego()
    actualizarJuego()
    guardarJuego()
  }

  function comprobarJuego() {
    const elementMensaje = document.getElementById('mensajeVP')
    if (muestraPalabra.join('') === selectPalabra) {
      elementMensaje.innerHTML = 'Felicidades! Has ganado'
      elementMensaje.classList.remove('oculto')
      setTimeout(() => {
        reset(
          'Reinicar',
          'btnReiniciar',
          Juego,
          'mensajeVP',
          'mensajeContainer',
          errores
        )
      }, 2000)
    } else if (errores.length >= maxErrores) {
      elementMensaje.innerHTML = `Has perdido. La palabra era:${selectPalabra}`
      elementMensaje.classList.remove('oculto')
      setTimeout(() => {
        reset(
          'Reinicar',
          'btnReiniciar',
          Juego,
          'mensajeVP',
          'mensajeContainer',
          errores
        )
      }, 2000)
    }
  }
  function guardarJuego() {
    const juegoAhorcado = {
      selectPalabra,
      muestraPalabra,
      errores
    }
    localStorage.setItem('juegoAhorcado', JSON.stringify(juegoAhorcado))
  }
  function cargarJuego() {
    const guardaJuego = localStorage.getItem('juegoAhorcado')
    if (guardaJuego) {
      const estadoJuego = JSON.parse(guardaJuego)
      if (
        estadoJuego &&
        estadoJuego.selectPalabra &&
        estadoJuego.muestraPalabra &&
        Array.isArray(estadoJuego.errores)
      ) {
        selectPalabra = estadoJuego.selectPalabra
        muestraPalabra = estadoJuego.muestraPalabra
        errores = estadoJuego.errores
        actualizarJuego()
      } else {
        reset(
          'Reinicar',
          'btnReiniciar',
          Juego,
          'mensajeVP',
          'mensajeContainer',
          errores
        )
      }
    } else {
      reset(
        'Reinicar',
        'btnReiniciar',
        Juego,
        'mensajeVP',
        'mensajeContainer',
        errores
      )
    }
  }
  const btnReset = reset(
    'Reinicar',
    'btnReiniciar',
    Juego,
    'mensajeVP',
    'mensajeContainer',
    errores
  )
  botonesContainer.appendChild(btnReset)

  const btnInicio = crearBotones('Volver al inicio', portada, 'btnInicio')
  botonesContainer.appendChild(btnInicio)
  cargarJuego()
  return seccionAhorcado
}
