import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {OrderToSend} from "../components/stepper/order-to-send";

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) {
  }

  getAllProductGroups() {
    return this.http.get("/kalkulator/productGroupDefs");
  }

  getColorsByProductGroupName(productGroupName: string) {
    return this.http.get("/kalkulator/colorDefs/byProductGroupName?productgroupname=" + productGroupName);
  }

  getColorsByProductGroupId(productGroupId: number) {
    return this.http.get("/kalkulator/colorDefs/byProductGroupId?productgroupid=" + productGroupId);
  }

  getsupportsByProductGroupIdAndColorId(productGroupId: number, colorId: number) {
    return this.http.get("/kalkulator/supportDefs/byProductGroupIdAndColorId?productgroupid=" + productGroupId + "&colorid=" + colorId);
  }

  getEndingsByProductGroupIdAndColorId(productGroupId: number, colorId: number) {
    return this.http.get("/kalkulator/endingDefs/byProductGroupIdAndColorId?productgroupid=" + productGroupId + "&colorid=" + colorId);
  }

  getEndingSecondRodsByProductGroupIdAndColorId(productGroupId: number, colorId: number) {
    return this.http.get("/kalkulator/endingSecondRodDefs/byProductGroupIdAndColorId?productgroupid=" + productGroupId + "&colorid=" + colorId);
  }

  getCirclesByProductGroupIdAndColorId(productGroupId: number, colorId: number) {
    return this.http.get("/kalkulator/circleDefs/byProductGroupIdAndColorId?productgroupid=" + productGroupId + "&colorid=" + colorId);
  }

  getRodLengthsByProductGroupIdAndColorId(productGroupId: number, colorId: number) {
    return this.http.get("/kalkulator/rodLengthDefs/byProductGroupIdAndColorId?productgroupid=" + productGroupId + "&colorid=" + colorId);
  }

  postOrder(order: OrderToSend) {
    return this.http.post("/kalkulator/singleOrders", order);
  }

  sendMail(orderId: number) {
    return this.http.get("/kalkulator/mail/" + orderId);
  }

  findParamsByAddressId(id: number) {
    return this.http.get("/kalkulator/addressConfigs/" + id);
  }
}
