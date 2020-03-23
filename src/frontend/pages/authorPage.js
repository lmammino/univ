import react from 'react'
import axios from 'axios'
import { AsyncPage } from './asyncPage.js'
import { FourOhFourPage } from './fourOhFourPage.js'
import { Header } from '../components/header.js'
import { Footer } from '../components/footer.js'

const h = react.createElement

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
    try {
      const { data } = await axios.get(`http://localhost:3001/api/authors/${props.match.params.authorId}`)
      return data
    } catch (err) {
      if (err.response.status === 404) {
        throw new NotFoundAuthor(props.match.params.authorId)
      }
      throw err
    }
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
