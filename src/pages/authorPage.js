import react from 'react'
const h = react.createElement

export class AuthorPage extends react.Component {
  render () {
    const { author } = this.props
    return h('div', null,
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
    )
  }
}
