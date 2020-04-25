import { ServicesService } from './../services.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  loading: boolean;
  imageGallery = [];
  URLs = [];
  District: any;
  index = 0;
  @ViewChild('selectedImages', { static: false }) selectedImages: ElementRef;
  taluka: any;
  village: any;
  societyAppartment: any;
  newsPapers: any;
  keyword = 'name';
  lawyers: any;
  noticeTypes: any;
  anotherNotice: any;
  imageNumber: number;
  uploadObject: {
    srno: number,
    publish_date: string,
    notification_date: string,
    district: string,
    taluka: string,
    village: string,
    tp_no: string,
    fp_no: string,
    society_appartment: string,
    building_plot: string,
    notification_source: string,
    notification_by: string,
    client_name: string,
    notice_type: string,
    image: any,
    survey_block_no: string,
    image_path,
  };
  district2: string;
  taluka2: string;
  village2: string;
  source2: string;
  by2: string;
  law2: string;
  constructor(private service: ServicesService, private toastr: ToastrService) { }

  ngOnInit() {
    this.reset();
    this.getDistrict();
    this.imageNumber = 1;
  }
  imageNumberChange() {
    if (this.imageNumber > this.URLs.length) {
      this.toastr.error('image Number is Greater then Total Images', 'Total ' + this.URLs.length + ' images');
    } else {
      this.index = this.imageNumber - 1;
    }
  }
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        const file = event.target.files[i];
        const mimeType = file.type;
        if (mimeType.match(/image\/*/) == null) {
          break;
        } else {
          this.imageGallery.push(event.target.files[i]);
          // this.URLs.push(file);
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            this.URLs.push(reader.result);
          };
        }
      }
    }
  }
  next() {
    this.index++;
    this.imageNumber = this.index + 1;
    // this.URLs.shift();
    // // this.selectedImages.nativeElement.value = '';
    // this.imageGallery.shift();
  }
  privious() {
    this.index--;
    this.imageNumber = this.index + 1;
  }

  getDistrict() {
    this.service.getDistrict().subscribe(response => {
      this.District = response;
    });
    this.service.getNewsPaper().subscribe(newsPaper => {
      this.newsPapers = newsPaper;
    });
    this.service.getNoticeType().subscribe(types => {
      this.noticeTypes = types;
    });
  }
  selectDistrict(District) {
    District = JSON.parse(District);
    this.service.getTaluka(District.id).subscribe(taluka => {
      this.taluka = taluka;
    });
    this.uploadObject.district = District.districtname;
    this.taluka2 = '';
    this.village2 = '';
    this.uploadObject.taluka = '';
    this.uploadObject.village = '';
    this.uploadObject.society_appartment = '';
  }
  selectTaluka(taluka) {
    taluka = JSON.parse(taluka);
    this.service.getVllage(taluka.id).subscribe(village => {
      this.village = village;
    });
    this.uploadObject.taluka = taluka.blockname;
    this.village2 = '';
    this.uploadObject.village = '';
    this.uploadObject.society_appartment = '';

  }

  selectVillage(village) {
    village = JSON.parse(village);
    this.service.getSocietyAppartment(village.id).subscribe(socApp => {
      this.societyAppartment = socApp;
    });
    this.uploadObject.village = village.villagename;
    this.uploadObject.society_appartment = '';

  }
  onChangeSearch(event) {
    if (event) {
      this.service.getLawyer(event).subscribe(lawyers => {
        this.lawyers = lawyers;
      });
    }
  }
  removeImages() {
    this.URLs = [];
    this.imageGallery = [];
    this.index = 0;
    this.imageNumber = 1;
  }
  selectEvent(event) {
    this.uploadObject.notification_by = event.name;
  }
  noticeSelect(value) {
    this.uploadObject.notice_type = value;
  }
  sourceSelect(value) {
    if (value) {
      value = JSON.parse(value);
      this.uploadObject.notification_source = value.papername;
      // tslint:disable-next-line: max-line-length
      this.uploadObject.image_path = new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate() + '/' + value.shortcode;
    }
  }

  reset() {
    this.getDistrict();
    this.uploadObject = {
      srno: null,
      publish_date: '',
      notification_date: '',
      district: '',
      taluka: '',
      village: '',
      tp_no: '',
      fp_no: '',
      society_appartment: '',
      building_plot: '',
      notification_source: '',
      notification_by: '',
      client_name: '',
      notice_type: null,
      image: '',
      survey_block_no: '',
      image_path: '',
    };
    this.district2 = '';
    this.taluka2 = '';
    this.by2 = '';
    this.village2 = '';
    this.source2 = '';
    this.law2 = '';
  }
  upload() {
    this.uploadObject.image = this.imageGallery[this.index];

    // tslint:disable-next-line: max-line-length
    if ((this.uploadObject.image) && (this.uploadObject.client_name !== '') && (this.uploadObject.district !== '') && (this.uploadObject.image_path !== '') && (this.uploadObject.notice_type !== '') && (this.uploadObject.notification_by !== '') && (this.uploadObject.notification_date !== '') && (this.uploadObject.notification_source !== '') && (this.uploadObject.publish_date !== '') && (this.uploadObject.society_appartment !== '') && (this.uploadObject.taluka !== '') && (this.uploadObject.village !== '')) {
      this.service.uploadNotice(this.uploadObject).subscribe(Response => {
        if (Response.message === 'Data successfully saved') {
          this.toastr.success(Response.message, 'Success');
          this.reset();
          if (!this.anotherNotice) {
            this.next();
          }
        } else {
          this.toastr.error('Somethings Wrong', 'Error');
        }
      });
    } else {
      this.toastr.error('All (*) mark fileds are mandatory', 'Error');
    }

  }
}


