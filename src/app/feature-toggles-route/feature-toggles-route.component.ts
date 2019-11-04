import { Component, OnInit } from '@angular/core';
import { FeatureToggleService, IFeatureToggle } from '../core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-feature-toggles-route',
  templateUrl: './feature-toggles-route.component.html',
  styleUrls: ['./feature-toggles-route.component.scss'],
})
export class FeatureTogglesRouteComponent implements OnInit {
  public date: number = new Date().getTime();

  public displayedColumns: Array<string> = screen.width > 768 ? ['name', 'tags'] : ['name'];

  public searchText: string = '';

  public ENVIRONMENT = environment;

  public featureToggles: Array<IFeatureToggle> = null;
  public featureTogglesFull: Array<IFeatureToggle> = null;

  constructor(protected featureToggleService: FeatureToggleService) { }

  public ngOnInit(): void {
    this.featureToggleService.findAll(true).subscribe((x) => {
      this.featureTogglesFull = x;
      this.featureToggles = [...this.featureTogglesFull];
    });
  }

  public searchToggles(): void {
    //TODO: Extend to API for search 
    if (this.searchText) {
      this.featureToggles = this.featureTogglesFull.
        filter(x =>
          x.name.toLowerCase()
            .includes(this.searchText.toLowerCase()));
    } else {
      this.featureToggles = [...this.featureTogglesFull]
    }
  }
}
