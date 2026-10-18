import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppStore } from "@/lib/store/store";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { solved_cube } from "@/lib/helpers/helper";
import { cube_sides } from "@/lib/maps/cube";
import { ICubeSide } from "@/types/types";
import { Toggle } from "../ui/toggle";
import { solveCube } from "@/lib/solver/solver";
import { useState } from "react";
import { ICubeMoves, cube_moves } from "@/lib/moves/moves";

export function CubeDevTools() {
  const {
    cube,
    highlight,
    updateStore,
    updateCube,
    rotateCube,
    rotateCube2Part,
    toggleCubeRotating,
    cubeLeft,
    cubeTop,
    cubeScale,
  } = useAppStore();
  const toggles = useAppStore((state) => ({
    scanReversed: state.scanReversed,
    previewReversed: state.previewReversed,
    isScanRefreshing: state.isScanRefreshing,
    devScanPreviewShow: state.devScanPreviewShow,
    isScanRefreshGlow: state.isScanRefreshGlow,
  }));
  const toggleLabels: Record<keyof typeof toggles, string> = {
    scanReversed: "扫描镜像",
    previewReversed: "预览镜像",
    isScanRefreshing: "实时扫描",
    devScanPreviewShow: "显示扫描预览",
    isScanRefreshGlow: "扫描刷新高亮",
  };
  const [move, setMove] = useState<ICubeMoves>("F");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="fixed left-4 bottom-4">
          开发工具
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[30rem] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>开发工具</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">魔方</Label>
            <Input className="col-span-2" value={cube} onChange={(e) => updateCube(e.target.value, true)} />
            <Button variant="outline" onClick={() => updateCube(solved_cube, true)}>
              设为已还原
            </Button>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">高亮面</Label>
            <Select
              onValueChange={(val) => updateStore({ highlight: val === "none" ? undefined : (val as ICubeSide) })}
              value={highlight}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="选择高亮面" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="none">无</SelectItem>
                  {cube_sides.map((side) => (
                    <SelectItem value={side} key={`dev-select-highlight-${side}`}>
                      {side}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-wrap gap-4">
            {Object.entries(toggles).map(([key, value]) => (
              <Toggle
                key={`dev-toggle-${key}`}
                variant="outline"
                pressed={value}
                onClick={() => updateStore({ [key]: !value })}
              >
                {toggleLabels[key as keyof typeof toggles]}
              </Toggle>
            ))}
          </div>
          <div>
            <Button
              variant="outline"
              onClick={() => {
                console.log({ solution: solveCube(cube) });
              }}
            >
              求解魔方
            </Button>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">转动面</Label>
            <Select onValueChange={(val) => setMove(val as ICubeMoves)} value={move}>
              <SelectTrigger>
                <SelectValue placeholder="选择转动面" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="none">无</SelectItem>
                  {cube_moves.map((m) => (
                    <SelectItem value={m} key={`dev-select-highlight-${m}`}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button type="button" variant="secondary" onClick={() => rotateCube(move)}>
              转动
            </Button>
            <Button type="button" variant="secondary" onClick={() => rotateCube2Part(move)}>
              分两段转动
            </Button>
          </div>
          <div>
            <Button onClick={() => toggleCubeRotating()}>切换自动旋转</Button>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">水平位置</Label>
            <Input
              className="col-span-2"
              value={cubeLeft}
              onChange={(e) => updateStore({ cubeLeft: +e.target.value || 0 })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">垂直位置</Label>
            <Input
              className="col-span-2"
              value={cubeTop}
              onChange={(e) => updateStore({ cubeTop: +e.target.value || 0 })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">缩放比例</Label>
            <Input
              className="col-span-2"
              value={cubeScale}
              onChange={(e) => updateStore({ cubeScale: +e.target.value || 1 })}
            />
          </div>
          <div>
            <Button
              onClick={() => {
                toggleCubeRotating();
                updateCube("RRRDUDULFURBURBFBFLURBFRLFUDDLFDUDLLDBBULLBLBUFFRBFDDR", true);
                updateStore({ currentAppStage: "solve" });
              }}
            >
              进入还原步骤
            </Button>
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              关闭
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
