import { AuthorsIndex } from './pages/authorsIndex.js'
import { AuthorPage } from './pages/authorPage.js'
import { FourOhFourPage } from './pages/fourOhFourPage.js'

export const routes = [
  {
    path: '/',
    exact: true,
    component: AuthorsIndex
  },
  {
    path: '/author/:authorId',
    component: AuthorPage
  },
  {
    path: '*',
    component: FourOhFourPage
  }
]
