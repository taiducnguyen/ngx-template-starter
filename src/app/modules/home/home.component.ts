import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { QuoteService } from './quote.service';
import { ClientState } from '@app/shared/services/client/client-state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;

  constructor(private clientState: ClientState, private quoteService: QuoteService) {}

  ngOnInit() {
    // this.isLoading = true;
    // this.quoteService
    //   .getRandomQuote({ category: 'dev' })
    //   .pipe(
    //     finalize(() => {
    //       this.isLoading = false;
    //     })
    //   )
    //   .subscribe((quote: string) => {
    //     this.quote = quote;
    //   });
  }
}
