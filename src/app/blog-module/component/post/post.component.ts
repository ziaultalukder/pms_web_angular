import { Component, OnInit } from '@angular/core';
import { PostService } from '../../service/post/post.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit{
  
  /**
   *
   */


  postList: any
  //imageUrl = "http://localhost:5276/"
  imageUrl = "https://pharmacy2025-001-site1.ltempurl.com/"
  constructor(private postService: PostService, private route: Router, private title: Title) {
    
  }
  ngOnInit(): void {
    this.postService.GetPost().subscribe(c=> {
      this.postList = c
    })
    this.title.setTitle('Pharmacy Management System')
  }

  productDetails(data: any){
    this.route.navigate(["blog/details/"+data.id+"/"+data.seoTitle])
  }

  editPost(data: any){
    this.route.navigate(["blog/edit-post/"+data.id])
  }
}
