import { Component } from 'preact'
import { html } from 'htm/preact'
import { Link } from 'preact-router/match'

export class FourOhFourPage extends Component {
  render ({ error }, state) {
    return html`
    <div>
      <h2>404</h2>
      <h3>${error || 'Page not found'}</h3>
      <${Link} href="/">Go back to the home page</>
    </div>
    `
  }
}
