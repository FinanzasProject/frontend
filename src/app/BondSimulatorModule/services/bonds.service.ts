import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../auth/services/auth.service';
import { firstValueFrom } from 'rxjs';
import { Bond, NewBond } from '../model/bond';

@Injectable({
  providedIn: 'root',
})
export class BondsService {
  private readonly ENDPOINT = `${environment.apiUrl}/rest/v1/bonds`;
  private http = inject(HttpClient);
  private auth = inject(AuthService);

  async getAll(): Promise<Bond[]> {
    const { data: sessionData, error } = await this.auth.getSession();
    if (error) {
      throw new Error('Error recuperando la sesión: ' + error.message);
    }
    const token = sessionData.session?.access_token;
    if (!token) {
      throw new Error('No hay token de acceso. Inicia sesión primero.');
    }

    const headers = new HttpHeaders({
      apikey: environment.apiKey,
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    });
    const params = new HttpParams().set('select', '*');

    return firstValueFrom(
      this.http.get<Bond[]>(this.ENDPOINT, { headers, params })
    );
  }

  async createBond(bond: NewBond): Promise<Bond> {
    const { data: sessionData, error } = await this.auth.getSession();
    if (error) {
      throw new Error('Error recuperando la sesion:' + error.message);
    }
    const token = sessionData.session?.access_token;
    if (!token) {
      throw new Error('No hay token de acceso. Inicia sesión primero');
    }

    const headers = new HttpHeaders({
      apikey: environment.apiKey,
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Prefer: 'return=representation',
    });

    const inserted = await firstValueFrom(
      this.http.post<Bond[]>(this.ENDPOINT, bond, { headers })
    );
    return inserted[0];
  }
}
