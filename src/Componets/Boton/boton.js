import './boton.css'

export function boton(texto, clase, funcion) {
  const boton = document.createElement('button')
  boton.textContent = texto
  boton.className = clase
  boton.addEventListener('click', (e) => {
    e.preventDefault()
    funcion()
  })
  return boton
}
export function crearBotones(texto, destino, clase) {
  const boton = document.createElement('button')
  boton.id = 'boton'
  boton.textContent = texto
  boton.className = clase
  boton.addEventListener('click', (e) => {
    e.preventDefault()
    const container = document.getElementById('ContainerJuegos')
    if (container) {
      container.innerHTML = ''
      container.appendChild(destino())
    }
  })
  return boton
}
