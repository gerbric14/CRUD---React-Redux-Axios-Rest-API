import React from 'react'
import Header from "./components/Header";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Productos from './components/Productos';
import NuevoProducto from './components/NuevoProducto';
import EditarProducto from './components/EditarProducto';

//REDUX
import {Provider} from 'react-redux'
import store from './store';

function App() {
  return (
    <Router>
      <Provider store={store}>

        <Header/>

        <div className='container mt-5'>
          <Routes>
            <Route path='/' element={<Productos />} />
            <Route path='/nuevo-producto' element={<NuevoProducto />} />
            <Route path='/editar-producto/:id' element={<EditarProducto />} />
          </Routes>
        </div>
      </Provider>
    </Router>

  );
}

export default App;
