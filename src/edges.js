export const edges = [
  {
    id: 'filmmaking-production',
    source: 'filmmaking',
    target: 'preProduction',
  },
  // Pre-Production to Production
  {
    id: 'preProduction-production',
    source: 'preProduction',
    target: 'production',
  },
  // Pre-Production to Script
  { id: 'preProduction-script', source: 'preProduction', target: 'script' },
  // Pre-Production to Casting
  { id: 'preProduction-casting', source: 'preProduction', target: 'casting' },
  // Pre-Production to Budgeting
  {
    id: 'preProduction-budgeting',
    source: 'preProduction',
    target: 'budgeting',
  },
  // Pre-Production to Genre
  { id: 'preProduction-genre', source: 'preProduction', target: 'genre' },
  // Production to Cinematography
  {
    id: 'production-cinematography',
    source: 'production',
    target: 'cinematography',
  },
  // Production to Editing
  { id: 'production-editing', source: 'production', target: 'editing' },
  // Production to Sound Design
  { id: 'production-soundDesign', source: 'production', target: 'soundDesign' },
];
