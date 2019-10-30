import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-feature-toggle-dialog',
  templateUrl: './create-feature-toggle-dialog.component.html',
  styleUrls: ['./create-feature-toggle-dialog.component.scss'],
})
export class CreateFeatureToggleDialogComponent implements OnInit {
  public formGroup: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
  });

  constructor(protected dialogRef: MatDialogRef<CreateFeatureToggleDialogComponent>) {}

  public ngOnInit(): void {}

  public onClickClose(): void {
    this.dialogRef.close();
  }

  public onClickCreate(): void {
    this.dialogRef.close({
      archived: false,
      createdAt: new Date().getTime(),
      environments: [
        ['development', 'Development'],
        ['quality-assurance', 'Quality Assurance'],
        ['user-acceptance-testing', 'User Acceptance Testing'],
        ['staging', 'Staging'],
        ['production', 'Production'],
      ].map((x) => {
        return {
          consumers: [],
          enabled: false,
          enabledForAll: false,
          key: x[0].toLowerCase(),
          name: x[1],
        };
      }),
      key: this.toSlug(this.formGroup.get('name').value),
      name: this.formGroup.get('name').value,
      updatedAt: new Date().getTime(),
      user: null,
    });
  }

  public toSlug(str: string): string {
    if (!str) {
      return str;
    }

    return str
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  }
}
