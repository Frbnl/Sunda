/**
 * themeManager.js
 * Handles:
 *  - Multi-style switching (default, neon, sunda)
 *  - Dark / light toggle (only for "default" style)
 *  - Persists choices to localStorage
 *  - Injects the style-picker UI into the navbar
 */

;(function () {
  /* ─── CONFIG ──────────────────────────────────────────────── */
  const STYLES = [
    {
      id: 'default',
      label: 'Default',
      file: 'style2.css',          // your existing redesigned CSS
      swatch: ['#f8f5f0', '#8b3a2a'],
      supportsDark: true,
    },
    {
      id: 'neon',
      label: 'Neon',
      file: 'theme-neon.css',
      swatch: ['#05050f', '#00ffe0'],
      supportsDark: false,        // neon is always dark
    },
    {
      id: 'sunda',
      label: 'Sunda',
      file: 'theme-sunda.css',
      swatch: ['#2a1a06', '#d4943a'],
      supportsDark: false,        // sunda has its own dark variant baked in
    },
  ]

  const LS_STYLE   = 'sman3-style'
  const LS_DARK    = 'darkmode'
  const LINK_ID    = 'theme-stylesheet'

  /* ─── STATE ───────────────────────────────────────────────── */
  let currentStyle = localStorage.getItem(LS_STYLE) || 'default'
  let darkActive   = localStorage.getItem(LS_DARK)  === 'active'

  /* ─── HELPERS ─────────────────────────────────────────────── */
  function getStyleDef(id) {
    return STYLES.find(s => s.id === id) || STYLES[0]
  }

  function applyStyle(id, skipSave) {
    currentStyle = id
    if (!skipSave) localStorage.setItem(LS_STYLE, id)

    const def = getStyleDef(id)

    // Swap stylesheet
    let link = document.getElementById(LINK_ID)
    if (!link) {
      link = document.createElement('link')
      link.id   = LINK_ID
      link.rel  = 'stylesheet'
      // Insert after the first <link rel="stylesheet"> so it wins specificity
      const first = document.querySelector('link[rel="stylesheet"]')
      if (first && first.parentNode) {
        first.parentNode.insertBefore(link, first.nextSibling)
      } else {
        document.head.appendChild(link)
      }
    }
    link.href = def.file

    // Dark class — only supported for default
    if (def.supportsDark && darkActive) {
      document.body.classList.add('darkmode')
    } else {
      document.body.classList.remove('darkmode')
    }

    // Update picker UI state
    document.querySelectorAll('.style-option').forEach(el => {
      el.classList.toggle('active', el.dataset.style === id)
    })

    // Show/hide dark toggle
    const toggle = document.getElementById('theme-switch')
    if (toggle) toggle.style.display = def.supportsDark ? '' : 'none'

    // Keep background layer visible
    const bgRainbow = document.querySelector('.bg-container')
    if (bgRainbow) bgRainbow.style.display = 'block'
    const bgReact = document.getElementById('root')
    if (bgReact) { bgReact.style.opacity = '0'; bgReact.style.display = 'none' }
  }

  function enableDark() {
    darkActive = true
    localStorage.setItem(LS_DARK, 'active')
    document.body.classList.add('darkmode')
  }

  function disableDark() {
    darkActive = false
    localStorage.removeItem(LS_DARK)
    document.body.classList.remove('darkmode')
  }

  /* ─── PUBLIC API ──────────────────────────────────────────── */
  window.toggleTheme = function () {
    const def = getStyleDef(currentStyle)
    if (!def.supportsDark) return
    darkActive ? disableDark() : enableDark()
  }

  window.setStyle = function (id) {
    applyStyle(id)
    closePicker()
  }

  /* ─── PICKER INJECTION ────────────────────────────────────── */
  function buildPicker() {
    const wrapper = document.createElement('li')
    wrapper.className = 'style-picker-wrapper'
    wrapper.id = 'style-picker-wrapper'
    wrapper.innerHTML = `
      <button class="style-picker-btn" id="style-picker-btn" aria-label="Pilih Tema" title="Pilih Tema">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
        </svg>
        <span class="style-picker-label">Tema</span>
        <svg class="chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div class="style-picker-dropdown" id="style-picker-dropdown" role="menu">
        <div class="picker-heading">Pilih Tema</div>
        ${STYLES.map(s => `
          <button
            class="style-option ${s.id === currentStyle ? 'active' : ''}"
            data-style="${s.id}"
            onclick="window.setStyle('${s.id}')"
            role="menuitem"
          >
            <span class="swatch-pair">
              <span class="swatch" style="background:${s.swatch[0]}"></span>
              <span class="swatch" style="background:${s.swatch[1]}"></span>
            </span>
            <span class="option-label">${s.label}</span>
            <span class="check-icon">✓</span>
          </button>
        `).join('')}
      </div>
    `
    return wrapper
  }

  function closePicker() {
    const dd = document.getElementById('style-picker-dropdown')
    if (dd) dd.classList.remove('open')
  }

  function initPicker() {
    const nav = document.querySelector('nav ul')
    if (!nav) return

    // Don't double-inject
    if (document.getElementById('style-picker-wrapper')) return

    const picker = buildPicker()

    // Insert before the theme-switch button (if it's in a <li>) or just append
    const themeSwitchLi = document.querySelector('nav ul li:has(#theme-switch), nav ul .theme-li')
    if (themeSwitchLi) {
      nav.insertBefore(picker, themeSwitchLi)
    } else {
      // Insert before last item or just append
      const items = nav.querySelectorAll('li')
      const last = items[items.length - 1]
      if (last) nav.insertBefore(picker, last)
      else nav.appendChild(picker)
    }

    // Toggle dropdown
    document.getElementById('style-picker-btn').addEventListener('click', (e) => {
      e.stopPropagation()
      document.getElementById('style-picker-dropdown').classList.toggle('open')
    })

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('#style-picker-wrapper')) closePicker()
    })
  }

  /* ─── PICKER STYLES (injected into <head>) ───────────────── */
  function injectPickerCSS() {
    const style = document.createElement('style')
    style.textContent = `
      /* ── Style Picker UI ── */
      .style-picker-wrapper {
        position: relative;
        list-style: none;
      }

      .style-picker-btn {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 7px 13px;
        border: 1px solid var(--card-border, rgba(180,150,100,0.25));
        border-radius: 8px;
        background: var(--card-bg, rgba(255,252,247,0.9));
        color: var(--text-dark, #1e1b16);
        font-size: 13.5px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        white-space: nowrap;
      }

      .style-picker-btn:hover {
        background: var(--accent-light, rgba(139,58,42,0.08));
        border-color: var(--accent, #8b3a2a);
        color: var(--accent, #8b3a2a);
      }

      .style-picker-btn .chevron {
        transition: transform 0.2s ease;
        opacity: 0.6;
      }

      .style-picker-dropdown {
        display: none;
        position: absolute;
        right: 0;
        top: calc(100% + 10px);
        min-width: 190px;
        background: var(--card-bg, rgba(255,252,247,0.97));
        border: 1px solid var(--card-border, rgba(180,150,100,0.2));
        border-radius: 12px;
        padding: 8px;
        box-shadow: 0 16px 40px rgba(0,0,0,0.14);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        z-index: 2000;
        animation: pickerFadeIn 0.18s ease both;
      }

      .style-picker-dropdown.open {
        display: block;
      }

      @keyframes pickerFadeIn {
        from { opacity: 0; transform: translateY(-6px) scale(0.97); }
        to   { opacity: 1; transform: translateY(0)    scale(1);    }
      }

      .picker-heading {
        font-size: 10px;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        font-weight: 700;
        color: var(--abu, #7a6e62);
        padding: 4px 10px 8px;
        border-bottom: 1px solid var(--card-border, rgba(180,150,100,0.2));
        margin-bottom: 6px;
      }

      .style-option {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;
        padding: 9px 12px;
        border: none;
        background: transparent;
        border-radius: 8px;
        cursor: pointer;
        transition: background 0.15s ease;
        color: var(--text-dark, #1e1b16);
        font-size: 13.5px;
        font-weight: 500;
        text-align: left;
      }

      .style-option:hover {
        background: var(--accent-light, rgba(139,58,42,0.08));
      }

      .style-option.active {
        background: var(--accent-light, rgba(139,58,42,0.08));
        color: var(--accent, #8b3a2a);
      }

      .swatch-pair {
        display: flex;
        border-radius: 50px;
        overflow: hidden;
        border: 1.5px solid rgba(0,0,0,0.12);
        flex-shrink: 0;
      }

      .swatch {
        width: 14px;
        height: 14px;
        display: block;
      }

      .option-label {
        flex: 1;
      }

      .check-icon {
        font-size: 12px;
        color: var(--accent, #8b3a2a);
        opacity: 0;
        transition: opacity 0.15s;
      }

      .style-option.active .check-icon {
        opacity: 1;
      }

      /* Mobile picker */
      @media (max-width: 768px) {
        .style-picker-dropdown {
          right: auto;
          left: 0;
          min-width: 180px;
        }
        .style-picker-btn .style-picker-label {
          display: none;
        }
      }

      /* Neon theme overrides for picker */
      body.theme-neon .style-picker-btn,
      body.theme-neon .style-picker-dropdown {
        border-color: rgba(0,255,224,0.2);
      }
      body.theme-neon .style-option:hover,
      body.theme-neon .style-option.active {
        background: rgba(0,255,224,0.08);
        color: #00ffe0;
      }
      body.theme-neon .check-icon {
        color: #00ffe0;
      }
      body.theme-neon .style-picker-btn:hover {
        color: #00ffe0;
        border-color: #00ffe0;
        background: rgba(0,255,224,0.06);
      }

      /* Sunda theme overrides for picker */
      body.theme-sunda .style-option:hover,
      body.theme-sunda .style-option.active {
        background: rgba(212,148,58,0.12);
        color: #d4943a;
      }
      body.theme-sunda .check-icon {
        color: #d4943a;
      }
      body.theme-sunda .style-picker-btn:hover {
        color: #d4943a;
        border-color: #d4943a;
      }
    `
    document.head.appendChild(style)
  }

  /* ─── EXTRA: apply theme class to body for CSS hooks ─────── */
  function applyBodyClass(id) {
    STYLES.forEach(s => document.body.classList.remove('theme-' + s.id))
    document.body.classList.add('theme-' + id)
  }

  /* patch applyStyle to also set body class */
  const _origApply = applyStyle
  applyStyle = function(id, skipSave) {
    _origApply(id, skipSave)
    applyBodyClass(id)
  }

  /* ─── INIT ────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    injectPickerCSS()

    // Apply saved style (silent — don't double-save)
    applyStyle(currentStyle, true)
    applyBodyClass(currentStyle)

    // Restore dark if applicable
    if (getStyleDef(currentStyle).supportsDark && darkActive) {
      document.body.classList.add('darkmode')
    }

    // Build picker once nav is ready
    initPicker()

    // Wire existing theme-switch button
    const themeSwitch = document.querySelector('#theme-switch, .theme-switch')
    if (themeSwitch && !themeSwitch.hasAttribute('onclick')) {
      themeSwitch.addEventListener('click', (e) => {
        e.preventDefault()
        window.toggleTheme()
      })
    }
  })
})()