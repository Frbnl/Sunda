document.addEventListener('DOMContentLoaded', () => {
  let darkmode = localStorage.getItem('darkmode')
  const themeSwitch = document.querySelector('#theme-switch, .theme-switch')

  const enableDarkmode = () => {
    document.body.classList.add('darkmode')
    localStorage.setItem('darkmode', 'active')
  }

  const disableDarkmode = () => {
    document.body.classList.remove('darkmode')
    localStorage.removeItem('darkmode')
  }

  if (darkmode === 'active') enableDarkmode()

  if (!themeSwitch) return
  themeSwitch.addEventListener('click', () => {
    darkmode = localStorage.getItem('darkmode')
    darkmode !== 'active' ? enableDarkmode() : disableDarkmode()
  })
})
