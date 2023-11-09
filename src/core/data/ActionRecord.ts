
export class ActionRecord {
  private optionList: string[] = []
  private backList: string[] = []

  constructor() { }

  // 添加一条记录
  addRecord(record: string) {
    this.optionList.push(record)
  }

  // 撤销
  backRecord() {
    const res = this.optionList.pop()
    if (res) {
      this.backList.push(res)
      return this.optionList[this.optionList.length - 1]
    } else {
      console.log("没有操作记录可以撤销")
    }
  }

  // 撤销还原
  cancelBackRecord() {
    const res = this.backList.pop()
    if (res) {
      this.optionList.push(res)
      return this.optionList[this.optionList.length - 1]
    } else {
      console.log("没有撤销可以还原")
    }
  }
}