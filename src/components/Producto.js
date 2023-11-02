import React from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
//REDUX
import { useDispatch } from 'react-redux'
import { borrarProductoAction, obtenerProductoEditar } from '../actions/productosActions';


const Producto = ({producto}) => {
    const {id, nombre, precio} = producto;

    const dispatch = useDispatch();
    const navigate = useNavigate(); // HABILITAR NAVIGATE PARA REDIRECCION

    //CONFIRMAR SI DESEA ELIMIINAR PRODUCTO
    const confirmarEliminarProducto = id => {
        //PREGUNTAR AL USUARIO
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Esta accion no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                //PASARLOS AL ACTION
                dispatch(borrarProductoAction(id))
            }
          })
    }

    //FUNCION QUE REDIRIGE DE FORMA PROGRAMADA
    const redireccionarEdicion = producto => {
        dispatch(obtenerProductoEditar(producto))
        navigate(`/editar-producto/${producto.id}`)

    } 


  return (
    <tr>
        <td>{nombre}</td>
        <td> <span className='font-weight-bold'>${precio}</span></td>
        <td className='acciones'>
            <button 
                type='button' 
                className='btn btn-primary mr-2'
                onClick={() => redireccionarEdicion(producto)}
            >
                Editar
            </button>

            <button 
                type='button' 
                className='btn btn-danger'
                onClick={() => confirmarEliminarProducto(id)}
            >
                Eliminar
            </button>
        </td>
    </tr>
  )
}

export default Producto