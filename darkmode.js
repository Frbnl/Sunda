document.addEventListener('DOMContentLoaded', () => {
  const themeSwitch = document.querySelector('#theme-switch, .theme-switch')

  const enableDarkmode = () => {
    document.body.classList.add('darkmode')
    localStorage.setItem('darkmode', 'active')
  }

  const disableDarkmode = () => {
    document.body.classList.remove('darkmode')
    localStorage.removeItem('darkmode')
  }

  const applyBackgroundState = () => {
    const bgReact = document.getElementById('root')
    const bgRainbow = document.querySelector('.bg-container')

    // Keep legacy background behavior: do not use the React background layer.
    if (bgReact) {
      bgReact.style.opacity = '0'
      bgReact.style.display = 'none'
    }
    // Preserve the site's original background layer in both themes.
    if (bgRainbow) bgRainbow.style.display = 'block'
  }

  const stored = localStorage.getItem('darkmode')
  if (stored === 'active') enableDarkmode()

  window.toggleTheme = () => {
    const active = localStorage.getItem('darkmode') === 'active'
    active ? disableDarkmode() : enableDarkmode()
    applyBackgroundState()
  }

  if (themeSwitch) {
    // Some pages still use inline onclick="toggleTheme()".
    // Avoid double toggling by only binding here when no inline handler exists.
    if (!themeSwitch.hasAttribute('onclick')) {
      themeSwitch.addEventListener('click', (event) => {
        if (event) event.preventDefault()
        window.toggleTheme()
      })
    }
  }

  applyBackgroundState()
})
