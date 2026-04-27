import type { Preset } from "../types";

/** Exam-form presets with exact portal requirements */
export const presets: Preset[] = [
  { name: "UPSC Photo",    format: "jpg", width: 200, height: 230, minKB: 4,   maxKB: 300 },
  { name: "SSC CGL Photo", format: "jpg", width: 200, height: 230, minKB: 4,   maxKB: 100 },
  { name: "SSC Signature",  format: "jpg", width: 140, height: 60,  minKB: 1,   maxKB: 12  },
  { name: "RRB Photo",     format: "jpg", width: 200, height: 230, minKB: 10,  maxKB: 100 },
  { name: "IBPS Photo",    format: "jpg", width: 200, height: 230, minKB: 20,  maxKB: 50  },
  { name: "Passport Size", format: "jpg", width: 413, height: 531, minKB: 20,  maxKB: 200 },
  { name: "Custom",        format: "jpg", width: null, height: null, minKB: null, maxKB: null },
];
