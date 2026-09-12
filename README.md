# Parcial 1 — MediClinic

Repositorio con dos aplicaciones para la clínica MediClinic.

## Contenido
- `pwa-pacientes/` — PWA en React (Ejercicio 1)
- `ionic-visitas/` — App móvil Ionic React (Ejercicio 2)

## Ejercicio 1 — PWA React
**Funcionalidades**
- Login con usuarios fijos (`admin/1234`, `medico/medicina2024`)
- Sesión persistida en `localStorage`
- CRUD básico de pacientes (nombre, apellido, CC, teléfono)
- Validaciones: nombre, apellido y CC obligatorios (CC 6-12 dígitos)
- Buscador por nombre, apellido o CC (estado en el componente padre)
- PWA instalable con `vite-plugin-pwa`

**Ejecutar**
```bash
cd pwa-pacientes
npm install
npm run dev