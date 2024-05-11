import axios from "axios";

export const API_URL = "http://localhost:8001/api";

class AppServices {
  login(body: any) {
    return axios.post(`${API_URL}/users/` + "login", body);
  }

  updateUser(body: any, id: any) {
    return axios.put(`${API_URL}/users`, body);
  }

  getCurrentUser() {
    return axios.get(`${API_URL}/users/current`);
  }

  register(body: any) {
    return axios.post(`${API_URL}/users`, body);
  }

  deleteUser() {
    return axios.delete(`${API_URL}/users`);
  }

  updateLaptop(body: any, id: any) {
    return axios.put(`${API_URL}/laptops/` + id, body);
  }
  deleteLaptop(id: any) {
    return axios.delete(`${API_URL}/laptops/` + id);
  }

  registerLaptop(body: any) {
    return axios.post(`${API_URL}/laptops/`, body);
  }
  getLaptops(query = "page=1&limit=10") {
    return axios.get(`${API_URL}/laptops?${query}`);
  }

  updateEmployee(body: any, id: any) {
    return axios.put(`${API_URL}/employees/` + id, body);
  }
  deleteEmployee(id: any) {
    return axios.delete(`${API_URL}/employees/` + id);
  }

  registerEmployee(body: any) {
    return axios.post(`${API_URL}/employees/`, body);
  }
  getEmployees(query = "page=1&limit=10") {
    return axios.get(`${API_URL}/employees?${query}`);
  }

  updateLaptopEmployee(body: any, id: any) {
    return axios.put(`${API_URL}/laptopEmployees/` + id, body);
  }

  updateLaptopEmployeePassword(body: any, id: any) {
    return axios.put(`${API_URL}/laptopEmployees/` + id, body);
  }
  deleteLaptopEmployee(id: any) {
    return axios.delete(`${API_URL}/laptopEmployees/` + id);
  }

  registerLaptopEmployee(body: any) {
    return axios.post(`${API_URL}/laptopEmployees/`, body);
  }
  getLaptopEmployees(query = "page=1&limit=10") {
    return axios.get(`${API_URL}/laptopEmployees?${query}`);
  }
}

export default new AppServices();
