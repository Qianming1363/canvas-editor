
export enum ShapeType {
  RECT = "RECT",
  POLYLINE = "POLYLINE"
}

export interface BaseShape {
  id: string,
  points: Array<{ x: number, y: number }>,
  type: ShapeType
}