import react from 'react'
import { AsyncPage } from './asyncPage.js'
import { FourOhFourPage } from './fourOhFourPage.js'
import { Header } from '../components/header.js'
import { Footer } from '../components/footer.js'
import { authors } from '../../data/authors.js'

const h = react.createElement

function findAuthor (authorId) {
  return authors.find(author => author.id === authorId)
}

class NotFoundAuthor extends Error {
  constructor (authorId) {
    const message = `Author with id "${authorId}" not found`
    super(message)
    this.type = 'NotFound'
    this.description = message
  }
}

export class AuthorPage extends AsyncPage {
  static async preloadAsyncData (props) {
    const author = findAuthor(props.match.params.authorId)
    if (!author) {
      throw new NotFoundAuthor(props.match.params.authorId)
    }

    return author
  }

  render () {
    if (this.state.staticError && this.state.staticError.type === 'NotFound') {
      // data was loaded but it is empty (the author was not found)
      // renders the 404 page instead
      return h(FourOhFourPage, {
        staticContext: this.props.staticContext,
        error: this.state.staticError.description
      })
    }

    return h('div', { className: 'container' },
      h(Header),
      this.state.loading
        ? h('div', { className: 'text-center' }, 'Loading ...')
        : h('div', null,
          h('h2', { className: 'text-center' }, this.state.staticData.name),
          h('div', { className: 'row' },
            h('div', { className: 'col-1' }),
            h('div', { className: 'col-10' },
              h('p', { className: 'bio' },
                h('img', {
                  className: 'portrait',
                  src: `/public/authors/${this.state.staticData.picture}`
                }),
                this.state.staticData.bio
              )
            ),
            h('div', { className: 'col-1' })
          ),
          h('h3', { className: 'text-center' }, 'Books'),
          h('ul', { className: 'books' },
            this.state.staticData.books.map((book) =>
              h('li', { key: book.id, className: 'book' },
                h('div', { className: 'cover' },
                  h('img', { src: `/public/covers/${book.cover}` })
                ),
                h('div', { className: 'info' },
                  h('p', { className: 'title' }, book.title),
                  h('p', null, book.year)
                )
              )
            )
          )
        ),
      h(Footer)
    )
  }
}
