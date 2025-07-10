import { useEffect, useState } from "react";

export const UseDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default UseDebounce;

//📌 Nota Personal: useDebounce es un hook personalizado porque usa useState y useEffect.

/* Nota Personal: Un hook personalizado usa otros hooks de React (useState, useEffect, etc.).
Una función de utilidad es solo una función normal que no usa hooks. 

Diferencia resumida
Característica	Hook personalizado (useDebounce)	Función de utilidad (debounceFunction)
Usa useState	✅ Sí	❌ No
Usa useEffect	✅ Sí	❌ No
Se usa dentro de React	✅ Sí	✅ Sí (pero no es exclusivo)
Guarda valores	✅ Sí (almacena estado)	❌ No, solo retrasa una función
Requiere importación de React	✅ Sí	❌ No

*/