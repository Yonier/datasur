// Modelos
export type Empresa = {
  id: number
  rut: string
  razon_social: string
  actividad_economica: string
  fecha_inicio_actividades: string
  region: string
  provincia: string
  comuna: string
}

// API
export type Pagination<T = any> = {
  count: number
  next: null | string
  previous: null | string
  results: Array<T>
}
export type ValidationError = Record<string, string[]>;

export type EmpresasResponse = Pagination<Empresa>