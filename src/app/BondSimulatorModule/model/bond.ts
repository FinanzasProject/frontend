import {Schedule} from './schedule';

export class Bond {
  id!: number;
  user_id!: number;
  name!: string;
  issue_date!: string;
  nominal_amount!: number;
  interest_rate!: number;
  rate_type!: 'nominal' | 'efectiva';
  rate_period!: string;
  payment_frequency!: string;
  term!: number;
  total_grace!: number;
  partial_grace!: number;
  initial_cost!: number;
  schedule!: Schedule[];
}
