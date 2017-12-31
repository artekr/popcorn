import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

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
    private fb : FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  public static openAddEntryModal() {
    $('.tiny.modal')
    .modal({
      blurring: true,
      onHidden() {
        //Resets form input fields from data value
        $('.ui.form').trigger("reset");
        $('.ui.form').form('remove fields', ['entry_name', 'entry_definition']);
        //Resets form error messages and field styles
        $('.ui.form .field.error').removeClass("error");
        $('.ui.form.error').removeClass("error");
      }
    })
    .modal('show');
  }

  createForm() {
    this.addEntryForm = this.fb.group({
      entry_name      : ['', Validators.required],
      entry_definition: ['', Validators.required],
      entry_example   : [''],
      entry_tags      : ['']
    });
  }

  onSubmitEntryForm() {
    var form = this.addEntryForm;
    $('.ui.form')
      .form({
        on: 'blur',
        fields: {
          entry_name: {
            identifier : 'entry_name',
            rules: [
              {
                type   : 'empty',
                prompt : '请填写词条名'
              }
            ]
          },
          entry_definition: {
            identifier : 'entry_definition',
            rules: [
              {
                type   : 'empty',
                prompt : '请填写词条释义'
              }
            ]
          }
        },
        onSuccess(event, fields){
          if (!form.get('entry_example').value || !form.get('entry_tags').value) {
            console.log("entry_example or entry_tags are empty");
          } else {
            console.log("Success!");
          }
        },
        onFailure(formErrors, fields){
          console.log("Failure!");
        }
      })
      .form("validate form");
  }
  
}
