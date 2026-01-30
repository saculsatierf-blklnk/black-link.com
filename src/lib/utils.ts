import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utilitário de Fusão de Classes (Standard Industrial)
 * Combina clsx (condicional) com tailwind-merge (resolução de conflitos)
 * Essencial para componentes reativos complexos.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}