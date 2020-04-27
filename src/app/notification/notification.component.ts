import { ToastrService } from 'ngx-toastr';
import { async } from '@angular/core/testing';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { DialogAction, DialogService, DialogRef, DialogCloseResult } from '@progress/kendo-angular-dialog';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, AfterViewInit {

  constructor(private datepipe: DatePipe, private dialogService: DialogService,
    private service: ServicesService, private toastr: ToastrService) { }
  @ViewChild(DataTableDirective, { static: true })
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  image: string;
  opened: boolean;
  delete: any;
  edit: boolean;
  id: any;
  status: any;
  ngOnInit() {
    this.dtOptions = {
      ajax: { url: `http://qa.api.jahernotice.com/api2/NornalNotice`, dataSrc: '' }, responsive: true,
      columns: [
        {
          title: 'Publish Date', data: 'publish_date', render: (data) => {
            return this.datepipe.transform(data, 'dd-MM-yyyy');
          }
        }, {
          title: 'Notification Date', data: 'notification_date', render: (data) => {
            return this.datepipe.transform(data, 'dd-MM-yyyy');
          }
        }, {
          title: 'District', data: 'district'
        }, {
          title: 'Taluka', data: 'taluka'
        }, {
          title: 'Village', data: 'village'
        }, {
          title: 'Survey', data: 'survey'
        }, {
          title: 'T P NO', data: 'tpno'
        }, {
          title: 'F P NO', data: 'fpno'
        }, {
          title: 'Notify By', data: 'notifyby'
        }, {
          title: 'Society', data: 'society'
        }, {
          title: 'Client Name', data: 'client_names'
        }, {
          title: 'Type', data: 'notice_type'
        }, {
          title: 'Image', data: 'image_path'
        }, {
          title: 'Action', data: null
        }
      ],

      rowCallback(row, data: any) {

        let deleteBtn = '';
        deleteBtn += '<a class="btn btn-danger deleteNotice" title="Delete Notice" notice-id="' + data.content_temp_id + '">';
        deleteBtn += '<i class="fa fa-trash" aria-hidden="true" notice-id="' + data.content_temp_id + '"></i>';
        deleteBtn += '</a>';

        let viewBtn = '<a class="btn btn-success editNotice" title="Edit Notice" notice-id="' + data.content_temp_id + '">';
        viewBtn += '<i class="fa fa-edit" aria-hidden="false" notice-id="' + data.content_temp_id + '"></i></a>';
        // tslint:disable-next-line: max-line-length
        let image = '<div class="text-center"><img class="img-thumbnail image" src="http://qa.api.jahernotice.com/server%20folder%20path/';
        image += data.image_path;
        image += '"style="max-height: 100px; max-width: 50px;"/></div>';

        // tslint:disable-next-line: max-line-length
        let acceptBtn = '<a style="background-color: green" title="Approve Notice"  class="btn btn-primary acceptNotice" notice-id="' + data.content_temp_id + '">';
        acceptBtn += '<i class="fa fa-check" aria-hidden="true" notice-id="' + data.content_temp_id + '"></i></a>';

        $('td:eq(12)', row).html(image);
        $('td:eq(13)', row).html(acceptBtn + viewBtn + deleteBtn);
      },
      drawCallback: () => {
        $('.image').on('click', (e) => {
          this.onClickImage($(e.target).attr('src'));
        });
        $('.acceptNotice').on('click', (e) => {
          this.showApproveConfirmation($(e.target).attr('notice-id'));
        });
        $('.deleteNotice').on('click', (e) => {
          this.showDeleteConfirmation($(e.target).attr('notice-id'));
        });
        $('.editNotice').on('click', (e) => {
          this.onClickEdit($(e.target).attr('notice-id'));
        });
      }
    };
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  onClickImage(src) {
    this.image = src;
    this.open();
  }

  onClickEdit(id) {
    this.id = id;
    this.edit = true;
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }
  close(status) {
    this.opened = false;
  }
  open() {
    this.opened = true;
  }

  editclose(status) {
    this.edit = false;
    if (status === 'refresh') {
      this.rerender();
    }

  }

  showDeleteConfirmation(id) {
    const dialog: DialogRef = this.dialogService.open({
      title: 'Delete Notice',
      content: 'Are you sure you want to Delete?',
      actions: [
        { text: 'No' },
        { text: 'Yes', primary: true }
      ],
      width: 450,
      height: 200,
      minWidth: 250
    });

    dialog.result.subscribe((result) => {
      if (result instanceof DialogCloseResult) {
        return false;
      } else {
        if (result.text === 'Yes') {
          this.service.deleteNormalNotice(id).subscribe(() => {
            this.toastr.success('', 'Success');
            this.rerender();
          });
        } else {
          return false;
        }
      }
    });
  }

  showApproveConfirmation(id) {
    const dialog: DialogRef = this.dialogService.open({
      title: 'Approve Notice',
      content: 'Are you sure ?',
      actions: [
        { text: 'No' },
        { text: 'Yes', primary: true }
      ],
      width: 450,
      height: 200,
      minWidth: 250
    });

    dialog.result.subscribe((result) => {
      if (result instanceof DialogCloseResult) {
        return false;
      } else {
        if (result.text === 'Yes') {
          this.service.approvedNornalNotice(id).subscribe((r) => {
            this.toastr.success('', 'Success');
            this.rerender();
          });
        } else {
          return false;
        }
      }
    });
  }
}
