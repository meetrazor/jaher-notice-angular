import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ServicesService } from 'src/app/services.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lawyer',
  templateUrl: './lawyer.component.html',
  styleUrls: ['./lawyer.component.scss']
})
export class LawyerComponent implements OnInit {

  // tslint:disable-next-line: ban-types
  @Output() sendMessage: EventEmitter<String> = new EventEmitter<String>();
  district: any;
  Category: any;
  village: any;
  uploadObject: {
    name: string,
    district: string,
    flag: string,
    contact_no: string,
    landline_no: string,
    fax: string,
    email: string,
    address: string,
    pincode: string,
    taluka: string
  };
  constructor(private service: ServicesService, private toastr: ToastrService) { }

  ngOnInit() {
    this.Category = [{ id: 1, category: 'Lawyer' }, { id: 2, category: 'Bank' },
    { id: 3, category: 'Society' }, { id: 4, category: 'Individual' }, { id: 5, category: 'Government' }];
    this.uploadObject = {
      name: '',
      district: '',
      flag: '',
      contact_no: '',
      landline_no: '',
      fax: '',
      email: '',
      address: '',
      pincode: '',
      taluka: ',',
    };
    this.service.getDistrict().subscribe(R => {
      this.district = R;
    });
  }
  onDistrictChange(value) {

  }

  submit() {

    // tslint:disable-next-line: max-line-length
    if ((this.uploadObject.name) && (this.uploadObject.district)) {
      this.service.addnewLawyer(this.uploadObject).subscribe((r) => {
        this.toastr.success(r.message, 'Success');
        console.log(r);

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
