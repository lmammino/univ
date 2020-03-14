import { render } from 'preact'
import { html } from 'htm/preact'
import { App } from './app.js'

render(html`<${App}/>`, document.body)
