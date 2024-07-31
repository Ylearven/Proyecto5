import './raya.css'
import { crearBotones } from '../Boton/boton'
import { portada } from '../00-Portada/portada'
import { reset } from '../Funciones/funciones'

export const TresRaya = () => {
  const juegoContainer = document.createElement('div')
  juegoContainer.id = 'juegoContainer'
  const estadoContainer = document.createElement('div')
  estadoContainer.id = 'estadoContainer'
  let juegoActivo = true
  let jugadorActual = 'Jugador 1'
  let jugador1Img = './assets/3raya/cerrar.png'
  let jugador2Img = './assets/3raya/circulo-dibujado-a-mano-luna.png'
  let tabla = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]

  const mainTitulo = document.createElement('h2')
  mainTitulo.textContent = 'Tres en raya'

  function crearTabla() {
    juegoContainer.innerHTML = ''
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const casillaElemento = document.createElement('div')
        casillaElemento.classList.add('casilla')
        casillaElemento.setAttribute('data-row', i)
        casillaElemento.setAttribute('data-col', j)
        casillaElemento.addEventListener('click', () => clickCasilla(i, j))
        juegoContainer.appendChild(casillaElemento)
        if (tabla[i][j]) {
          casillaElemento.style.backgroundImage = `url(${
            jugadorActual === 'Jugador 1' ? jugador1Img : jugador2Img
          })`
        }
      }
    }
  }

  function clickCasilla(row, col) {
    if (tabla[row][col] || !juegoActivo) return
    tabla[row][col] = jugadorActual
    const casillaElemento = document.querySelector(
      `.casilla[data-row="${row}"][data-col="${col}"]`
    )
    casillaElemento.style.backgroundImage = `url(${
      jugadorActual === 'Jugador 1' ? jugador1Img : jugador2Img
    })`
    if (comprobarGanador()) {
      juegoActivo = false
      estadoContainer.textContent = `${jugadorActual} ha ganado!!`
      guardarEstado()
      return
    }
    if (tabla.flat().every((casilla) => casilla)) {
      juegoActivo = false
      estadoContainer.textContent = '¡Empate!'
      guardarEstado()

      return
    }
    jugadorActual = jugadorActual === 'Jugador 1' ? 'Jugador 2' : 'Jugador 1'
    estadoContainer.textContent = `Turno de ${jugadorActual}`
    guardarEstado()
  }
  function comprobarGanador() {
    const combinacionesGanadoras = [
      [
        [0, 0],
        [0, 1],
        [0, 2]
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2]
      ],
      [
        [2, 0],
        [2, 1],
        [2, 2]
      ],
      [
        [0, 0],
        [1, 0],
        [2, 0]
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1]
      ],
      [
        [0, 2],
        [1, 2],
        [2, 2]
      ],
      [
        [0, 0],
        [1, 1],
        [2, 2]
      ],
      [
        [0, 2],
        [1, 1],
        [2, 0]
      ]
    ]
    return combinacionesGanadoras.some((combinacion) => {
      const [a, b, c] = combinacion
      return (
        tabla[a[0]][a[1]] &&
        tabla[a[0]][a[1]] === tabla[b[0]][b[1]] &&
        tabla[a[0]][a[1]] === tabla[c[0]][c[1]]
      )
    })
  }
  function inicio() {
    juegoActivo = true

    tabla = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]
    jugadorActual = 'Jugador 1'
    estadoContainer.textContent = `Turno de ${jugadorActual}`
    crearTabla()
    guardarEstado()
  }
  function guardarEstado() {
    localStorage.setItem(
      'estadoJuego',
      JSON.stringify({ tabla, jugadorActual, juegoActivo })
    )
  }
  const btnReset = reset('Reiniciar', 'btnReinicio', inicio, '', '', tabla)

  const estadoGuardado = localStorage.getItem('estadoJuego')
  if (estadoGuardado) {
    try {
      const guardarEstadoJuego = JSON.parse(estadoGuardado)
      if (guardarEstadoJuego && guardarEstadoJuego.tabla) {
        tabla = guardarEstadoJuego.tabla
        jugadorActual = guardarEstadoJuego.jugadorActual
        juegoActivo = guardarEstadoJuego.juegoActivo

        crearTabla()
        tabla.forEach((fila, i) => {
          fila.forEach((casilla, j) => {
            if (casilla) {
              const casillaElemento = juegoContainer.querySelector(
                `.casilla[data-row="${i}"][data-col="${j}"]`
              )
              casillaElemento.style.backgroundImage = `url(${
                casilla === 'Jugador 1' ? jugador1Img : jugador2Img
              })`
            }
          })
        })
        estadoContainer.textContent = juegoActivo
          ? `Turno de ${jugadorActual}`
          : `${jugadorActual} !Ha ganado!`
      }
    } catch (e) {
      console.error('Error parsing JSON:', e)
    }
  }
  const seccionTresRaya = document.createElement('section')
  seccionTresRaya.id = 'seccionTresRaya'
  seccionTresRaya.appendChild(mainTitulo)
  seccionTresRaya.appendChild(juegoContainer)
  seccionTresRaya.appendChild(estadoContainer)
  seccionTresRaya.appendChild(btnReset)

  const btnInicio = crearBotones('Volver a Inicio', portada, 'btnInicio')
  seccionTresRaya.appendChild(btnInicio)

  inicio()
  return seccionTresRaya
}
