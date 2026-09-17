import axios, { AxiosError } from "axios";

/**
 * Safe runtime DOM Node guard for click-outside event handling
 */
export function isNode(value: unknown): value is Node {
  return typeof window !== "undefined" && value instanceof Node;
}

/**
 * Safe runtime HTML Element guard
 */
export function isHTMLElement(value: unknown): value is HTMLElement {
  return typeof window !== "undefined" && value instanceof HTMLElement;
}

/**
 * Safe runtime HTML Input Element guard
 */
export function isHTMLInputElement(value: unknown): value is HTMLInputElement {
  return typeof window !== "undefined" && value instanceof HTMLInputElement;
}

/**
 * Safe runtime Axios error guard
 */
export function isAxiosError<T = unknown>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error);
}
