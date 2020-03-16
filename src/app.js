import react from 'react'
import Router from 'react-router-component'
import { AuthorsIndex } from './pages/authorsIndex.js'
import { AuthorPage } from './pages/authorPage.js'
import { FourOhFourPage } from './pages/fourOhFourPage.js'
import { authors } from './data/authors.js'

const h = react.createElement

function findAuthor (authorId) {
  return authors.find(author => author.id === authorId)
}

export function createApp (path) {
  return class App extends react.Component {
    render () {
      return (
        h('div', { className: 'container' },
          h('header', null,
            h('h1', { className: 'text-center' },
              h(Router.Link, { href: '/' }, 'My library')
            )
          ),
          h(Router.Locations, { path },
            h(Router.Location, { path: '/', handler: () => h(AuthorsIndex, { authors }) }),
            h(Router.Location, {
              path: '/author/:authorId',
              handler: ({ authorId }) => {
                const author = findAuthor(authorId)
                if (!author) {
                  return h(FourOhFourPage, { error: 'Author not found' })
                }
                return h(AuthorPage, { author })
              }
            }),
            h(Router.NotFound, { handler: FourOhFourPage })
          ),
          h('footer', null,
            'Made with ♥ by ',
            h('a', { target: '_blank', href: 'https://twitter.com/loige' }, '@loige'),
            ' for ',
            h('a', { target: '_blank', href: 'https://www.nodejsdesignpatterns.com/' }, 'Node.js Design Patterns (the book)')
          )
        )
      )
    }
  }
}
