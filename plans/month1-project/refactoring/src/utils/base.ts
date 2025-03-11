type primitiveRef = boolean | number | string | null | undefined | bigint;

export interface refObject {
  value: primitiveRef;
  dom: HTMLElement;
}

// Create responsive object with dom and variable
export function ref(value: primitiveRef, dom: HTMLElement): refObject {
  const obj: refObject = { value, dom };

  // initiate dom text content
  dom.textContent = 'init';
  
  // create proxy object
  const proxy: refObject = new Proxy(obj, {
    get(target, key, receiver) {
      if (key === 'value') {
        return Reflect.get(target, key, receiver);
      }
    },
    set(target, key, newValue, receiver) {
      if (key === 'value') {
        dom.textContent = newValue;
      }
      return Reflect.set(target, key, newValue, receiver);
    }
  });

  return proxy;
}
