export class Bond {
  id!: number;
  user_id!: number;
  name!: string;
  nominal_amount!: number;
  interest_rate!: number;
  rate_type!: string;
  payment_frequency!: number;
  amortization_method!: string;
  term!: number;
  total_grace!: number;
  partial_grace!: number;
  initial_cost!: number;
  issue_date!: string;
}
