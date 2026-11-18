import React, { useState } from 'react';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { api } from '../../services/api';

export const ImageUploadField = ({ label, value, onChange }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError('');
    setUploading(true);
    try {
      const res = await api.uploadImage(file);
      onChange(res.url);
    } catch (err) {
      setError(err.message || 'Image upload failed');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-dark-heading">
        {label}
      </label>

      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste image URL or upload a file →"
          className="flex-1 px-3.5 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 text-light-heading dark:text-dark-heading text-xs sm:text-sm focus:outline-none focus:border-light-accent dark:focus:border-dark-accent"
        />

        <label className="cursor-pointer inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-semibold hover:border-cyan-400 transition-colors shrink-0">
          {uploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" />
              Upload Image
            </>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      {error && <p className="text-xs text-rose-500">{error}</p>}

      {value && (
        <div className="relative inline-block mt-2 rounded-xl overflow-hidden border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary">
          <img
            src={value}
            alt="Preview"
            className="h-28 w-48 object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <button
            type="button"
            onClick={() => onChange('')}
            title="Remove image"
            className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/70 text-white hover:bg-black transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {!value && (
        <p className="text-[11px] text-light-body dark:text-dark-body flex items-center gap-1">
          <ImageIcon className="w-3 h-3" />
          Optional: PNG, JPG, WEBP, or SVG up to 4 MB. Saved directly in MongoDB Atlas.
        </p>
      )}
    </div>
  );
};
