import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VerifyEmailComponent} from "./login/verify-email/verify-email.component";
import {AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo} from "@angular/fire/compat/auth-guard";
import {SidenavModule} from "./sidenav/sidenav.module";
import {SidenavComponent} from "./sidenav/sidenav/sidenav.component";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToSideNav = () => redirectLoggedInTo(['']);

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectLoggedInToSideNav}
  },
  {
    path: '',
    component: SidenavComponent,
    children: [
      {
        path: 'mr-management',
        loadChildren: () => import('./meeting-rooms/meeting-rooms.module').then(m => m.MeetingRoomsModule)
      },
      {
        path: 'meetings-management',
        loadChildren: () => import('./meetings-management/meetings-management.module').then(m => m.MeetingsManagementModule)
      },
      {
        path: 'user-management',
        loadChildren: () => import('./user-management/user-management.module').then(m => m.UserManagementModule)
      },
      {
        path: 'user-profile/:id',
        loadChildren: () => import('./user-profile/user-profile.module').then(m => m.UserProfileModule)
      }
    ],
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin}
  },
  {path: 'verify-email-address', component: VerifyEmailComponent},
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    SidenavModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
