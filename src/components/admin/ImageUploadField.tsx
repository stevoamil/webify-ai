"use client";

import Image from "next/image";
import { useState } from "react";

export default function ImageUploadField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const onFile = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error ?? "Upload failed.");
      onChange(body.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="mb-2 block text-xs font-medium tracking-[0.02em] text-muted">{label}</label>
      <div className="flex items-center gap-3">
        {value && (
          <div className="relative h-16 w-24 flex-none overflow-hidden rounded-lg border border-line bg-white">
            <Image src={value} alt="" fill className="object-cover" sizes="96px" />
          </div>
        )}
        <div className="flex-1">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/services/example.webp or paste a URL"
            className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-text outline-none focus:border-ice/50"
          />
          <label className="mt-1.5 inline-block cursor-pointer text-xs text-ice hover:underline">
            {uploading ? "Uploading…" : "Or upload a file"}
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              className="hidden"
              onChange={(e) => onFile(e.target.files?.[0])}
              disabled={uploading}
            />
          </label>
          {error && <p className="mt-1 text-xs text-amber-600">{error}</p>}
        </div>
      </div>
    </div>
  );
}
