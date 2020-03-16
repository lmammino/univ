import react from 'react'
import reactDOM from 'react-dom'
import { createApp } from './app.js'

const h = react.createElement
reactDOM.render(h(createApp(), null), document.getElementById('root'))
