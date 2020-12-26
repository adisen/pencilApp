import { Component, OnInit } from '@angular/core';
import * as MediumEditor from 'medium-editor';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  value = '';
  constructor() {}

  ngOnInit(): void {
    let editor = new MediumEditor('.editable', {
      toolbar: {
        /* These are the default options for the toolbar,
           if nothing is passed this is what is used */
        allowMultiParagraphSelection: true,
        buttons: ['bold', 'italic', 'underline', 'anchor', 'h2', 'h3', 'quote'],
        diffLeft: 0,
        diffTop: -10,
        firstButtonClass: 'medium-editor-button-first',
        lastButtonClass: 'medium-editor-button-last',
        standardizeSelectionStart: false,
        static: false,
        /* options which only apply when static is true */
        align: 'center',
        sticky: false,
        updateOnEmptySelection: false,
      },
      placeholder: {
        /* This example includes the default options for placeholder,
           if nothing is passed this is what it used */
        text: 'Type your text',
        hideOnClick: true,
      },
    });
  }

  submit() {
    console.log('Submitted', this.value);
  }

  log(event) {
    this.value = event.target.innerHTML;
    console.log(event.target.innerHTML);
  }
}
