import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

const httpFileUploadOptions = {
  headers: new HttpHeaders()
};

const apiUrl = 'http://qa.api.jahernotice.com/api2';
const district = `${apiUrl}/District`;
const taluka = `${apiUrl}/Taluka/`;
const village = `${apiUrl}/Village/`;
const societyAppartment = `${apiUrl}/Society/`;
const newspaper = `${apiUrl}/Newspaper/`;
const lawyer = `${apiUrl}/LawyerByLawyerName/`;
const type = `${apiUrl}/NoticeType`;
const upload = `${apiUrl}/NornalNotice `;
const baseurl = `	http://qa.api.jahernotice.com/`;


@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }

  getDistrict() {
    return this.http.get(district, httpOptions);
  }

  getTaluka(District) {
    return this.http.get(taluka + District, httpOptions);
  }

  getVllage(Taluka) {
    return this.http.get(village + Taluka, httpOptions);
  }

  getSocietyAppartment(Village) {
    return this.http.get(societyAppartment + Village, httpOptions);
  }

  getNewsPaper() {
    return this.http.get(newspaper, httpOptions);
  }
  getLawyer(key) {
    return this.http.get(lawyer + key, httpOptions);
  }

  getNoticeType() {
    return this.http.get(type, httpOptions);
  }
  uploadNotice(data): any {
    const formData: FormData = new FormData();
    formData.append('srno', data.srno);
    formData.append('publish_date', data.publish_date);
    formData.append('notification_date', data.notification_date);
    formData.append('district', data.district);
    formData.append('taluka', data.taluka);
    formData.append('village', data.village);
    formData.append('survey', data.survey_block_no);
    formData.append('fpno', data.fp_no);
    formData.append('tpno', data.tp_no);
    formData.append('society', data.society_appartment);
    formData.append('buildingno', data.building_plot);
    formData.append('notifysource', data.notification_source);
    formData.append('notifyby', data.notification_by);
    formData.append('client_names', data.client_name);
    formData.append('notice_type', data.notice_type);
    formData.append('original_image_path', data.image_path);
    formData.append('Image', data.image, data.image.name);
    return this.http.post(upload, formData, httpFileUploadOptions);
  }
  getAll(url, id): any {
    return this.http.get(`${baseurl}api2/${url}/${id}`);
  }
}

