import { Component, Input } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { HorizontalLineComponent } from '@shared/components/atoms/horizontal-line/horizontal-line.component';


@Component({
  selector: 'app-footer-auth',
  standalone: true,
  imports: [RouterLinkWithHref, HorizontalLineComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterAuthComponent {

  @Input() routerLink:string = "";

}
