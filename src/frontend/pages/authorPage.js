import react from 'react'
import { AsyncPage } from './asyncPage.js'
import { Header } from '../components/header.js'
import { Footer } from '../components/footer.js'
import { authors } from '../../data/authors.js'

const h = react.createElement

function findAuthor (authorId) {
  return authors.find(author => author.id === authorId)
}

export class AuthorPage extends AsyncPage {
  static async loadData (props) {
    console.log({ props })
    return findAuthor(props.match.params.authorId)
  }

  render () {
    return h('div', { className: 'container' },
      h(Header),
      this.state.loading
        ? h('div', { className: 'text-center' }, 'Loading ...')
        : h('div', null,
          h('h2', { className: 'text-center' }, this.state.data.name),
          h('div', { className: 'row' },
            h('div', { className: 'col-1' }),
            h('div', { className: 'col-10' },
              h('p', { className: 'bio' },
                h('img', {
                  className: 'portrait',
                  src: `/public/authors/${this.state.data.picture}`
                }),
                this.state.data.bio
              )
            ),
            h('div', { className: 'col-1' })
          ),
          h('h3', { className: 'text-center' }, 'Books'),
          h('ul', { className: 'books' },
            this.state.data.books.map((book) =>
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
