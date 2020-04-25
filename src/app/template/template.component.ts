import { ServicesService } from './../services.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {
  data: any;
  // tslint:disable-next-line: variable-name
  image_path: string;
  PhysicalPath = 'http://qa.api.jahernotice.com/server%20folder%20path/';
  link: string;
  constructor(private dataService: ServicesService, private route: ActivatedRoute, private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Daily Notification');
    this.route.params.subscribe(params => {

      this.dataService.getAll('AAHtmlTemplateLink', +params.id)
        .subscribe((data) => {
          this.data = data[0];
          this.link = this.PhysicalPath + this.data.image_path;
          // tslint:disable-next-line: max-line-length
          // this.link = this.PhysicalPath + //'upload/notification_images/2020/03/17/SD/AHME/543e81e351b063ce6eab4ee03c780ffdbea622e0fca4257db3fdf12390719ab035d59cee35f//f762795a3b62f900a8075c14a640e003ab705db4db1f155aa77ff.jpg'
          if (this.data.notifysource) {
            this.dataService.getAll('NewspaperByName', this.data.notifysource)
              .subscribe((newspaper) => {
                this.image_path = newspaper[0]['image-path'];
              });
          }
        });

    });
  }


}
