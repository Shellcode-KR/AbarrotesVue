import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Login from '../components/LoginForm.vue'
import PanelAdmin from '../components/PanelAdmin.vue'
import ListaProductos from '../components/ListaProductos.vue'
import ListaUsuarios from '../components/ListaUsuarios.vue'
import InformacionProducto from '../components/InformacionProducto.vue'
import InformacionUsuario from '../components/InformacionUsuario.vue'
import VistaVentas from '../components/VistaVentas.vue'
import AgregaUsuario from '../components/AgregarUsuario.vue'
import InformacionProveedores from '../components/InformacionProveedores.vue'
import ListaProovedores from '../components/ListaProveedores.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/admin',
        name: 'paneladmin',
        component: PanelAdmin,
        children: [
            {
                path: 'proveedores',
                name: 'listaProveedores',
                component: ListaProovedores
            },
            {
                path: 'proveedores/info',
                name: 'proveedoresInfo',
                component: InformacionProveedores
            },
            {
                path: 'productos',
                name: 'adminlistaProductos',
                component: ListaProductos
            },
            {
                path: 'productos/info',
                name: 'admininfoProductos',
                component: InformacionProducto
            },
            {
                path: 'productos/info/:id',
                name: 'admineditProductos',
                component: InformacionProducto
            },
            {
                path: 'usuarios',
                name: 'adminlistaUsuarios',
                component: ListaUsuarios
            },
            {
                path: 'usuarios/info',
                name: 'admininfoUsuarios',
                component: InformacionUsuario
            },
            {
                
                    path: 'AgregaUsuarios',
                    name: 'AltaUsuario',
                    component: AgregaUsuario
                
            },
            {
                path: 'usuarios/info/:id',
                name: 'adminineditUsuarios',
                component: InformacionUsuario
            },

            {
                path: 'ventas',
                name: 'adminventas',
                component: VistaVentas
            },
        ]

    },



]
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router