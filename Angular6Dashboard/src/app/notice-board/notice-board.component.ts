import { Component, OnInit } from '@angular/core';
import {NoticeBoard} from '../models/NoticeBoard.model';
import {NoticeBoardService} from '../services/notice-board.service';
import * as html2canvas from 'html2canvas';
import * as $ from 'jquery';
import { saveAs } from 'file-saver/FileSaver';
import {Index} from '../models/Index.model';
import {IndexService} from '../services/index.service';

@Component({
  selector: 'app-notice-board',
  templateUrl: './notice-board.component.html',
  styleUrls: ['./notice-board.component.scss']
})
export class NoticeBoardComponent implements OnInit {

  title: string;
  date: string;
  description: string;
  noticeBoard = new NoticeBoard();
  indexList: Index[] = [];
    indexList1: Index[] = [];
    indexList2: Index[] = [];
    indexList3: Index[] = [];
  numberList = [ 1, 2, 3];
  constructor(private noticeBoardService: NoticeBoardService,
              private indexService: IndexService) { this.loadScripts(); }
    loadScripts() {
        const dynamicScripts = [
            'https://platform.twitter.com/widgets.js',
            'http://www.shieldui.com/shared/components/latest/js/shieldui-all.min.js',
            'http://www.shieldui.com/shared/components/latest/js/jszip.min.js',
            'assets/js/jquery-3.0.0.min.js',
            'assets/js/main.js',
            'assets/js/modernizr.js',
            'assets/js/pdf.js'
        ];
        for (let i = 0; i < dynamicScripts.length; i++) {
            const node = document.createElement('script');
            node.src = dynamicScripts[i];
            node.type = 'text/javascript';
            node.async = false;
            node.charset = 'utf-8';
            document.getElementsByTagName('head')[0].appendChild(node);
        }
    }
  ngOnInit() {
      this.indexService.getListOfIndex()
          .subscribe(
              (indexList: Index[]) => {
                  this.indexList = indexList;
                  console.log('this is the index list');
                  console.log(this.indexList);
                  let i = 0;
                  for (const list of this.indexList) {
                      i++;
                      if ( 1 <= i && i <= 3) {
                          this.indexList1.push(list);
                      }
                      if ( 4 <= i && i <= 6) {
                          this.indexList2.push(list);
                      }
                      if ( 7 <= i && i <= 10) {
                          this.indexList3.push(list);
                      }
                  }
                  console.log(this.indexList1);
                  console.log(this.indexList2);
              },
              (error) => console.log(error)
          );
  }
    pdfDownload() {
        /*html2canvas($('#modalContactForm')).then(function (canvas) {
            const imgData = canvas.toDataURL('image/png');
            $('#box1').append(canvas);
        });*/
        html2canvas($('divdiv#text'), {
            onrendered: function(canvas) {
                canvas.toBlob(function(blob) {
                    saveAs(blob, 'Dashboard.png');
                });
            }
        });
    }

  saveNotice() {
    console.log(this.title);
    console.log(this.date);
    console.log(this.description);
    this.noticeBoard.title = this.title;
    this.noticeBoard.date = this.date;
    this.noticeBoard.description = this.description;
    this.noticeBoardService.save(this.noticeBoard)
          .subscribe(
              (response) => {
                  console.log(response);
              },
              (error) => console.log(error)
          );
  }
}
