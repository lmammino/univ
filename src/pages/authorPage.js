import { Component } from 'preact'
import { html } from 'htm/preact'
import { Link } from 'preact-router/match'

export class AuthorPage extends Component {
  render ({ author }, state) {
    return html`
    <div>
      <h2>${author.name}'s books</h2>
      <ul className="books">
        ${author.books.map((book, key) =>
          html`<li key={key} className="book">${book}</li>`
        )}
      </ul>
      <${Link} href="/">Go back to index</>
    </div>
    `
  }
}
