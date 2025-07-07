import { Component, OnInit } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CategoryService } from '../../service/category/category.service';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { PostService } from '../../service/post/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreatePost } from '../../Model/CreatePost';
import { Observable, Subscriber } from 'rxjs';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  /**
   *
   */
  
  button = 'Submit';
  isLoading = false;

  submitted = false;
  categoryList: any;
  public Editor: any = ClassicEditor;
  FeaturedImage: string = '';
  PostImage: string = '';

  ExistingFeaturedImage: string = '';
  ExistingPostImage: string = '';

  // imageUrl = "http://localhost:5276"
  imageUrl = "https://pharmacy2025-001-site1.ltempurl.com/"

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private postService: PostService,
    private router: Router,
    private toast: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.categoryService.getCategory().subscribe(c => {
      this.categoryList = c;
    })

    const id: any = this.activatedRoute.snapshot.paramMap.get('id')
    this.getPostById(id);
  }

  getPostById(id: number) {

    this.postService.GetPostById(id).subscribe(c => {
      this.editPostForm.patchValue({ "id": c.id });
      this.editPostForm.patchValue({ "categoryId": c.categoryId });
      this.editPostForm.patchValue({ "title": c.title });
      this.editPostForm.patchValue({ "description": c.description });
      this.editPostForm.patchValue({ "tags": c.tags });

      this.ExistingFeaturedImage = c.featuredImage;
      this.ExistingPostImage = c.image;

      this.FeaturedImage = this.imageUrl + c.featuredImage;
      this.PostImage = this.imageUrl + c.image;
    })
  }

  editPostForm = this.formBuilder.group({
    id: [0],
    categoryId: [0, Validators.required],
    title: ['', Validators.required],
    description: ['', Validators.required],
    tags: ['', Validators.required],
    featuredImage: [''],
    image: ['']
  })

  get f(): { [key: string]: AbstractControl } {
    return this.editPostForm.controls;
  }

  onSubmit(data: any) {
    this.isLoading = true;
    this.button = 'Processing';
    
    this.submitted = true;
    if (this.editPostForm.invalid) {
      return;
    } else {

      let postData: CreatePost = {
        id: data.id,
        categoryId: data.categoryId,
        title: data.title,
        description: data.description,
        featuredImage: data.featuredImage == '' ? this.ExistingFeaturedImage : this.FeaturedImage,
        image: data.image == '' ? this.ExistingPostImage :  this.PostImage,
        tags: data.tags
      }

      this.postService.UpdatePost(postData).subscribe(
        res => {
          if (res.succeed) {
            this.toast.success('SUCCESS', 'Update Success');
            this.router.navigate(['/blog/post']);
          } else {
            this.toast.error('Wrong!', res.errors[0]);
          }
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
