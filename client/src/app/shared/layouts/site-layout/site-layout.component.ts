import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MaterialService } from '../../classes/material.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements AfterViewInit {
  @ViewChild("floating",{static:false}) floatingRef: ElementRef;

  links = [
    {
      url:"/overview",
      name:"Overview"
    },
    {
      url:"/analytics",
      name:"Analytics"
    },
    {
      url:"/history",
      name:"History"
    },
    {
      url:"/order",
      name:"Adding order"
    },
    {
      url:"/categories",
      name:"Categories"
    }
  ];

  constructor(
    private auth:AuthService,
    private router:Router
  ) {

  }

  logout(event){
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(["/login"])
  }

  ngAfterViewInit(){
    MaterialService.initFloatingButton(this.floatingRef)
  }

}
