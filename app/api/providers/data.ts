export type Status = "Pending" | "Verified" | "Flagged";
export type Provider = { id: number; name: string; dept: string; status: Status };

let seed: Provider[] = [
  { id: 10243, name: "Dr. Chen Liu",    dept: "Anesthesiology", status: "Flagged" },
  { id: 10242, name: "Dr. Bob Johnson", dept: "Orthopedics",    status: "Pending" },
  { id: 10241, name: "Dr. Alice Smith", dept: "Cardiology",     status: "Verified" },
  { id: 10240, name: "Dr. Maya Patel",  dept: "Radiology",      status: "Pending" },
  { id: 10239, name: "Dr. Omar Aziz",   dept: "Neurology",      status: "Verified" },
  { id: 10238, name: "Dr. Eva Martin",  dept: "Pathology",      status: "Pending" },
  { id: 10237, name: "Dr. Jake Turner", dept: "Oncology",       status: "Verified" },
  { id: 10236, name: "Dr. Sophia Rao",  dept: "Pediatrics",     status: "Flagged" },
];

export const db = {
  list: () => seed,
  add: (p: Omit<Provider, "id">) => {
    const rec = { id: Date.now(), ...p };
    seed = [rec, ...seed];
    return rec;
  },
  update: (id: number, patch: Partial<Omit<Provider, "id">>) => {
    seed = seed.map(r => r.id === id ? { ...r, ...patch } : r);
    return seed.find(r => r.id === id)!;
  },
  remove: (id: number) => {
    seed = seed.filter(r => r.id !== id);
  },
  bulkUpdate: (ids: number[], patch: Partial<Omit<Provider, "id">>) => {
    seed = seed.map(r => ids.includes(r.id) ? { ...r, ...patch } : r);
  },
  bulkRemove: (ids: number[]) => {
    seed = seed.filter(r => !ids.includes(r.id));
  }
};
