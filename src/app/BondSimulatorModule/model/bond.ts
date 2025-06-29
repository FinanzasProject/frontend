import { Schedule } from './schedule';

export interface Bond {
  id: number;
  name: string;
  issue_date: string;
  nominal_amount: number;
  interest_rate: number;
  rate_type: string; // capitalization period
  rate_period: string;
  payment_frequency: string;
  amortization_method: string;
  term: number;
  total_grace: number;
  partial_grace: number;
  initial_cost: number;
  schedule: Schedule[];
}

export type NewBond = Omit<Bond, 'id'>;
