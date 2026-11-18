import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Loader2, X, Award, Eye, EyeOff } from 'lucide-react';
import { api } from '../../services/api';
import { ImageUploadField } from './ImageUploadField';

const emptyForm = {
  title: '',
  issuer: '',
  score: '',
  badgeText: 'Certified',
  date: '',
  credentialId: '',
  skills: '',
  description: '',
  previewImage: '',
};

export const CertificatesManager = ({ items, onRefresh, notify }) => {
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleEdit = (cert) => {
    setEditingId(cert._id);
    setForm({
      title: cert.title || '',
      issuer: cert.issuer || '',
      score: cert.score || '',
      badgeText: cert.badgeText || 'Certified',
      date: cert.date || '',
      credentialId: cert.credentialId || '',
      skills: (cert.skills || []).join(', '),
      description: cert.description || '',
      previewImage: cert.previewImage || '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await api.updateCertificate(editingId, form);
        notify('Certificate updated!', 'success');
      } else {
        await api.createCertificate(form);
        notify('Certificate uploaded to MongoDB Atlas!', 'success');
      }
      resetForm();
      await onRefresh();
    } catch (err) {
      notify(err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this certificate permanently?')) return;
    try {
      await api.deleteCertificate(id);
      notify('Certificate deleted.', 'success');
      if (editingId === id) resetForm();
      await onRefresh();
    } catch (err) {
      notify(err.message, 'error');
    }
  };

  const handleToggleVisibility = async (cert) => {
    try {
      const updated = await api.toggleCertificateVisibility(cert._id);
      notify(
        updated.hidden ? `"${cert.title}" hidden from live website.` : `"${cert.title}" is now visible on live website.`,
        'success'
      );
      await onRefresh();
    } catch (err) {
      notify(err.message, 'error');
    }
  };

  return (
    <div className="space-y-8">
      <form
        onSubmit={handleSubmit}
        className="p-6 rounded-2xl bg-light-bg dark:bg-dark-card border border-light-border dark:border-dark-border shadow-sm space-y-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-light-heading dark:text-dark-heading flex items-center gap-2">
            <Plus className="w-5 h-5 text-light-accent dark:text-dark-accent" />
            {editingId ? 'Edit Certificate' : 'Upload New Certificate'}
          </h2>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="text-xs font-semibold text-light-body hover:text-light-heading flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" /> Cancel Edit
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-dark-heading mb-1">
              Certificate Title *
            </label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Programming in Java (NPTEL)"
              className="w-full px-3.5 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 text-sm text-light-heading dark:text-dark-heading focus:outline-none focus:border-light-accent"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-dark-heading mb-1">
              Issuing Organization *
            </label>
            <input
              type="text"
              required
              value={form.issuer}
              onChange={(e) => setForm({ ...form, issuer: e.target.value })}
              placeholder="e.g. NPTEL • IIT Kharagpur"
              className="w-full px-3.5 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 text-sm text-light-heading dark:text-dark-heading focus:outline-none focus:border-light-accent"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-dark-heading mb-1">
              Score / Distinction
            </label>
            <input
              type="text"
              value={form.score}
              onChange={(e) => setForm({ ...form, score: e.target.value })}
              placeholder="e.g. 95% Score (Elite + Gold)"
              className="w-full px-3.5 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 text-sm text-light-heading dark:text-dark-heading focus:outline-none focus:border-light-accent"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-dark-heading mb-1">
              Badge Label
            </label>
            <input
              type="text"
              value={form.badgeText}
              onChange={(e) => setForm({ ...form, badgeText: e.target.value })}
              placeholder="e.g. Elite + Gold, Verified"
              className="w-full px-3.5 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 text-sm text-light-heading dark:text-dark-heading focus:outline-none focus:border-light-accent"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-dark-heading mb-1">
              Completion Date
            </label>
            <input
              type="text"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              placeholder="e.g. October 2023"
              className="w-full px-3.5 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 text-sm text-light-heading dark:text-dark-heading focus:outline-none focus:border-light-accent"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-dark-heading mb-1">
              Credential ID
            </label>
            <input
              type="text"
              value={form.credentialId}
              onChange={(e) => setForm({ ...form, credentialId: e.target.value })}
              placeholder="Optional certificate ID"
              className="w-full px-3.5 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 text-sm text-light-heading dark:text-dark-heading focus:outline-none focus:border-light-accent"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-dark-heading mb-1">
            Skills Validated (comma-separated)
          </label>
          <input
            type="text"
            value={form.skills}
            onChange={(e) => setForm({ ...form, skills: e.target.value })}
            placeholder="Java, OOP, Multithreading"
            className="w-full px-3.5 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 text-sm text-light-heading dark:text-dark-heading focus:outline-none focus:border-light-accent"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-dark-heading mb-1">
            Description
          </label>
          <textarea
            rows={2}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Brief description of what this certification covers..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 text-sm text-light-heading dark:text-dark-heading focus:outline-none focus:border-light-accent"
          />
        </div>

        <ImageUploadField
          label="Certificate Image / Preview"
          value={form.previewImage}
          onChange={(url) => setForm({ ...form, previewImage: url })}
        />

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FF2E63] to-[#FF5E2B] text-white text-sm font-bold shadow-[0_0_16px_rgba(255,46,99,0.35)] hover:shadow-[0_0_24px_rgba(255,46,99,0.55)] disabled:opacity-60 flex items-center gap-2"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            {editingId ? 'Save Changes' : 'Upload Certificate'}
          </button>
        </div>
      </form>

      {/* List */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-light-body dark:text-dark-body">
          Uploaded Certificates ({items.length})
        </h3>
        {items.length === 0 ? (
          <p className="text-sm text-light-body dark:text-dark-body p-6 rounded-2xl border border-dashed border-light-border dark:border-dark-border text-center">
            No certificates in MongoDB yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((cert) => (
              <div
                key={cert._id}
                className={`p-4 rounded-2xl bg-light-bg dark:bg-dark-card border flex items-start justify-between gap-3 transition-all ${
                  cert.hidden
                    ? 'border-dashed border-amber-500/40 opacity-65'
                    : 'border-light-border dark:border-dark-border'
                }`}
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-light-heading dark:text-dark-heading truncate">
                        {cert.title}
                      </h4>
                      {cert.hidden && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-500 border border-amber-500/30 shrink-0">
                          Hidden
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-light-body dark:text-dark-body truncate">{cert.issuer}</p>
                    <p className="text-[11px] text-cyan-600 dark:text-cyan-400 font-semibold mt-0.5">
                      {cert.score} • {cert.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleToggleVisibility(cert)}
                    className={`p-1.5 rounded-lg border transition-colors ${
                      cert.hidden
                        ? 'border-amber-500/40 bg-amber-500/15 text-amber-500 hover:bg-amber-500/25'
                        : 'border-light-border dark:border-dark-border text-cyan-600 dark:text-cyan-400 hover:border-cyan-400'
                    }`}
                    title={cert.hidden ? 'Show on website' : 'Hide from website'}
                  >
                    {cert.hidden ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleEdit(cert)}
                    className="p-1.5 rounded-lg border border-light-border dark:border-dark-border hover:border-light-accent text-light-heading dark:text-dark-heading"
                    title="Edit"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(cert._id)}
                    className="p-1.5 rounded-lg border border-rose-500/30 text-rose-500 hover:bg-rose-500/10"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
