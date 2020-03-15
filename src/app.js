import { Component } from 'preact'
import { html } from 'htm/preact'
import Router from 'preact-router'
import { Link } from 'preact-router/match'
import { AuthorsIndex } from './pages/authorsIndex.js'
import { AuthorPage } from './pages/authorPage.js'
import { FourOhFourPage } from './pages/fourOhFourPage.js'
import { authors } from './data/authors.js'

function findAuthor (authorId) {
  return authors.find(author => author.id === authorId)
}

export class App extends Component {
  render (props, state) {
    return html`
      <div class="container">
        <header>
          <h1 class="text-center"><${Link} href="/">My library</></h1>
        </header>
        <div>
          <${Router}>
            <${AuthorsIndex} path="/" authors=${authors}/>
            <${({ authorId }) => {
              const author = findAuthor(authorId)
              if (!author) {
                return html`<${FourOhFourPage} message="Author not found" />`
              }
              return html`<${AuthorPage} author=${findAuthor(authorId)} />`
            }} path="/author/:authorId" />
            <${FourOhFourPage} default />
          </>
        </div>
        <footer>
          Made with ♥ by <a target="_blank" href="https://twitter.com/loige">loige</a> for <a target="_blank" href="https://www.nodejsdesignpatterns.com/">Node.js Design Patterns (the book)</a>
        </footer>
      </div>
    `
  }
}
