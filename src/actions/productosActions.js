import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR
       
} from '../types'

import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

//ESTA ACCION SE USA EN EL COMPONENTE!
//CREAR NUEVOS PRODUCTOS
export function crearNuevoProductoAction(producto){
    return async (dispatch) => {

        dispatch( agregarProducto() );

        try{
            //INSERTAR EN LA API
            await clienteAxios.post('/productos', producto)

            //SI TODO ESTA BIEN ACTUALIZAR EL STATE
            dispatch( agregarProductoExito(producto) );

            //AGG ALERTA
            Swal.fire(
                'Correcto',
                'El producto se agregó correctamente',
                'success'
            )
            
        }catch(error){
            console.log(error);
            //SI HAY UN ERROR CAMBIAR EL STATE
            dispatch( agregarProductoError(true) );

            //AGG ALERTA DE ERROR
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hubo un error, intenta de nuevo'
              })

        }
    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
})

//SI EL PRODUCTO SE GUARDA EN LA API/BD
const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

//SI HUBO UN ERROR
const agregarProductoError = estado => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
})

//FUNCION QUE DESCARGA LOS PRODUCTOS DE LA BD
export function obtenerProductosAction(){
    return async (dispatch) => {
        dispatch( descargarProductos() );

        try {
            const respuesta = await clienteAxios.get('/productos')
            dispatch(descargaProductosExitosa(respuesta.data));
        } catch (error) {
            dispatch(descargaProductosError());
        }
    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
})

const descargaProductosExitosa = productos => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload:productos
})

const descargaProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
})

//SELECCIONA Y ELIMINA EL PRODUCTO
export function borrarProductoAction(id) {
    return async (dispatch) => {
        dispatch(obtenerProductoEliminar(id));

        try {
            await clienteAxios.delete(`/productos/${id}`);
            dispatch(eliminarProductoExito());

            //SI SE ELIMINA MOSTRAR ALERTA
            Swal.fire(
                'Eliminado!',
                'Producto Eliminado Correctamente',
                'success'
            )
            
        } catch (error) {
            console.log(error);
            dispatch(eliminarProductoError());
            
        }
        
    }
}

const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
})

const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO
})

const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true
})


//COLOCAR PRODUCTO EN EDICION
export function obtenerProductoEditar(producto){
    return(dispatch) => {
        dispatch(obtenerProductoEditarAction(producto))
    }
}

const obtenerProductoEditarAction = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
})

//EDITA UN REGISTRO EN LA API Y STATE
export function editarProductoAction(producto){
    return async (dispatch) => {
        dispatch(editarProducto())

        try {
            await clienteAxios.put(`/productos/${producto.id}`, producto);
            dispatch(editarProductoExito(producto));

        } catch (error) {
            dispatch(editarProductoError());
            
        }
    }
}

const editarProducto = () => ({
    type: COMENZAR_EDICION_PRODUCTO
})

const editarProductoExito = producto => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
})

const editarProductoError = () => ({
    type: PRODUCTO_EDITADO_ERROR,
    payload: true
})