import { useState } from 'react'

import { Crear } from './components/pages/Crear'
import { Inicio } from './components/pages/inicio'
import { Articulos } from './components/pages/articulos'
import { Rutas } from './routing/rutas'

function App() {
  

  return (
    <div className='layout'>
      
      <Rutas/>
    </div>
  )
} 

export default App
