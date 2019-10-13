import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  onCreatePost(postData) {
    // Send Http request
    return this.http.post("https://recipe-book-14737.firebaseio.com/posts.json",postData,{
      observe:'response'
    });
  }

  onFetchPosts() {
    // Send Http request
    return this.http.get("https://recipe-book-14737.firebaseio.com/posts.json",{
      headers:new HttpHeaders({"Custom-header":"Testing header"}),
      params:new HttpParams().set("print","pretty")
    }).pipe(map(
      (response)=>{
        const resArray=[];
        for(let key in response){
          resArray.push({...response[key],'id':key});
        }
        return resArray;
      }
    ));
  }

  deleteAll(){
    return this.http.delete("https://recipe-book-14737.firebaseio.com/posts.json",{
      observe:'events'
    }).pipe(tap(
      events=>{
        if(events.type===HttpEventType.Sent){
          console.log("Request sent successfully!")
        }
        if(events.type===HttpEventType.Response){
          console.log("Got the response");
        }
      }
    ));
    
  }
}
