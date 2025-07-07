import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogModuleRoutingModule } from './blog-module-routing.module';
import { BlogComponent } from './component/blog/blog.component';
import { CategoryComponent } from './component/category/category.component';
import { PostComponent } from './component/post/post.component';
import { NewPostComponent } from './component/new-post/new-post.component';
import { EditPostComponent } from './component/edit-post/edit-post.component';
import { NotfoudComponent } from './component/notfoud/notfoud.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { PostService } from './service/post/post.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from '../guards/auth.interceptor';
import { PostDetailsComponent } from './component/post-details/post-details.component';

@NgModule({
  declarations: [
    BlogComponent,
    CategoryComponent,
    PostComponent,
    NewPostComponent,
    EditPostComponent,
    NotfoudComponent,
    PostDetailsComponent
  ],
  imports: [
    CommonModule,
    BlogModuleRoutingModule,
    ReactiveFormsModule,
    CKEditorModule,
    HttpClientModule,
  ],
  providers:[
    PostService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true}, 
  ]
})
export class BlogModuleModule { }
