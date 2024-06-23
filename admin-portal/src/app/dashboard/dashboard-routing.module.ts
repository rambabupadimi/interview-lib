import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TechnologiesComponent } from './technologies/technologies.component';
import { QuestionsComponent } from './questions/questions.component';

const routes: Routes = [
  {
    path:'',
    component: DashboardComponent,
    children :[
      {
        path:'',
        redirectTo:'technologies',
        pathMatch:'full'
      },
      {
        path:'technologies',
        component: TechnologiesComponent
      },
      {
        path:'questions',
        component: QuestionsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
