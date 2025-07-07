import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../service/post/post.service';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  /**
   *
   */
  postDetails: any;
  // imageUrl = "http://localhost:5276/"
  imageUrl = "https://pharmacy2025-001-site1.ltempurl.com/"
  constructor(private activatedRoute: ActivatedRoute, private postService: PostService, private title: Title) {


  }
  ngOnInit(): void {
    const id: any = this.activatedRoute.snapshot.paramMap.get('id')
    this.getPostById(id);
  }

  getPostById(id: number) {
    this.postService.GetPostById(id).subscribe(c => {
      this.postDetails = c
      this.title.setTitle(c.title)
    })
  }

}
