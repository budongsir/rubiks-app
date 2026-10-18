import { ICubeSide } from "@/types/types";
import * as THREE from "three";

export const cube_sides: ICubeSide[] = ["U", "R", "F", "D", "L", "B"];
export const cubeSidesFull: Record<ICubeSide, string> = {
  U: "上",
  R: "右",
  F: "前",
  D: "下",
  L: "左",
  B: "后",
  X: "未知",
};
export const cubeSidesNamedColors: Record<ICubeSide, string> = {
  U: "黄色",
  R: "绿色",
  F: "红色",
  D: "白色",
  L: "蓝色",
  B: "橙色",
  X: "未知",
};

export const cube_sides_scan: ICubeSide[] = ["F", "U", "R", "D", "L", "B"];
export const colorMapThree: Record<ICubeSide, THREE.Color> = {
  D: new THREE.Color("white"),
  U: new THREE.Color("yellow"),
  R: new THREE.Color("green"),
  L: new THREE.Color("blue"),
  F: new THREE.Color("red"),
  B: new THREE.Color("#f96706"),
  X: new THREE.Color("black"),
};
