import React from 'react'

export const Listado = ({articulos, setArticulos}) => {
  return (
    articulos.map(articulo => (
        <article key={articulo._id} className="articulo-item">
          <div className='mascara'>
            <img src='https://lineadecodigo.com/wp-content/uploads/2014/04/javascript.png' alt={articulo.titulo} />
          </div>
          <div className='datos'>
            <h3 className="title">{articulo.titulo}</h3>
            <p className="description">{articulo.contenido}</p>
            <button className="edit">Editar</button>
            <button className="delete">Borrar</button>
          </div>
        </article>
      )
    )
  )
}
