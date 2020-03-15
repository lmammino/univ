import { Component } from 'preact'
import { html } from 'htm/preact'
import { Link } from 'preact-router/match'

export class AuthorsIndex extends Component {
  render ({ authors }, state) {
    return html`
    <div>
      <h2 class="text-center">Books by author</h2>
      <div class="row">${
        authors.map(author =>
          html`
          <div class="col text-center" key=${author.id}>
            <${Link} href=${`/author/${author.id}`}>
              <img class="portrait" src="/authors/${author.picture}"/>
              <p>${author.name}</p>
            </>
          </div>
          `
        )
      }</div>
    </div>
    `
  }
}
