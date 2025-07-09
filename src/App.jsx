import React from 'react'
import CardCategory from './components/CardCategory/CardCategory'
import './App.css'
import img1 from './assets/cat.png'
import img2 from './assets/dog.png'

const App = () => {
  return (
    <>
      <div className="categories">
        <CardCategory 
        title='Gatos'
        image={img1}
        category='cat'
        />

        <CardCategory 
        title='Perros'
        image={img2}
        category='dog'/>
      </div>
    </>
  )
}

export default App