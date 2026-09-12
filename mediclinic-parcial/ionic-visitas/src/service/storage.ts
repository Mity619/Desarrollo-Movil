export const USERS = [
  { username: 'doctor', password: '1234' }
];

export const getSession = () => {
  const s = localStorage.getItem('medico_session');
  return s ? JSON.parse(s) : null;
};
export const setSession = (u: any) =>
  localStorage.setItem('medico_session', JSON.stringify(u));
export const clearSession = () => localStorage.removeItem('medico_session');

export type Estado = 'pendiente' | 'en_camino' | 'finalizada';
export type Visita = {
  id: string;
  paciente: string;
  hora: string;
  estado: Estado;
  direccion: string;
};

const VISITAS_INICIALES: Visita[] = [
  { id: '1', paciente: 'Ana García',    hora: '08:30', estado: 'pendiente',  direccion: 'Cra 10 #20-15' },
  { id: '2', paciente: 'Luis Pérez',    hora: '09:15', estado: 'en_camino',  direccion: 'Cll 45 #12-08' },
  { id: '3', paciente: 'María Ramírez', hora: '10:00', estado: 'pendiente',  direccion: 'Av 68 #33-22' },
  { id: '4', paciente: 'Carlos Ruiz',   hora: '11:30', estado: 'finalizada', direccion: 'Cll 100 #15-40' },
  { id: '5', paciente: 'Sofía Torres',  hora: '14:00', estado: 'pendiente',  direccion: 'Cra 7 #50-03' }
];

export const getVisitas = (): Visita[] => {
  const s = localStorage.getItem('visitas');
  if (s) return JSON.parse(s);
  localStorage.setItem('visitas', JSON.stringify(VISITAS_INICIALES));
  return VISITAS_INICIALES;
};

export const saveVisitas = (v: Visita[]) =>
  localStorage.setItem('visitas', JSON.stringify(v));

export const updateVisita = (id: string, estado: Estado) => {
  const list = getVisitas().map(v => v.id === id ? { ...v, estado } : v);
  saveVisitas(list);
  return list;
};