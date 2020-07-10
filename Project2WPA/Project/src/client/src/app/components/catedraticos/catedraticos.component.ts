import { Component, OnInit } from '@angular/core';
import { infoUser } from '../user/modelos';

import{TaskService} from '../../services/task.service';

import * as XLSX from 'xlsx';
const { read, write, utils } = XLSX;

type AOA = any[][];

@Component({
  selector: 'app-catedraticos',
  templateUrl: './catedraticos.component.html',
  styleUrls: ['./catedraticos.component.css']
})
export class CatedraticosComponent implements OnInit {

  fechas = new Date(); 
  infoUser:{name:string}
  cMes:number=0;

  data: AOA = [[1, 2], [3, 4]];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';

  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      console.log(this.data);
    };
    reader.readAsBinaryString(target.files[0]);
  }


  export(): void {
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

  constructor() { }

    ngOnInit(){ 
     this.infoUser = JSON.parse(localStorage.getItem('InfoUser'));
     this.fechas.setDate(this.fechas.getDate());     
  } 

}
