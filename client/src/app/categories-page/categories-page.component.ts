import {
  Component,
  OnInit
} from '@angular/core';
import {
  CategoriesService
} from '../shared/services/categories.service';
import { Category } from '../shared/interfaces';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css']
})
export class CategoriesPageComponent implements OnInit {
  
  private categories: Category[] = []
  constructor(private categoriesService: CategoriesService) {}

  ngOnInit() {
    this.categoriesService.fetch()
  }

}
