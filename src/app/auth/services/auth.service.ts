import { Injectable } from '@angular/core';
import {createClient, SupabaseClient} from '@supabase/supabase-js';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private s_client: SupabaseClient;
  constructor() {
    this.s_client = createClient(environment.apiUrl,environment.apiKey);
  }
  signUp(email:string,password:string) {
   return this.s_client.auth.signUp({email:email,password:password});
  }
  signIn(email:string,password:string) {
    return this.s_client.auth.signInWithPassword({email:email,password:password});
  }
  async getSession() {
    return await this.s_client.auth.getSession();
  }
  async signOut() {
    return await this.s_client.auth.signOut();
  }
}
