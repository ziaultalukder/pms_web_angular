import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './component/blog/blog.component';
import { PostComponent } from './component/post/post.component';
import { CategoryComponent } from './component/category/category.component';
import { NotfoudComponent } from './component/notfoud/notfoud.component';
import { NewPostComponent } from './component/new-post/new-post.component';
import { EditPostComponent } from './component/edit-post/edit-post.component';
import { PostDetailsComponent } from './component/post-details/post-details.component';

const routes: Routes = [
  {
    path: '', component: BlogComponent, children: [
      {path: 'post', component: PostComponent},
      {path: 'category', component: CategoryComponent},
      {path: 'new-post', component: NewPostComponent},
      {path: 'edit-post/:id', component: EditPostComponent},
      {path: 'details/:id/:seoTitle', component: PostDetailsComponent},
      {path: '', redirectTo:'/blog/post', pathMatch:'full'},
      {path: '**', component:NotfoudComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogModuleRoutingModule { }
