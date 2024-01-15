// navbar.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { debounceTime } from 'rxjs/operators';
import { MovieService } from 'src/app/movie.service';
import { Carousel, Dropdown, initTE, Collapse, Ripple, PerfectScrollbar, SmoothScroll } from 'tw-elements';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  trending: any[] = [];
  recommended: any[] = [];
  autoCompleteResults: string[] = [];

  constructor(private movieService: MovieService, private http: HttpClient) {}

  ngOnInit() {
    this.loadTrending();
    this.loadRecommended();
    initTE({ Carousel, Dropdown, Collapse, Ripple, PerfectScrollbar, SmoothScroll });
  }

  onInputChange(event: any): void {
    const query = event.target.value;
    if (query.trim() !== '') {
      this.fetchAutoComplete(query);
    } else {
      this.autoCompleteResults = [];
    }
  }

  fetchAutoComplete(query: string): void {
    this.http.get<string[]>(`http://localhost:5091/search?q=${encodeURIComponent(query.trim())}`)
      .subscribe(data => {
        this.autoCompleteResults = data;
      });
  }

  loadTrending() {
    this.movieService.getTrending().subscribe((data: any) => {
      this.trending = data;
    });
  }

  loadRecommended() {
    this.movieService.getRecommended().subscribe((data: any) => {
      this.recommended = data;
    });
  }

  defaultTransform: number = 0;

  goNext(id: string): void {
    const slider: HTMLElement | null = document.getElementById(id);

    if (slider) {
      this.defaultTransform = this.defaultTransform - 398;

      if (Math.abs(this.defaultTransform) >= slider.scrollWidth / 1.7) {
        this.defaultTransform = 0;
      }

      slider.style.transform = `translateX(${this.defaultTransform}px)`;
    }
  }

  goPrev(id: string): void {
    const slider: HTMLElement | null = document.getElementById(id);

    if (slider) {
      if (Math.abs(this.defaultTransform) === 0) {
        this.defaultTransform = 0;
      } else {
        this.defaultTransform = this.defaultTransform + 398;
      }

      slider.style.transform = `translateX(${this.defaultTransform}px)`;
    }
  }
}
