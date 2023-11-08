interface Key {
  label: string,
  eventName: HotKey,
  key: string,
  isCtrl: boolean,
  isShift: boolean,
  isAlt: boolean
}

enum HotKey {
  BACK = "back",                      // 撤销
  CANCEL_BACK = "CANCEL_BACK",        // 取消撤销
}

export const keyList: Key[] = [
  {
    label: "撤销",
    eventName: HotKey.BACK,
    key: "z",
    isCtrl: true,
    isShift: false,
    isAlt: false
  }
]