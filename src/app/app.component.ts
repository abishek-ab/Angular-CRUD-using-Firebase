import { Component, OnInit } from '@angular/core';
import {map} from 'rxjs/operators'
import { HttpService } from './http.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'http-firebase';
  loadedPosts = [];
  isFetching=false;
  errorMessage:string;

  constructor(private httpService:HttpService) {}

  ngOnInit() {
    this.onFetchPosts();
  }

  onCreatePost(postData) {
    this.errorMessage=null;
    this.httpService.onCreatePost(postData).subscribe(
      data=>{
        console.log(data);
        //this.onFetchPosts();
        this.loadedPosts.push(postData);
      },err=>{
        this.errorMessage=err.error.error;
      });
    
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching=true;
    this.errorMessage=null;
    this.httpService.onFetchPosts()
    .subscribe(
      (data)=>{
        // const array=[];
        //   for(let d in data){
        //     array.push({...data[d],id:d});
        //   }
        //   console.log(array);
        this.isFetching=false;
        this.loadedPosts=data;
      },err=>{
        this.errorMessage=err.error.error;
      }
    )
  }

  onClearPosts() {
    // Send Http request
    this.httpService.deleteAll().subscribe(
      data=>{
        if(data.type===HttpEventType.Response){
        console.log(data.body);
        this.onFetchPosts();
        }
      }
    )
  }
}
