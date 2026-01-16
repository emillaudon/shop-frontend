import { Component, Input } from '@angular/core';
import { Order } from '../../models/order';
import { formatOrderDate } from '../../../../shared/utils/date.utils';

@Component({
  selector: 'app-order-card',
  imports: [],
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.scss',
})
export class OrderCardComponent {
  @Input({ required: true }) order!: Order;

  isOpen = false;

  formatDate = formatOrderDate;

  toggle() {
    this.isOpen = !this.isOpen;
  }

  statusClass(status: string) {
    switch (status) {
      case 'CREATED':
        return 'status status--created';
      case 'PAID':
        return 'status status--paid';
      case 'SHIPPED':
        return 'status status--shipped';
      case 'CANCELLED':
        return 'status status--cancelled';
      default:
        return 'status status--default';
    }
  }
}
