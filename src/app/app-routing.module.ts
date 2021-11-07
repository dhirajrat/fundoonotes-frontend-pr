import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/authentication/auth.guard'
import { LoginComponent } from './login/login.component'
import { SignupComponent } from './signup/signup.component';
import { NoteComponent } from './note/note.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  // { path: '**', redirectTo: '/login' },
  { path: 'signup', component: SignupComponent },
  { path: "notes", component: NoteComponent, canActivate: [AuthGuard] },
  { path: "", redirectTo: 'notes', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
