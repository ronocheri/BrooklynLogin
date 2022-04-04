import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IUser } from '../interfaces/user';
import { CanActivate, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AppComponent } from '../app.component';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService{

  private loggedIn = new BehaviorSubject<boolean>(false); // {1}
  // private loggedIn = new BehaviorSubject<boolean>(false); // {1}

  private contactsList= [] 
  constructor(private http:HttpClient, private router:Router) {
   }
   
//users
  getUserDetails(userName:string,password:string)
  {
      console.log("getUserDetails: "+userName+", "+password)

      let url:string='https://localhost:44361/api/User/isExist' 

      let httpOptions:Object = {
        
        headers: new HttpHeaders().set('Content-Type','application/json; charset=utf-8'),
       
        //params: params,
        responseType: 'text',
      }

      let inputdata:any={'userName':userName,
      'password':password

      }
      
      if(userName=="" || password=="")
      {
        Swal.fire('Please fill in all fields!');
        return;
      }
      return this.http.post<any>(url,inputdata, httpOptions).subscribe(data=>{
      if(data){
        console.log(data)
        if(data=="Success")
        {
          this.getUserContacts()
          //re direct to main page
          this.loggedIn.next(true);
          this.router.navigateByUrl('home')

        }
        else{
          Swal.fire({icon: 'error',text:"User isn't registered!"});
        }
      }
      else{
        Swal.fire({icon: 'error',text:"Service's call failed"});
      }
    },error => {Swal.fire({icon: 'error',text:"Something went wrong..."});})
  }

  registerUser(userName:string,password:string)
  {
      console.log("getUserDetails: "+userName+", "+password)

      let url:string='https://localhost:44361/api/User/CreateUser' 

      
      let httpOptions:Object = {
        
        headers: new HttpHeaders().set('Content-Type','application/json; charset=utf-8'),
        // params: params,
        responseType: 'text',
      }

      let inputdata:any={'userName':userName,
      'password':password

      }
      
      if(userName=="" || password=="")
      {
        Swal.fire('Please fill in all fields!');
        return;
      }
      
      return this.http.post<any>(url,inputdata, httpOptions).subscribe(data=>{
        
      if(data){
        console.log(data)
        if(data=="Success")
        {
          Swal.fire('Registration completed successfully !','The user is now registered!', "success");

        }
        else{
          Swal.fire({icon: 'error',text:"Registration failed!"});
        }
      }
      else{
        Swal.fire({icon: 'error',text:"Service's call failed"});
      }
    },
    error => {Swal.fire({icon: 'error',text:"User is already exists"});})
  }

  //contacts
  getUserContacts(): Promise<any>{

    let url:string='https://localhost:44361/api/contact/getContacts' 
    return this.http.get(url).toPromise();
}

  // getUserContacts()
  // {
  //     let url:string='https://localhost:44361/api/contact/getContacts' 
      
  //     return this.http.get<any>(url).subscribe(data=>{
  //     if(data){
  //       console.log("data getUserContacts:")
  //       if(data)
  //       {
  //         this.contactsList=data;
  //         console.log(this.contactsList)

  //       }
  //       else{

  //         console.log("There are no contacts!")
  //         //Swal.fire({icon: 'error',text:"There are no contacts!"});
  //       }
  //     }
  //     else{
  //       console.log("Contacts' Service failed!")
  //       //Swal.fire({icon: 'error',text:"Service's call failed"});
  //     }
  //   },error => { console.log("Something went wrong...")})
  // }

  // getUserContacts():Observable<IContact[]>
  // {

  //     let url:string='https://localhost:44361/api/contact/getContacts' 
      
  //     return this.http.get<IContact[]>(url)
  // }

  // getContactsList() {
  //   return this.contactsList; 

  // //   return Observable.create((observer: Subscriber<any>) => {
  // //     observer.next(this.contactsList);
  // //     observer.complete();
  // // });
  //   }

  //loging in & out
  get isLoggedIn() {
    return this.loggedIn.asObservable(); 
    }

  logout() { 
      this.loggedIn.next(false);
      this.redirectTo('login');
      }

  redirectTo(pageName:string){
    this.router.navigateByUrl('/'+pageName)
  }

}
