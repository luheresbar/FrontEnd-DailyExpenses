import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'FrontEnd-DailyExpenses';

  constructor(
    private usersService: UserService,

    ) {}

  ngOnInit() {
    this.usersService.getProfile()
    .subscribe(res => {
      console.log(res);
    });

  }


}
