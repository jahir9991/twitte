import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { TweetPostFacade } from './tweet-post.facade';

@Component({
  selector: 'app-tweet-post',
  templateUrl: './tweet-post.component.html',
  styleUrls: ['./tweet-post.component.scss'],
})
export class TweetPostComponent {

  validateForm!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private modelfacade: TweetPostFacade
  ) { }

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      content: ['', [Validators.required, this.checkContentLength]],
    });
  }

  checkContentLength(control) {
    const value = control.value;
    return value && value.length <= 160 ? null : { invalidContentLength: true };
  }


  onSubmit(): void {
    if (this.validateForm.invalid) return;
    this.modelfacade.tweetPost(this.validateForm.value);
    this.validateForm.reset()
  }
}
