import axios from "axios";
import type { ReturnRequest } from "../types/Return";


const API_URL = "http://localhost:5000/api/returns";


// Get all returns of logged-in user
export const getReturns = async (): Promise<ReturnRequest[]> => {

  const token = localStorage.getItem("zellio_token");

  const response = await axios.get(
    API_URL,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};



// Get single return request
export const getReturn = async (
  id: string
): Promise<ReturnRequest> => {

  const token = localStorage.getItem("zellio_token");

  const response = await axios.get(
    `${API_URL}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};




// Create return request
export const createReturn = async (
  data: {
    orderId: string;
    productId: string;
    reason: string;
  }
): Promise<ReturnRequest> => {


  const token = localStorage.getItem("zellio_token");


  const response = await axios.post(
    API_URL,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );


  return response.data;

};




// Update return status (Admin)
export const updateReturnStatus = async (
  id: string,
  status:
    | "Pending"
    | "Approved"
    | "Rejected"
): Promise<ReturnRequest> => {


  const token = localStorage.getItem("zellio_token");


  const response = await axios.put(
    `${API_URL}/${id}`,
    {
      status,
    },
    {
      headers:{
        Authorization:`Bearer ${token}`,
      },
    }
  );


  return response.data;

};




// Delete return request
export const deleteReturn = async (
  id:string
) => {


  const token = localStorage.getItem("zellio_token");


  await axios.delete(
    `${API_URL}/${id}`,
    {
      headers:{
        Authorization:`Bearer ${token}`,
      },
    }
  );

};