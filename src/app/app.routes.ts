import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
//    { path: '', loadChildren: './modules/home.module#HomeModule' },
   //{ path: 'auth', loadChildren: './modules/auth.module#AuthModule' },
]
 
export const appRoutingProviders: any[] = [];
export const appRoutes: any = RouterModule.forRoot(routes);