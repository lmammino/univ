import { Component } from 'preact'
import { html } from 'htm/preact'
import Router from 'preact-router'
import { AuthorsIndex } from './pages/authorsIndex.js'
import { AuthorPage } from './pages/authorPage.js'
import { authors } from './data/authors.js'

function findAuthor (authorId) {
  return authors.find(author => author.id === authorId)
}

export class App extends Component {
  render (props, state) {
    return html`
      <h1>My library</h1>
      <${Router}>
        <${AuthorsIndex} path="/" authors=${authors}/>
        <${({ authorId }) => html`<${AuthorPage} author=${findAuthor(authorId)} />`} path="/author/:authorId" />
      </>
    `
  }
}
