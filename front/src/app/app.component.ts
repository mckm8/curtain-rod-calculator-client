import {Component, ViewChild} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {LoaderService} from "./services/loader-service.service";
import {ActivatedRoute} from "@angular/router";
import {AppConfigService} from "./services/app-config.service";
import {RestService} from "./services/rest.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity: 0}),
        animate(1000, style({opacity: 1}))
      ]),
      transition(':leave', [
        animate(1000, style({opacity: 0}))
      ])
    ])
  ]
})
export class AppComponent {
  screenWidth = window.innerWidth;

  loading: boolean;
  loadingMessage: string;

  @ViewChild('sidenav') sidenav;

  constructor(private loaderService: LoaderService,
              private route: ActivatedRoute,
              private appConfig: AppConfigService,
              private restService: RestService
  ) {
    this.loaderService.getLoaderStatus().subscribe((status: boolean) => {
      this.loading = status;
    });
    this.loaderService.getLoaderMessage().subscribe((message: string) => {
      this.loadingMessage = message;
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(p => {
      if (p['id']){
        console.log(p['id']);
        this.restService.findParamsByAddressId(p['id']).subscribe(value => {
          this.appConfig.pricePerElement = (<any>value).pricePerElement;
          this.appConfig.allegroUrl = (<any>value).redirectUrl;
        })
      } else {
        if (p['szt']) {
          this.appConfig.pricePerElement = p['szt'];
        } else {
          this.appConfig.pricePerElement = 4;
        }
        if (p['aukcja']) {
          this.appConfig.allegroUrl = p['aukcja'];
        } else {
          this.appConfig.allegroUrl = 'https://allegro.pl/uzytkownik/profi-styl-pl';
        }
      }
    })

  }

}
