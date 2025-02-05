document.addEventListener('DOMContentLoaded', () => {
  const navbarBurgers = document.querySelectorAll('.navbar-burger')
  navbarBurgers.forEach(nb => {
    nb.addEventListener('click', () => {
      const target = document.getElementById(nb.dataset.target)
      nb.classList.toggle('is-active')
      target.classList.toggle('is-active')
    })
  })

  const dropdowns = document.querySelectorAll('.has-dropdown')
  dropdowns.forEach(d => {
    const children = Array.from(d.children).filter(c => c.classList.contains('navbar-dropdown'))
    const hideChildren = () => children.forEach(c => c.classList.add('is-hidden'))

    d.addEventListener('click', () => {
      children.forEach(c => c.classList.toggle('is-hidden'))
    })
    d.addEventListener('mouseover', () => {
      children.forEach(c => c.classList.remove('is-hidden'))
    })
    d.addEventListener('mouseout', () => {
      hideChildren()
    })
    hideChildren()
  })

  const tabs = document.querySelectorAll('.tabs a')
  tabs.forEach(t => {
    t.addEventListener('click', () => {
      const tabList = Array.from(t.parentNode.parentNode.children)
      tabList.forEach(tl => {
        tl.classList.remove('is-active')
      })
      t.parentNode.classList.add('is-active')

      const tabContents = document.querySelectorAll('.tab-contents[data-group="' + t.dataset.group + '"]>*')
      tabContents.forEach(tc => {
        tc.classList.add('is-hidden')
      })
      const target = document.getElementById(t.dataset.target)
      target.classList.remove('is-hidden')
    })
    if (t.parentNode.classList.contains('is-active')) {
      t.click()
    }
  })
})
