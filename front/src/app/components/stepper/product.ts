export class Order{

  private _productGroup:ProductGroup;

  private _color:Color;

  private _length:Rod = {length: null, price:0, id:0, imageUrl:''};
  private _rodCount:number;

  private _supportType:Support;
  //todo
  private _supportCount:number = 1;

  private _endingType:Ending;
  private _ending2Type:Ending;
  //todo
  private _endingCount:number = 1;

  private _circleType:Circle;
  //todo
  private _circleCount:number = 1;

  constructor(){}

  get productGroup(): ProductGroup {
    return this._productGroup;
  }

  set productGroup(value: ProductGroup) {
    this._productGroup = value;
  }

  get length(): Rod {
    return this._length;
  }

  set length(value: Rod) {
    this._length = value;
  }

  get rodCount(): number {
    return this._rodCount;
  }

  set rodCount(value: number) {
    this._rodCount = value;
  }

  get color(): Color {
    return this._color;
  }

  set color(value: Color) {
    this._color = value;
  }

  get supportType(): Support {
    return this._supportType;
  }

  set supportType(value: Support) {
    this._supportType = value;
  }

  get supportCount(): number {
    return this._supportCount;
  }

  set supportCount(value: number) {
    this._supportCount = value;
  }

  get circleType(): Circle {
    return this._circleType;
  }

  set circleType(value: Circle) {
    this._circleType = value;
  }

  get circleCount(): number {
    return this._circleCount;
  }

  set circleCount(value: number) {
    this._circleCount = value;
  }


  get endingType(): Ending {
    return this._endingType;
  }

  set endingType(value: Ending) {
    this._endingType = value;
  }


  get ending2Type(): Ending {
    return this._ending2Type;
  }

  set ending2Type(value: Ending) {
    this._ending2Type = value;
  }

  get endingCount(): number {
    return this._endingCount;
  }

  set endingCount(value: number) {
    this._endingCount = value;
  }
}

export interface ProductGroup {
  id: number;
  name: string;
  url: string;
}

export interface Color {
  id: number;
  name: string;
  imageUrl: string;
}

export interface Rod {
  id: number;
  length: string;
  imageUrl: string;
  price: number;
}

export interface Support {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

export interface Ending {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

export interface Circle {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}




