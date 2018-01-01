import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import 'rxjs/add/operator/map';
import { EntryService } from '../../../entries/shared';

declare var $: any;

@Component({
  selector: 'add-entry-modal',
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddEntryComponent implements OnInit {

  addEntryForm: FormGroup;

  constructor(
    private fb        : FormBuilder,
    private entryService: EntryService
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  public static openAddEntryModal() {
    $('#addEntry-modal')
    .modal({
      blurring: true,
      onHidden() {
        //Resets form input fields from data value
        $('.ui.form').trigger("reset");
        $('.ui.form').form('remove fields', ['name', 'definition']);
        //Resets form error messages and field styles
        $('.ui.form .field.error').removeClass("error");
        $('.ui.form.error').removeClass("error");
        //Remove the loader to invisible
        $('#addEntry-form-loader').removeClass('active');
      }
    })
    .modal('show');
  }

  createForm() {
    this.addEntryForm = this.fb.group({
      name      : ['', Validators.required],
      definition: ['', Validators.required],
      example   : '',
      tags      : ''
    });
  }

  onSubmitEntryForm() {
    var addEntryForm = this.addEntryForm;
    var entryService = this.entryService;

    $('#addEntry-form')
      .form({
        on: 'blur',
        fields: {
          name: {
            identifier : 'name',
            rules: [
              {
                type   : 'empty',
                prompt : '请填写词条名'
              }
            ]
          },
          definition: {
            identifier : 'definition',
            rules: [
              {
                type   : 'empty',
                prompt : '请填写词条释义'
              }
            ]
          }
        },
        onSuccess(event, fields){
          // Build the tags array if there are any
          var tagsArray:Array<any>=[] //empty array which we are going to push our selected items, always define types 
          if (addEntryForm.get('tags').value) {
            let tagNameArray = addEntryForm.get('tags').value.split(" ");
            for (var i in tagNameArray) {
              var tag = {name : tagNameArray[i]};
              tagsArray.push(tag);
            }
          }
          entryService.submitEntry({
            name      : addEntryForm.get('name').value,
            definition: addEntryForm.get('definition').value,
            example   : addEntryForm.get('example').value,
            tags      : tagsArray
          });
          $('#addEntry-form-loader').addClass('active');
        },
        onFailure(formErrors, fields){
          console.log("Failure!");
        }
      })
      .form("validate form");
  }
  
}
