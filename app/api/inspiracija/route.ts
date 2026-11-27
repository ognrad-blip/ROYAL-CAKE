import { put } from "@vercel/blob";

const MAX = 4 * 1024 * 1024;
const TIPOVI = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif", "image/gif"];

// Prima jednu sliku za inspiraciju (vec smanjenu u pregledacu) i vraca javni link
// koji ide u poruku Dušanki. Ako skladište nije podešeno, vraća 503 i sajt
// kupcu kaže da sliku pošalje u čet.
export async function POST(request: Request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return Response.json({ greska: "nema-skladista" }, { status: 503 });
  }
  const form = await request.formData();
  const f = form.get("slika");
  if (!(f instanceof File)) return Response.json({ greska: "nema-slike" }, { status: 400 });
  if (!TIPOVI.includes(f.type)) return Response.json({ greska: "tip" }, { status: 415 });
  if (f.size > MAX) return Response.json({ greska: "velicina" }, { status: 413 });

  const ext = f.type.split("/")[1].replace("jpeg", "jpg");
  const datum = new Date().toISOString().slice(0, 10);
  const blob = await put(`inspiracije/${datum}/torta.${ext}`, f, {
    access: "public",
    addRandomSuffix: true,
    contentType: f.type,
  });
  return Response.json({ url: blob.url });
}
