import { Component } from '@angular/core';
import { BaserowService } from '../../services/baserow/baserow.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  constructor(private baserowService: BaserowService) {}

  email = '';
  color = '';

  required = false;
  wrongResponse = false;
  validated = false;

  isMobile = false;

  ngOnInit() {
    this.isMobile = window.innerWidth < 380;
    this.baserowService.getSettings().then((settings) => {
      this.email = settings.length > 0 ? settings[0].Email : '';
    });
  }

  showEmail() {
    this.required = false;
    this.wrongResponse = false;

    if (this.color === '') this.required = true;
    else if (this.color.toLowerCase().trim() !== 'bleu')
      this.wrongResponse = true;
    else this.validated = true;
  }
}
