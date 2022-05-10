import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getProgress$() {
    return this.http.get(`/api/progress/track`).pipe(
      map((response: any) => {
        const s = response.data.progressHistory;
        return s;
      })
    );
  }
}
