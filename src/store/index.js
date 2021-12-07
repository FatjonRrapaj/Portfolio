import create from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

import useObject from "./object";

const useStore = create(
  subscribeWithSelector((set, get) => ({
    ...useObject(set, get, "world"),
    ...useObject(set, get, "floor"),
    ...useObject(set, get, "paperPlane"),
    ...useObject(set, get, "fatstronaut"),
    ...useObject(set, get, "sky"),
    ...useObject(set, get, "camera"),
  }))
);

export default useStore;
