import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'custom-button',
  template: `
    <button
      class="btn"
      (click)="onClick()"
      [style.background-color]="state ? '#4CAF50' : '#f44336'"
    >
      {{ state ? onText : offText }}
    </button>
  `,
  styles: [
    `
      .btn {
        border: none;
        border-radius: 4px;
        color: white;
        letter-spacing: 1px;
        padding: 10px 19px;
        cursor: pointer;
        outline: none;
        font-size: 20px;
      }
    `
  ]
})
export class CustomButtonComponent implements OnInit {
  @Input() state: boolean | undefined;
  @Input() onText: string | undefined;
  @Input() offText: string | undefined;
  @Input() config: CustomButtonConfig | undefined;
  @Output() onStateChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit() {
    if (this.config) {
      this.state = this.config.state;
      this.onText = this.config.onText;
      this.offText = this.config.offText;
    }
  }

  onClick(): void {
    this.state = !this.state;
    this.onStateChange.emit(this.state);
  }
}

export interface CustomButtonConfig {
  state?: boolean;
  onText?: string;
  offText?: string;
}
