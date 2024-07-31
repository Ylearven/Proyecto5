//Boton reset
export function reset(texto, clase, funcion, id1, id2, error) {
  const boton = document.createElement('button')
  boton.textContent = texto
  boton.className = clase
  boton.addEventListener('click', () => {
    localStorage.clear()
    error.lenght = 0
    const mensaje1 = document.getElementById(id1)
    const mensaje2 = document.getElementById(id2)

    if (mensaje1) {
      mensaje1.innerHTML = ''
      mensaje1.classList.add('oculto')
    }
    if (mensaje2) {
      mensaje2.innerHTML = ''
      mensaje2.classList.add('oculto')
    }

    funcion()
  })
  return boton
}
