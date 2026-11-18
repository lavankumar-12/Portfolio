import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Loader2, X, Layers, Eye, EyeOff } from 'lucide-react';
import { api } from '../../services/api';

const emptyForm = {
  category: '',
  skills: '',
  order: 0,
};

export const SkillsManager = ({ items, onRefresh, notify }) => {
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleEdit = (item) => {
    setEditingId(item._id);
    setForm({
      category: item.category || '',
      skills: (item.skills || []).join(', '),
      order: item.order || 0,
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
        await api.updateSkill(editingId, form);
        notify('Skill category updated!', 'success');
      } else {
        await api.createSkill(form);
        notify('Skill category saved to MongoDB Atlas!', 'success');
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
    if (!window.confirm('Delete this skill category?')) return;
    try {
      await api.deleteSkill(id);
      notify('Skill category deleted.', 'success');
      if (editingId === id) resetForm();
      await onRefresh();
    } catch (err) {
      notify(err.message, 'error');
    }
  };

  const handleToggleVisibility = async (item) => {
    try {
      const updated = await api.toggleSkillVisibility(item._id);
      notify(
        updated.hidden ? `"${item.category}" hidden from live website.` : `"${item.category}" is now visible on live website.`,
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
            {editingId ? 'Edit Skill Category' : 'Add Skill Category'}
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

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-4">
            <label className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-dark-heading mb-1">
              Category Name *
            </label>
            <input
              type="text"
              required
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              placeholder="e.g. Frontend"
              className="w-full px-3.5 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 text-sm text-light-heading dark:text-dark-heading focus:outline-none focus:border-light-accent"
            />
          </div>

          <div className="md:col-span-6">
            <label className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-dark-heading mb-1">
              Skills (comma-separated) *
            </label>
            <input
              type="text"
              required
              value={form.skills}
              onChange={(e) => setForm({ ...form, skills: e.target.value })}
              placeholder="HTML, CSS, JS, React"
              className="w-full px-3.5 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 text-sm text-light-heading dark:text-dark-heading focus:outline-none focus:border-light-accent"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-dark-heading mb-1">
              Order
            </label>
            <input
              type="number"
              value={form.order}
              onChange={(e) => setForm({ ...form, order: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 text-sm text-light-heading dark:text-dark-heading focus:outline-none focus:border-light-accent"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FF2E63] to-[#FF5E2B] text-white text-sm font-bold shadow-[0_0_16px_rgba(255,46,99,0.35)] hover:shadow-[0_0_24px_rgba(255,46,99,0.55)] disabled:opacity-60 flex items-center gap-2"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            {editingId ? 'Save Changes' : 'Save Skill Group'}
          </button>
        </div>
      </form>

      {/* List */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-light-body dark:text-dark-body">
          Skill Categories ({items.length})
        </h3>
        {items.length === 0 ? (
          <p className="text-sm text-light-body dark:text-dark-body p-6 rounded-2xl border border-dashed border-light-border dark:border-dark-border text-center">
            No skills in MongoDB yet.
          </p>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item._id}
                className={`p-4 rounded-2xl bg-light-bg dark:bg-dark-card border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
                  item.hidden
                    ? 'border-dashed border-amber-500/40 opacity-65'
                    : 'border-light-border dark:border-dark-border'
                }`}
              >
                <div className="flex items-start sm:items-center gap-3 flex-wrap">
                  <div className="inline-flex items-center gap-2 font-bold text-sm text-light-heading dark:text-dark-heading min-w-[120px]">
                    <Layers className="w-4 h-4 text-light-accent dark:text-dark-accent" />
                    {item.category}:
                    {item.hidden && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-500 border border-amber-500/30">
                        Hidden
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(item.skills || []).map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-500/25"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => handleToggleVisibility(item)}
                    className={`p-1.5 rounded-lg border transition-colors ${
                      item.hidden
                        ? 'border-amber-500/40 bg-amber-500/15 text-amber-500 hover:bg-amber-500/25'
                        : 'border-light-border dark:border-dark-border text-cyan-600 dark:text-cyan-400 hover:border-cyan-400'
                    }`}
                    title={item.hidden ? 'Show on website' : 'Hide from website'}
                  >
                    {item.hidden ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleEdit(item)}
                    className="p-1.5 rounded-lg border border-light-border dark:border-dark-border hover:border-light-accent text-light-heading dark:text-dark-heading"
                    title="Edit"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item._id)}
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
