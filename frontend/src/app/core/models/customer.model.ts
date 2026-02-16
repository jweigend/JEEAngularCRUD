import { DiscountCode } from './discount-code.model';
import { MicroMarket } from './micro-market.model';

// TypeScript interface mirroring the Java Customer entity.
// All fields are optional (?) because: (1) when creating a new customer, customerId is not yet set,
// and (2) JSON-B may omit null fields from the REST response.
// The nested discountCode/zip objects match the @ManyToOne JPA relationships serialized as JSON.
export interface Customer {
  customerId?: number;
  name?: string;
  addressline1?: string;
  addressline2?: string;
  city?: string;
  state?: string;
  phone?: string;
  fax?: string;
  email?: string;
  creditLimit?: number;
  discountCode?: DiscountCode;
  zip?: MicroMarket;
}
