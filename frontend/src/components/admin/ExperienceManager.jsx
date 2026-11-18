import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Loader2, X, Briefcase, Eye, EyeOff } from 'lucide-react';
import { api } from '../../services/api';

const emptyForm = {
  organization: '',
  role: '',
  type: 'Internship',
  duration: '',
  location: '',
  responsibilities: '',
  technologies: '',
  learningOutcomes: '',
};

export const ExperienceManager = ({ items, onRefresh, notify }) => {
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleEdit = (exp) => {
    setEditingId(exp._id);
    setForm({
      organization: exp.organization || '',
      role: exp.role || '',
      type: exp.type || 'Internship',
      duration: exp.duration || '',
      location: exp.location || '',
      responsibilities: (exp.responsibilities || []).join('\n'),
      technologies: (exp.technologies || []).join(', '),
      learningOutcomes: exp.learningOutcomes || '',
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
        await api.updateExperience(editingId, form);
        notify('Experience updated!', 'success');
      } else {
        await api.createExperience(form);
        notify('Experience added to MongoDB Atlas!', 'success');
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
    if (!window.confirm('Delete this experience entry permanently?')) return;
    try {
      await api.deleteExperience(id);
      notify('Experience deleted.', 'success');
      if (editingId === id) resetForm();
      await onRefresh();
    } catch (err) {
      notify(err.message, 'error');
    }
  };

  const handleToggleVisibility = async (exp) => {
    try {
      const updated = await api.toggleExperienceVisibility(exp._id);
      notify(
        updated.hidden ? `"${exp.organization}" hidden from live website.` : `"${exp.organization}" is now visible on live website.`,
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
            {editingId ? 'Edit Experience' : 'Add Professional Experience'}
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
              Role / Job Title *
            </label>
            <input
              type="text"
              required
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              placeholder="e.g. Software Development Intern"
              className="w-full px-3.5 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 text-sm text-light-heading dark:text-dark-heading focus:outline-none focus:border-light-accent"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-dark-heading mb-1">
              Organization / Company *
            </label>
            <input
              type="text"
              required
              value={form.organization}
              onChange={(e) => setForm({ ...form, organization: e.target.value })}
              placeholder="e.g. Bees Software Solutions"
              className="w-full px-3.5 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 text-sm text-light-heading dark:text-dark-heading focus:outline-none focus:border-light-accent"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-dark-heading mb-1">
              Duration *
            </label>
            <input
              type="text"
              required
              value={form.duration}
              onChange={(e) => setForm({ ...form, duration: e.target.value })}
              placeholder="e.g. Jun 2024 – Aug 2024"
              className="w-full px-3.5 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 text-sm text-light-heading dark:text-dark-heading focus:outline-none focus:border-light-accent"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-dark-heading mb-1">
              Location &amp; Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="Hyderabad / Remote"
                className="w-full px-3.5 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 text-sm text-light-heading dark:text-dark-heading focus:outline-none focus:border-light-accent"
              />
              <input
                type="text"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                placeholder="Internship"
                className="w-full px-3.5 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 text-sm text-light-heading dark:text-dark-heading focus:outline-none focus:border-light-accent"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-dark-heading mb-1">
            Responsibilities / Highlights (one per line)
          </label>
          <textarea
            rows={3}
            value={form.responsibilities}
            onChange={(e) => setForm({ ...form, responsibilities: e.target.value })}
            placeholder={"Built modular React components\nIntegrated RESTful APIs with Node.js"}
            className="w-full px-3.5 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 text-sm text-light-heading dark:text-dark-heading focus:outline-none focus:border-light-accent"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-dark-heading mb-1">
            Technologies Used (comma-separated)
          </label>
          <input
            type="text"
            value={form.technologies}
            onChange={(e) => setForm({ ...form, technologies: e.target.value })}
            placeholder="React, Node, Express, Git"
            className="w-full px-3.5 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 text-sm text-light-heading dark:text-dark-heading focus:outline-none focus:border-light-accent"
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FF2E63] to-[#FF5E2B] text-white text-sm font-bold shadow-[0_0_16px_rgba(255,46,99,0.35)] hover:shadow-[0_0_24px_rgba(255,46,99,0.55)] disabled:opacity-60 flex items-center gap-2"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            {editingId ? 'Save Changes' : 'Add Experience'}
          </button>
        </div>
      </form>

      {/* List */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-light-body dark:text-dark-body">
          Uploaded Experience ({items.length})
        </h3>
        {items.length === 0 ? (
          <p className="text-sm text-light-body dark:text-dark-body p-6 rounded-2xl border border-dashed border-light-border dark:border-dark-border text-center">
            No experience entries in MongoDB yet.
          </p>
        ) : (
          <div className="space-y-3">
            {items.map((exp) => (
              <div
                key={exp._id}
                className={`p-4 rounded-2xl bg-light-bg dark:bg-dark-card border flex items-start justify-between gap-4 transition-all ${
                  exp.hidden
                    ? 'border-dashed border-amber-500/40 opacity-65'
                    : 'border-light-border dark:border-dark-border'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FF2E63]/10 text-[#FF2E63] flex items-center justify-center shrink-0">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-bold text-sm text-light-heading dark:text-dark-heading">
                        {exp.role}{' '}
                        <span className="text-light-accent dark:text-dark-accent">
                          @ {exp.organization}
                        </span>
                      </h4>
                      {exp.hidden && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-500 border border-amber-500/30">
                          Hidden
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-light-body dark:text-dark-body">
                      {exp.duration} • {exp.location} • {exp.type}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleToggleVisibility(exp)}
                    className={`p-1.5 rounded-lg border transition-colors ${
                      exp.hidden
                        ? 'border-amber-500/40 bg-amber-500/15 text-amber-500 hover:bg-amber-500/25'
                        : 'border-light-border dark:border-dark-border text-cyan-600 dark:text-cyan-400 hover:border-cyan-400'
                    }`}
                    title={exp.hidden ? 'Show on website' : 'Hide from website'}
                  >
                    {exp.hidden ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleEdit(exp)}
                    className="p-1.5 rounded-lg border border-light-border dark:border-dark-border hover:border-light-accent text-light-heading dark:text-dark-heading"
                    title="Edit"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(exp._id)}
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
