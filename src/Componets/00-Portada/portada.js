import './portada.css'
import { crearBotones } from '../Boton/boton'
import { TresRaya } from '../01-TresRaya/tresRaya'
import { MemoryGame } from '../02-MemoryGame/memoryGame'
import { ahorcado } from '../03-Ahorcado/ahoracado'

export const portada = () => {
  const mainTitulo = document.createElement('h1')
  mainTitulo.textContent = 'Selecciona un juego'
  const divOptions = document.createElement('div')
  divOptions.id = 'botones'
  const btnTresRaya = crearBotones('Tres en raya', TresRaya, 'btnTresRaya')
  const btnMemory = crearBotones('Memory Game', MemoryGame, 'btnMemoryGame')
  const btnAhorcado = crearBotones('Ahorcado', ahorcado, 'btnAhorcado')
  divOptions.appendChild(btnTresRaya)
  divOptions.appendChild(btnMemory)
  divOptions.appendChild(btnAhorcado)

  const mainDiv = document.createElement('div')
  mainDiv.classList.add('portada')
  mainDiv.id = 'Inicio'
  mainDiv.appendChild(mainTitulo)
  mainDiv.appendChild(divOptions)

  return mainDiv
}
