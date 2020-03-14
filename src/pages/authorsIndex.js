import { Component } from 'preact'
import { html } from 'htm/preact'
import { Link } from 'preact-router/match'

export class AuthorsIndex extends Component {
  render ({ authors }, state) {
    return html`
    <div>
      <h2>Books by author</h2>
      <ul>${
        authors.map(author =>
          html`
          <li key=${author.id}>
            <${Link} href=${`/author/${author.id}`}>${author.name}</>
          </li>
          `
        )
      }</ul>
    </div>
    `
  }
}
