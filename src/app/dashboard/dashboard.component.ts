import { Component, OnInit } from '@angular/core';
import * as MediumEditor from 'medium-editor';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import { Note } from '../../models/note.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  note: any = '';
  uid: any = '';

  noteRef: any;
  editor: any;

  constructor(
    private authService: AuthService,
    private db: AngularFireDatabase,
    private firestore: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.editor = new MediumEditor('.editable', {
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
    this.uid = JSON.parse(localStorage.getItem('user')).uid;
    this.fetchNote(this.uid);
  }

  createNote(data: Note) {
    this.firestore.collection('notes').doc(this.uid).set(data);
  }

  fetchNote(uid: string) {
    this.firestore
      .collection('notes')
      .doc(uid)
      .get()
      .subscribe((doc) => {
        if (doc.exists) {
          console.log(doc.data());
          this.noteRef = doc.data();
          this.editor.setContent(this.noteRef.note);
        }
      });
  }

  updateNote(event: any) {
    this.note = event.target.innerHTML;
    if (this.noteRef) {
      // Update with value
      this.firestore.collection('notes').doc(this.uid).update({
        note: this.note,
      });
    } else {
      // Create New Note
      this.createNote({ userId: this.uid, note: this.note });
    }
  }
}
