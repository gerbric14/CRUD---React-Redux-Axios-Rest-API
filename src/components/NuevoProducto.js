import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
//ACTIONS DE REDUX
import { crearNuevoProductoAction } from '../actions/productosActions'
import { mostrarAlerta, ocultarAlertaAction } from '../actions/alertaActions';

const NuevoProducto = ({history}) => {

    let navigate = useNavigate();

    //STATE DEL COMPONENTE
    const [nombre, guardarNombre] = useState('');
    const [precio, guardarPrecio] = useState(0)

    //UTILIZAR USE DISPATCH Y ESTE CREA O DEVUELVE UNA FUNCION
    const dispatch = useDispatch();

    //ACCEDER AL STATE
    const cargando = useSelector(state => state.productos.loading);
    const error = useSelector(state => state.productos.error)
    const alerta = useSelector(state => state.alerta.alerta)

    //MANDA A LLAMAR EL ACTION DE productoActions
    const agregarProducto = (producto) => dispatch(crearNuevoProductoAction(producto))

    //CUANDO EL USUARIO HAGA SUBMIT
    const submitNuevoProducto = e => {
        e.preventDefault();
        
        //VALIDAR FORMULARIO
        if(nombre.trim() === '' || precio <= 0){
            const alerta = {
                msg: 'Ambos campos son obligatorios',
                classes: 'alert alert-danger text-center text-uppercase p-3 font-weight-bold'
            }
            dispatch(mostrarAlerta(alerta));
            return;
        }

        //SI NO HAY ERRORES
        dispatch(ocultarAlertaAction());

        //CREAR EL NUEVO PRODUCTO
        agregarProducto({
            nombre, 
            precio
        });

        //REDIRECCIONAR
        navigate('/');

    }
  return (
    <div className='row justify-content-center'>
        <div className='col-md-8'>
            <div className='card'>
                <div className='card-body'>
                    <h2 className='text-center mb-4 font-weight-bold'>Agregar Nuevo Producto</h2>
                    {alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null}
                    <form onSubmit={submitNuevoProducto}>
                        <div className='form-group'>
                            <label>Nombre Producto</label>
                            <input type='text'
                                className='form-control'
                                placeholder='Nombre del Producto'
                                name='nombre'
                                value={nombre}
                                onChange={e => guardarNombre(e.target.value)}
                            />
                        </div>

                        <div className='form-group'>
                            <label>Precio Producto</label>
                            <input type='number'
                                className='form-control'
                                placeholder='Precio del Producto'
                                name='precio'
                                value={precio}
                                onChange={e => guardarPrecio(Number(e.target.value))}
                            />
                        </div>

                        <button 
                            type='submit'
                            className='btn btn-primary font-wight-bold text-uppercase d-block w-100'
                        >
                            Agregar 
                        </button>

                    </form>

                    {cargando ? <p>Cargando...</p> : null}
                    {error ? <p className='mt-4 text-center alert alert-danger'>Hubo un error</p> : null}
                </div>
            </div>
        </div>

    </div>
  )
}

export default NuevoProducto