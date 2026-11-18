import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Loader2, X, Trophy, Info, Eye, EyeOff } from 'lucide-react';
import { api } from '../../services/api';

const emptyForm = {
  title: '',
  metric: '',
  subtitle: '',
  category: 'Milestone',
  tag: 'Highlight',
  iconName: 'Award',
  description: '',
};

const iconOptions = ['Award', 'GraduationCap', 'Briefcase', 'Code2', 'Terminal'];

export const AchievementsManager = ({ items, onRefresh, notify }) => {
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleEdit = (item) => {
    setEditingId(item._id);
    setForm({
      title: item.title || '',
      metric: item.metric || '',
      subtitle: item.subtitle || '',
      category: item.category || 'Milestone',
      tag: item.tag || 'Highlight',
      iconName: item.iconName || 'Award',
      description: item.description || '',
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
        await api.updateAchievement(editingId, form);
        notify('Achievement updated!', 'success');
      } else {
        await api.createAchievement(form);
        notify('Achievement added! The Key Achievements section is now live on your portfolio.', 'success');
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
    if (!window.confirm('Delete this achievement permanently?')) return;
    try {
      await api.deleteAchievement(id);
      notify('Achievement deleted.', 'success');
      if (editingId === id) resetForm();
      await onRefresh();
    } catch (err) {
      notify(err.message, 'error');
    }
  };

  const handleToggleVisibility = async (item) => {
    try {
      const updated = await api.toggleAchievementVisibility(item._id);
      notify(
        updated.hidden ? `"${item.title}" hidden from live website.` : `"${item.title}" is now visible on live website.`,
        'success'
      );
      await onRefresh();
    } catch (err) {
      notify(err.message, 'error');
    }
  };

  return (
    <div className="space-y-8">
      {/* Visibility Notice */}
      <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 text-xs sm:text-sm flex items-start gap-3">
        <Info className="w-5 h-5 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Smart Auto-Show Section</p>
          <p className="mt-0.5 opacity-90">
            When no achievements are saved here ({items.length} currently), the Key Achievements section stays hidden on your portfolio webpage. Adding any achievement below automatically reveals the section live!
          </p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="p-6 rounded-2xl bg-light-bg dark:bg-dark-card border border-light-border dark:border-dark-border shadow-sm space-y-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-light-heading dark:text-white flex items-center gap-2">
            <Plus className="w-5 h-5 text-[#FF2E63]" />
            {editingId ? 'Edit Achievement' : 'Add New Achievement'}
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
            <label className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-white mb-1">
              Title *
            </label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Java NPTEL Top Score"
              className="w-full px-3.5 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 text-sm text-light-heading dark:text-white focus:outline-none focus:border-[#FF2E63]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-white mb-1">
              Highlight Metric *
            </label>
            <input
              type="text"
              required
              value={form.metric}
              onChange={(e) => setForm({ ...form, metric: e.target.value })}
              placeholder="e.g. 95% Score / 1st Place"
              className="w-full px-3.5 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 text-sm text-light-heading dark:text-white focus:outline-none focus:border-[#FF2E63]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-white mb-1">
              Subtitle
            </label>
            <input
              type="text"
              value={form.subtitle}
              onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
              placeholder="e.g. Elite + Gold Medalist"
              className="w-full px-3.5 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 text-sm text-light-heading dark:text-white focus:outline-none focus:border-[#FF2E63]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-white mb-1">
                Tag
              </label>
              <input
                type="text"
                value={form.tag}
                onChange={(e) => setForm({ ...form, tag: e.target.value })}
                placeholder="National Recognition"
                className="w-full px-3.5 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 text-sm text-light-heading dark:text-white focus:outline-none focus:border-[#FF2E63]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-white mb-1">
                Icon
              </label>
              <select
                value={form.iconName}
                onChange={(e) => setForm({ ...form, iconName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 text-sm text-light-heading dark:text-white focus:outline-none focus:border-[#FF2E63]"
              >
                {iconOptions.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-white mb-1">
            Description *
          </label>
          <textarea
            rows={2}
            required
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Describe this achievement..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 text-sm text-light-heading dark:text-white focus:outline-none focus:border-[#FF2E63]"
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FF2E63] to-[#FF5E2B] text-white text-sm font-bold shadow-[0_0_16px_rgba(255,46,99,0.35)] hover:shadow-[0_0_24px_rgba(255,46,99,0.55)] disabled:opacity-60 flex items-center gap-2"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            {editingId ? 'Save Changes' : 'Add Achievement'}
          </button>
        </div>
      </form>

      {/* Existing List */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-light-body dark:text-dark-body">
          Saved Achievements ({items.length})
        </h3>
        {items.length === 0 ? (
          <p className="text-sm text-light-body dark:text-dark-body p-6 rounded-2xl border border-dashed border-light-border dark:border-dark-border text-center">
            No achievements added yet. The Achievements section is currently hidden on the live portfolio.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item) => (
              <div
                key={item._id}
                className={`p-4 rounded-2xl bg-light-bg dark:bg-dark-card border flex items-start justify-between gap-3 transition-all ${
                  item.hidden
                    ? 'border-dashed border-amber-500/40 opacity-65'
                    : 'border-light-border dark:border-dark-border'
                }`}
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/15 text-amber-500 dark:text-amber-400 flex items-center justify-center shrink-0">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-extrabold text-amber-500 dark:text-amber-400">
                        {item.metric}
                      </p>
                      {item.hidden && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-500 border border-amber-500/30">
                          Hidden
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-sm text-light-heading dark:text-white truncate">
                      {item.title}
                    </h4>
                    <p className="text-xs text-light-body dark:text-dark-body line-clamp-2 mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
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
                    className="p-1.5 rounded-lg border border-light-border dark:border-dark-border hover:border-[#FF2E63] text-light-heading dark:text-white"
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
