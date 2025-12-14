import api from "./client";

// Detect current Normal Form
export async function detectNormalForm(payload) {
  const { data } = await api.post("/nf/detect", payload);
  return data;
}

// Normalize to target NF
export async function normalizeTo(payload, target = "3NF") {
  const { data } = await api.post(`/nf/normalize?target=${target}`, payload);
  return data;
}
