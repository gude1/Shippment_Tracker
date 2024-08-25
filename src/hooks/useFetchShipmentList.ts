import {useState, useCallback, useEffect} from 'react';
import axios, {AxiosResponse} from 'axios';
import shipment from '../config/shipment';

interface FetchParams {
  doctype: string;
  fields: string[];
  filters?: {};
}

export interface MessageItem {
  name: string;
  creation: string;
  modified: string;
  modified_by: string;
  owner: string;
  docstatus: number;
  idx: number;
  sender: string;
  origin_area: string | null;
  origin_city: string;
  sender_phone: string | null;
  sender_name: string;
  origin_adress_line_1: string | null;
  origin_country: string;
  sender_address: string | null;
  origin_address_line2: string | null;
  origin_state: string;
  consignee: string;
  destination_area: string | null;
  destination_city: string;
  consignee_phone: string | null;
  consignee_name: string | null;
  destination_address_line_1: string | null;
  destination_country: string;
  consignee_address: string | null;
  destination_address_line_2: string | null;
  destination_state: string;
  origin_zone: string;
  destination_zone: string;
  service: string | null;
  total_weight: number;
  status: string;
  movable_units: string | null;
  amended_from: string | null;
  company: string;
  cod: number;
  total_cod: number;
  barcode: string;
  branch: string | null;
  currency: string;
  pieces: number;
  not_available: number;
  percentage: number;
  total_fees: number;
  awb_terms_template: string | null;
  awb_terms_and_conditions: string | null;
  sales_invoice_created: number;
  _user_tags: string | null;
  _comments: string | null;
  _assign: string | null;
  _liked_by: string | null;
  geolocation_evkp: string | null;
  shipping_service: string;
  delivery_time: string | null;
  from_client_side: number;
  destination_branch: string | null;
  origin_branch: string | null;
  delivery_due_date: string | null;
  company_currency: string;
  exchange_rate: number;
  overdue: number;
  posting_date: string;
  posting_time: string;
  is_returned: number;
  custodian: string | null;
  assignee: string | null;
  closed: number;
  custodian_commission: number;
  awb_date: string;
  type: string | null;
  origin_address_line_1: string | null;
  service_type: string | null;
  adjusted_cod: number;
}

interface ApiResponse {
  message: MessageItem[];
}

interface UseFetchShipmentListResult {
  data: ApiResponse | null;
  error: string | null;
  loading: boolean;
  fetchData: (params: FetchParams) => void;
}

const useFetchShipmentList = (
  initialParams: FetchParams,
): UseFetchShipmentListResult => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async (params: FetchParams) => {
    setLoading(true);
    setError(null);

    try {
      let formData = new FormData();
      formData.append('doctype', 'AWB');
      formData.append('fields', JSON.stringify(params.fields));
      if (params.filters) {
        formData.append('filters', JSON.stringify(params.filters));
      }

      const response: AxiosResponse<ApiResponse> = await shipment.post(
        '/method/frappe.client.get_list',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      setData(response.data);
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error) && error.message) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(initialParams);
  }, []);

  return {data, error, loading, fetchData};
};

export default useFetchShipmentList;
