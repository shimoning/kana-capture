document.addEventListener('DOMContentLoaded', () => {
  const navbarBurgers = document.querySelectorAll('.navbar-burger')
  // Add a click event on each of them
  navbarBurgers.forEach(nb => {
    nb.addEventListener('click', () => {
      const target = document.getElementById(nb.dataset.target)
      nb.classList.toggle('is-active')
      target.classList.toggle('is-active')
    })
  })
})
