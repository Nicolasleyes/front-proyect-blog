import React from 'react'

export const Articulos = () => {
  return (
    <>
      <article className="articulo-item">
        <div className='mascara'>
          <img src='https://lineadecodigo.com/wp-content/uploads/2014/04/javascript.png'/>
        </div>
        <div className='datos'>

        <h3 className="title">Desarrollo web</h3>
        <p className="description">victorroblesweb.es</p>

        <button className="edit">Editar</button>
        <button className="delete">Borrar</button>
        </div>
      </article>
 
     

    </>
  )
}
