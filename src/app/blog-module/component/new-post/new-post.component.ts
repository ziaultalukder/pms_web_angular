import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CategoryService } from '../../service/category/category.service';
import { Observable, Subscriber } from 'rxjs';
import { CreatePost } from '../../Model/CreatePost';
import { PostService } from '../../service/post/post.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  /**
   *
   */
  submitted = false;
  categoryList: any;
  public Editor: any = ClassicEditor;
  FeaturedImage: string = '';
  PostImage: string = '';
  isLoading = false;

  constructor(private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private postService: PostService,
    private router: Router, 
    private toast: ToastrService
  ) {

  }

  ngOnInit(): void {
    this.categoryService.getCategory().subscribe(c => {
      this.categoryList = c;
    })
  }

  postForm = this.formBuilder.group({
    categoryId: ['', Validators.required],
    title: ['', Validators.required],
    description: ['', Validators.required],
    featuredImage: ['', Validators.required],
    image: ['', Validators.required],
    tags: ['', Validators.required]
  })

  get f(): { [key: string]: AbstractControl } {
    return this.postForm.controls;
  }

  onSubmit(data: any) {
    this.isLoading = true;
    this.submitted = true;
    if (this.postForm.invalid) {
      return;
    } else {

      let postData: CreatePost = {
        id: 0,
        categoryId: data.categoryId,
        title: data.title,
        description: data.description,
        featuredImage: this.FeaturedImage,
        image: this.PostImage,
        tags: data.tags
      }
      this.postService.CreatePost(postData).subscribe(
        res => {
          if(res.succeed){
            this.toast.success('SUCCESS', 'Save Success');
            this.router.navigate(['/blog/post']);
          }else{
            this.toast.error('Wrong!', res.errors[0]);
          }
          // console.log(res)
        },
        err => {
          this.toast.error('Wrong!', err.errors[0]);
        }
      )
    }

  }

  onSelectedFile(event: any) {
    const dd = event.target.files[0]
    this.convertToBase64(dd);
  }

  convertToBase64(file: File) {
    const observable = new Observable((Subscriber: Subscriber<any>) => {
      this.readFile(file, Subscriber)
    });

    observable.subscribe((d) => {
      this.FeaturedImage = d;
    })

  }

  readFile(file: File, subscriber: Subscriber<any>) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      subscriber.next(fileReader.result);
      subscriber.complete();
    };

    fileReader.onerror = (err) => {
      subscriber.error(err);
      subscriber.complete();
    }

  }


  onSelectedFilePostImage(event: any) {
    const dd = event.target.files[0]
    this.convertToBase64ForPostImage(dd);
  }

  convertToBase64ForPostImage(file: File) {
    const observable = new Observable((Subscriber: Subscriber<any>) => {
      this.readFileForPostImage(file, Subscriber)
    });

    observable.subscribe((d) => {
      this.PostImage = d;
    })

  }

  readFileForPostImage(file: File, subscriber: Subscriber<any>) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      subscriber.next(fileReader.result);
      subscriber.complete();
    };

    fileReader.onerror = (err) => {
      subscriber.error(err);
      subscriber.complete();
    }

  }

}
