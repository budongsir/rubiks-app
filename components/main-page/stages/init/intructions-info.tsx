"use client";

import { colorMapThree } from "@/lib/maps/cube";
import { ICubeSide } from "@/types/types";
import { motion } from "framer-motion";

const ScanInstructionsInfo = () => {
  return (
    <motion.div
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -200, opacity: 0 }}
      transition={{ ease: "easeInOut" }}
    >
      <h1 className="font-extrabold tracking-tight text-[2.5rem] leading-[3rem]">扫描前的准备：</h1>
      <span className="block text-xs text-muted-foreground max-w-[12rem] tracking-tight leading-[18px] mt-3 -mb-5">
        <ol className="list-decimal ml-[2ch] flex flex-col gap-[0.12rem]">
          <li>
            手持魔方，让<TextColor color="F">红色中心块朝向自己</TextColor>。
          </li>
          <li>
            <span>调整各面的朝向：</span>
            <ul className="list-disc ml-[1ch]">
              <li>
                <TextColor color="L">左面</TextColor>：让<TextColor color="L">蓝色中心块</TextColor>朝左。
              </li>
              <li>
                <TextColor color="R">右面</TextColor>：让<TextColor color="R">绿色中心块</TextColor>朝右。
              </li>
              <li>
                <TextColor color="U">上面</TextColor>：让<TextColor color="U">黄色中心块</TextColor>朝上。
              </li>
              <li>
                <TextColor color="D">下面</TextColor>：让<TextColor color="D">白色中心块</TextColor>朝下。
              </li>
            </ul>
          </li>
          <li>
            对照 3D 预览调整魔方，确保手中魔方的朝向与预览一致。
          </li>
        </ol>
      </span>
    </motion.div>
  );
};

const TextColor = ({ color, children }: { color: ICubeSide; children: React.ReactNode }) => (
  <span style={{ color: `#${colorMapThree[color].getHexString()}` }}>{children}</span>
);

export default ScanInstructionsInfo;
