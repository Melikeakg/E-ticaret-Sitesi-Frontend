import { ClothesImage } from "./clothesImage";

export interface ClothesDetail{
  clothesId:number,
  categoryId:number,
  colorId:number,
  colorName:string,
  categoryName:string,
  unitPrice:number,
  clothesName:string,
  description:string,
  imagePath:string,
  image:string,
  unitsInStock:number;
  // clothesImage:ClothesImage[]
}
