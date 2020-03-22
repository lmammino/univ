import react from 'react'
import { Header } from '../components/header.js'
import { Footer } from '../components/footer.js'
import { authors } from '../../data/authors.js'

const h = react.createElement

function findAuthor (authorId) {
  return authors.find(author => author.id === authorId)
}

export class AuthorPage extends react.Component {
  constructor (props) {
    super(props)
    console.log(props)
    this.state = {
      author: null
    }
  }

  componentDidMount () {
    this.setState({
      author: findAuthor(this.props.match.params.authorId)
    })
  }

  render () {
    const { author } = this.state
    return h('div', { className: 'container' },
      h(Header),
      author === null
        ? h('p', { className: 'text-center' }, 'Loading ...')
        : h('div', null,
          h('h2', { className: 'text-center' }, author.name),
          h('div', { className: 'row' },
            h('div', { className: 'col-1' }),
            h('div', { className: 'col-10' },
              h('p', { className: 'bio' },
                h('img', {
                  className: 'portrait',
                  src: `/public/authors/${author.picture}`
                }),
                author.bio
              )
            ),
            h('div', { className: 'col-1' })
          ),
          h('h3', { className: 'text-center' }, 'Books'),
          h('ul', { className: 'books' },
            author.books.map((book) =>
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
