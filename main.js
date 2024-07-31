import './style.css'
import { portada } from './src/Componets/00-Portada/portada'
document.addEventListener('DOMContentLoaded', () => {
  const mainContainer = document.getElementById('ContainerJuegos')
  mainContainer.appendChild(portada())
})
