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

  constructor(
    private datepipe: DatePipe, private dialogService: DialogService,
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
          title: 'Sr No.', data: 'row', render: (data, type, row, meta) => {
            return meta.row + 1;
          }, className: 'col'
        },
        {
          title: 'Publish Date', data: 'publish_date', render: (data) => {
            return this.datepipe.transform(data, 'dd-MM-yyyy');
          }, className: 'col'
        }, {
          title: 'Notification Date', data: 'notification_date', render: (data) => {
            return this.datepipe.transform(data, 'dd-MM-yyyy');
          }, className: 'col'
        }, {
          title: 'District', data: 'district', className: 'col'
        }, {
          title: 'Taluka', data: 'taluka', className: 'col'
        }, {
          title: 'Village', data: 'village', className: 'col'
        }, {
          title: 'Survey No /Block No', data: 'survey', className: 'col'
        }, {
          title: 'T P NO', data: 'tpno', className: 'col'
        }, {
          title: 'F P NO', data: 'fpno', className: 'col'
        }, {
          title: 'Notify By', data: 'notifyby', className: 'col'
        }, {
          title: 'Society/ Appartment', data: 'society', className: 'col'
        }, {
          title: 'Client Name', data: 'client_names', className: 'col'
        }, {
          title: 'Notice Type', data: 'notice_type', className: 'col'
        }, {
          title: 'Image', data: 'image_path', className: 'col'
        }, {
          title: 'Action', data: null, className: 'col'
        }
      ], autoWidth: false,
      order: [[0, 'asc'], [1, 'asc']],
      columnDefs: [{ width: '5%', targets: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] }],


      rowCallback(row, data: any) {

        let deleteBtn = '';
        deleteBtn += '<a class="btn btn-danger deleteNotice m-1" title="Delete Notice" notice-id="' + data.content_temp_id + '">';
        deleteBtn += '<i class="fa fa-trash" aria-hidden="false" notice-id="' + data.content_temp_id + '"></i>';
        deleteBtn += '</a>';

        let viewBtn = '<a class="btn btn-success editNotice m-1" title="Edit Notice" notice-id="' + data.content_temp_id + '">';
        viewBtn += '<i class="fa fa-edit" aria-hidden="false" notice-id="' + data.content_temp_id + '"></i></a>';
        // tslint:disable-next-line: max-line-length
        let image = '<img class="image" src="http://qa.api.jahernotice.com/server%20folder%20path/';
        image += data.image_path;
        image += '" height="100" width="50"/>';

        // tslint:disable-next-line: max-line-length
        let acceptBtn = '<a style="background-color: green" title="Approve Notice"  class=" btn btn-primary m-1 acceptNotice" notice-id="' + data.content_temp_id + '">';
        acceptBtn += '<i class="fa fa-check" aria-hidden="true" notice-id="' + data.content_temp_id + '"></i></a>';

        $('td:eq(13)', row).html(image);
        $('td:eq(14)', row).html(acceptBtn + viewBtn + deleteBtn);
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
