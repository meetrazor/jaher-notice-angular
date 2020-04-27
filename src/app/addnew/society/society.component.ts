import { ToastrService } from 'ngx-toastr';
import { ServicesService } from './../../services.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-society',
  templateUrl: './society.component.html',
  styleUrls: ['./society.component.scss']
})
export class SocietyComponent implements OnInit {
  // tslint:disable-next-line: ban-types
  @Output() sendMessage: EventEmitter<String> = new EventEmitter<String>();
  district: any;
  taluka: any;
  village: any;
  uploadObject: {
    societyname: string,
    districtid: string,
    talukaid: string,
    villageid: string
  };
  constructor(private service: ServicesService, private toastr: ToastrService) { }

  ngOnInit() {
    this.uploadObject = {
      societyname: '',
      districtid: '',
      talukaid: '',
      villageid: ''
    };
    this.service.getDistrict().subscribe(R => {
      this.district = R;
    });
  }
  onDistrictChange(value) {
    this.service.getTaluka(value).subscribe(R => {
      this.taluka = R;
    });
  }
  onTalukaChange(value) {
    this.service.getVllage(value).subscribe(R => {
      this.village = R;
    });
  }
  submit() {

    // tslint:disable-next-line: max-line-length
    if ((this.uploadObject.districtid) && (this.uploadObject.societyname) && (this.uploadObject.talukaid) && (this.uploadObject.villageid)) {
      this.service.addNewSociety(this.uploadObject).subscribe((r) => {
        this.toastr.success('Society Added Successfully', 'Success');
        this.closePopUp('refresh');
      });
    } else {
      this.toastr.error('All (*) mark fileds are mandatory', 'Error');
    }
  }
  closePopUp(status) {
    this.sendMessage.emit(status);
  }
}
