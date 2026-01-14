import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AppError } from '../../../core/http/models/app-error';

@Component({
  selector: 'app-error-state',
  imports: [],
  templateUrl: './error-state.component.html',
  styleUrl: './error-state.component.scss'
})
export class ErrorStateComponent {
  @Input() error?: AppError;
  @Output() retry = new EventEmitter<void>();
  @Input() showRetry = true;

  get userMessage(): string {
    const e = this.error;
    if (!e) return '';

    if(e.code === 'OUT_OF_STOCK') return 'One or more items are out of stock. Please adjust quantity and try again.';

    switch (e.kind) {
      case 'Network': return 'Cannot reach the server. Check your connection and try again.';
      case 'Validation': return 'Check your input.';
      case 'NotFound': return 'Not Found.';
      case 'Unauthorized': return 'You need to log in.';
      case 'Forbidden': return 'You do not have permission to do that.';
      case 'Conflict': return 'Conflict, try again';
      case 'Server': return 'Server issues. Try again later.';
      default: return 'Something went wrong.';
    }
  }

  get fieldErrorEntries(): [string, string][] {
    const fe = this.error?.fieldErrors;
    return fe ? Object.entries(fe) : [];
  }

}
