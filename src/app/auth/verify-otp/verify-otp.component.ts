import { Component, QueryList, ViewChildren, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-verify-otp',
  standalone: true,
  imports: [FormsModule, NgFor, RouterLink],
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss']
})
export class VerifyOtpComponent {
  otp: string[] = ['', '', '', '', '', ''];
  otpFields = Array(6).fill(0);

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

  onInputChange(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // Only allow digits
    if (!/^\d$/.test(value)) {
      input.value = '';
      this.otp[index] = '';
      return;
    }

    if (value && index < this.otp.length - 1) {
      this.otpInputs.toArray()[index + 1].nativeElement.focus();
    }
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    const input = event.target as HTMLInputElement;

    if (event.key === 'Backspace') {
      if (input.value === '' && index > 0) {
        this.otpInputs.toArray()[index - 1].nativeElement.focus();
      } else {
        this.otp[index] = '';
      }
    }
  }

  onSubmit() {
    const otpCode = this.otp.join('');
    console.log('Entered OTP:', otpCode);
    // Add OTP verification logic here
  }
}
