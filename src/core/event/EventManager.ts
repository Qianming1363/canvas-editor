
export enum EventName {
  DrawEnd = "DrawEnd"
}

const eventMap = {} as Record<EventName, Array<(data: any) => void>>


export function emit(name: EventName, data?: any) {
  if (eventMap[name]) {
    eventMap[name].forEach(e => e && e(data))
  }
}

export function on(name: EventName, callback: (data: any) => void) {
  if (eventMap[name]) {
    eventMap[name].push(callback)
  } else {
    eventMap[name] = [callback]
  }
}

export function off(name: EventName, callback: (data: any) => void) {
  if (eventMap[name]) {
    const index = eventMap[name].findIndex(e => e === callback)
    eventMap[name].splice(index, 1)
  }
}