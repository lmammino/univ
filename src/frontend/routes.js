import { authors } from '../data/authors.js'
import { AuthorsIndex } from './pages/authorsIndex.js'
import { AuthorPage } from './pages/authorPage.js'
import { FourOhFourPage } from './pages/fourOhFourPage.js'

function findAuthor (authorId) {
  return authors.find(author => author.id === authorId)
}

export const routes = [
  {
    path: '/',
    exact: true,
    component: AuthorsIndex,
    loadData: (ctx) => {
      console.log('LOADING DATA FOR /', ctx)
      return Promise.resolve(authors)
    }
  },
  {
    path: '/author/:authorId',
    component: AuthorPage,
    loadData: (ctx) => {
      console.log('LOADING DATA FOR /', ctx)
      return Promise.resolve(findAuthor(ctx.authorId))
    }
  },
  {
    path: '/author/:authorId',
    component: FourOhFourPage
  }
]
