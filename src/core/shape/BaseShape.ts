
export enum ShapeType {
  RECT = "RECT",
  POLYLINE = "POLYLINE"
}

export interface BaseShape {
  id: number,
  points: Array<{ x: number, y: number }>,
  type: ShapeType
}