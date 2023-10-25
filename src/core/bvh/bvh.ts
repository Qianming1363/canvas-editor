import { BufferGeometry, Points } from "three";
import {
  CONTAINED,
  INTERSECTED,
  NOT_INTERSECTED,
  SplitStrategy,
} from "three-mesh-bvh";
import GlobalProperty from "@/utils/GlobalProperty";
import LayerManager from "../manager/LayerManager";

export function initBVH() {
  const layerManager = GlobalProperty.getProperty(
    "layerManager"
  ) as LayerManager;
  const pcGeom = (layerManager.getPointcloudLayer().children[0] as Points)
    .geometry;
  if (pcGeom.attributes.position && (pcGeom.attributes.position as any).count) {
    pcGeom.computeBoundsTree();
  }
}

export function search(minX: number, minY: number, maxX: number, maxY: number) {
  const indicesSet = searchPointsByXY(minX, minY, maxX, maxY);
  const result = [] as any;
  if (indicesSet.size > 0) {
    const bvhGeometry =
      GlobalProperty.getProperty("layerManager").getPointcloudLayer()
        .children[0].geometry;
    const indexList = bvhGeometry.index.array;
    const array = bvhGeometry.attributes.position.array;
    indicesSet.forEach((index: any) => {
      const newIndex = indexList[index * 3];
      result.push({
        minX: array[newIndex * 3],
        minY: array[newIndex * 3 + 1],
        minZ: array[newIndex * 3 + 2],
        seq: newIndex,
      });
    });
  }
  return result;
}

export function searchPointsByXY(
  minX: number,
  minY: number,
  maxX: number,
  maxY: number
) {
  const indicesSet = new Set();
  const bvhGeometry =
    GlobalProperty.getProperty("layerManager").getPointcloudLayer().children[0]
      .geometry;
  (bvhGeometry as BufferGeometry).boundsTree?.shapecast({
    intersectsBounds: (box) => {
      const { min, max } = box;
      if (maxX < min.x || minX > max.x || maxY < min.y || minY > max.y) {
        return NOT_INTERSECTED;
      }
      if (maxX <= max.x && minX >= min.x && maxY <= max.y && minY >= min.y) {
        return CONTAINED;
      }
      return INTERSECTED;
    },
    intersectsTriangle: (tri, index) => {
      const point = tri.a;
      if (
        point.x >= minX &&
        point.x <= maxX &&
        point.y >= minY &&
        point.y <= maxY
      ) {
        indicesSet.add(index);
      }
      return false;
    },
  });
  return indicesSet;
}
