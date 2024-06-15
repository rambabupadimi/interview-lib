import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path:'', loadChildren: () => import('@interview-lib/admin-auth').then(m=> m.AdminAuthModule)
    }
];
