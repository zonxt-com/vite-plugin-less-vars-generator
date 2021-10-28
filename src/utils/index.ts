export function isNull(val: unknown): val is null {
  return val === null;
}

export const isDef = <T = unknown>(val?: T): val is T => {
  return typeof val !== "undefined";
};

export const isUnDef = <T = unknown>(val?: T): val is T => {
  return !isDef(val);
};

export function isNullAndUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) && isNull(val);
}

export function isNullOrUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) || isNull(val);
}

export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`;
}

export function isString(val: unknown): val is string {
  return is(val, "String");
}

export function isNullOrUnDefOrStringEmpty(
  val: unknown
): val is null | undefined | string {
  return (
    isUnDef(val) ||
    isNull(val) ||
    (isString(val) && !((val as string).trim().length > 0))
  );
}

export const toCamelCase = (str: string) => {
  const s =
    str &&
    (str as any)
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .map((x: any) => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
      .join("");
  return s.slice(0, 1).toLowerCase() + s.slice(1);
};
