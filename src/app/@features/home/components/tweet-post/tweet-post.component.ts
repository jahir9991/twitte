import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { TweetPostFacade } from './tweet-post.facade';
import { ApiStatusEnum } from 'src/app/@shared/consts/ApiStatus.enum';

@Component({
  selector: 'app-tweet-post',
  templateUrl: './tweet-post.component.html',
  styleUrls: ['./tweet-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TweetPostFacade],
})
export class TweetPostComponent {
  ApiStatusEnum = ApiStatusEnum;
  validateForm!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private modelfacade: TweetPostFacade
  ) {}

  apiStatus$ = this.modelfacade.apiStatus$;

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
    this.modelfacade.tweetPost(this.validateForm, () => {
      this.validateForm.reset();
    });
  }
}
