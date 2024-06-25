import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PecasComponent } from './pages/pecas/pecas.component';
import { CadastrarPecasComponent } from './pages/cadastrar-pecas/cadastrar-pecas.component';
import { CadastrarUsuarioComponent } from './pages/cadastrar-usuario/cadastrar-usuario.component';
import { PecasPendentesComponent } from './pages/pecas-pendentes/pecas-pendentes.component';
import { RealizarPedidoComponent } from './pages/realizar-pedido/realizar-pedido.component';
import { HistoricoComponent } from './pages/historico/historico.component';
import { AuthGuard } from './auth.guard';
import { PaginaErroComponent } from './pages/pagina-erro/pagina-erro.component';
import { PedidosConcluidosComponent } from './pages/pedidos-concluidos/pedidos-concluidos.component';
import { ConfiguracoesComponent } from './pages/configuracoes/configuracoes.component';
import { GerenciarPecasComponent } from './pages/gerenciar-pecas/gerenciar-pecas.component';
import { GerenciarPedidosComponent } from './pages/gerenciar-pedidos/gerenciar-pedidos.component';
import { GerenciarUsuariosComponent } from './pages/gerenciar-usuarios/gerenciar-usuarios.component';
import { CancelarPedidosComponent } from './pages/cancelar-pedidos/cancelar-pedidos.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { AlterarPecaComponent } from './pages/alterar-peca/alterar-peca.component';
import { EditarPecaComponent } from './pages/editar-peca/editar-peca.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {
        path: "login",
        component: LoginComponent,
    },
    {
        path: "dashboard",
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "pecas",
        component: PecasComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "cadastrar-pecas",
        component: CadastrarPecasComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "cadastrar-usuario",
        component: CadastrarUsuarioComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "pecas-pendentes",
        component: PecasPendentesComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "realizar-pedido",
        component: RealizarPedidoComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "historico",
        component: HistoricoComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "errorRangeValueAccessor",
        component: PaginaErroComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "pedidos-concluidos",
        component: PedidosConcluidosComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "configuracoes",
        component: ConfiguracoesComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "gerenciar-pecas",
        component: GerenciarPecasComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "gerenciar-pedidos",
        component: GerenciarPedidosComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "gerenciar-usuarios",
        component: GerenciarUsuariosComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "cancelar-pedidos",
        component: CancelarPedidosComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "usuarios",
        component: UsuariosComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "alterar-peca",
        component: AlterarPecaComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "editar-peca",
        component: EditarPecaComponent,
        canActivate: [AuthGuard]
    },
];