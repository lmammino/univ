import { Component } from 'preact'
import { html } from 'htm/preact'

export class AuthorPage extends Component {
  render ({ author }, state) {
    return html`
    <div>
      <h2 class="text-center">${author.name}</h2>
      <div class="row">
        <div class="col-1"></div>
        <div class="col-10">
          <p class="bio">
            <img class="portrait" src="/authors/${author.picture}"/>
            ${author.bio}
          </p>
        </div>
        <div class="col-1"></div>
      </div>

      <h3 class="text-center">Books</h3>
      <ul class="books">
        ${author.books.map((book) =>
          html`<li key=${book.id} class="book">
            <div class="cover">
              <img src="/covers/${book.cover}"/>
            </div>
            <div class="info">
              <p class="title">${book.title}</p>
              <p>${book.year}</p>
            </div>
          </li>`
        )}
      </ul>
    </div>
    `
  }
}
