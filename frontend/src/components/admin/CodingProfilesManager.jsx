import React, { useState } from 'react';
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  X,
  Eye,
  EyeOff,
  ExternalLink,
  Github,
  Code2,
  Award,
  Flame,
  Terminal,
} from 'lucide-react';
import { api } from '../../services/api';

const iconMap = {
  Github,
  Code2,
  Award,
  Flame,
  Terminal,
};

const platformPresets = [
  {
    platform: 'GitHub',
    icon: 'Github',
    color: '#FF2E63',
    tagline: 'Open Source Repositories & Full Stack Codebases',
    focus: 'React.js, Node.js, Full Stack Projects',
  },
  {
    platform: 'LeetCode',
    icon: 'Code2',
    color: '#FFA116',
    tagline: 'Data Structures & Algorithmic Challenges',
    focus: 'Arrays, Strings, Trees, Dynamic Programming',
  },
  {
    platform: 'HackerRank',
    icon: 'Award',
    color: '#2EC866',
    tagline: 'Problem Solving & Core Language Foundations',
    focus: 'Java, Python, SQL, Problem Solving',
  },
  {
    platform: 'CodeChef',
    icon: 'Flame',
    color: '#FF5E2B',
    tagline: 'Competitive Programming & Timed Contests',
    focus: 'Contest Practice, Mathematical Logic',
  },
  {
    platform: 'GeeksforGeeks',
    icon: 'Terminal',
    color: '#2F8D46',
    tagline: 'DSA Practice & Coding Articles',
    focus: 'DSA, Java, Python, Interview Prep',
  },
  {
    platform: 'Codeforces',
    icon: 'Flame',
    color: '#22D3EE',
    tagline: 'Competitive Programming Contests',
    focus: 'Algorithms, Math, Speed Coding',
  },
];

const emptyForm = {
  platform: '',
  handle: '',
  url: '',
  tagline: '',
  description: '',
  icon: 'Code2',
  color: '#FF2E63',
  focus: '',
  order: 0,
};

export const CodingProfilesManager = ({ items, onRefresh, notify }) => {
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const applyPreset = (preset) => {
    setForm((prev) => ({
      ...prev,
      platform: preset.platform,
      icon: preset.icon,
      color: preset.color,
      tagline: preset.tagline,
      focus: preset.focus,
    }));
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setForm({
      platform: item.platform || '',
      handle: item.handle || '',
      url: item.url || '',
      tagline: item.tagline || '',
      description: item.description || '',
      icon: item.icon || 'Code2',
      color: item.color || '#FF2E63',
      focus: (item.focus || []).join(', '),
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
        await api.updateCodingProfile(editingId, form);
        notify('Coding profile updated!', 'success');
      } else {
        await api.createCodingProfile(form);
        notify('Coding profile added to MongoDB Atlas!', 'success');
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
    if (!window.confirm('Delete this coding profile permanently?')) return;
    try {
      await api.deleteCodingProfile(id);
      notify('Coding profile deleted.', 'success');
      if (editingId === id) resetForm();
      await onRefresh();
    } catch (err) {
      notify(err.message, 'error');
    }
  };

  const handleToggleVisibility = async (item) => {
    try {
      const updated = await api.toggleCodingProfileVisibility(item._id);
      notify(
        updated.hidden
          ? `"${item.platform}" hidden from live website.`
          : `"${item.platform}" is now visible on live website.`,
        'success'
      );
      await onRefresh();
    } catch (err) {
      notify(err.message, 'error');
    }
  };

  return (
    <div className="space-y-8">
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="p-6 rounded-2xl bg-light-bg dark:bg-dark-card border border-light-border dark:border-dark-border shadow-sm space-y-5"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-light-heading dark:text-white flex items-center gap-2">
            <Plus className="w-5 h-5 text-[#FF2E63]" />
            {editingId ? 'Edit Coding Profile' : 'Add Coding Profile'}
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

        {/* Quick Platform Presets */}
        {!editingId && (
          <div className="space-y-1.5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-light-body dark:text-dark-body">
              Quick Presets (click to auto-fill)
            </p>
            <div className="flex flex-wrap gap-2">
              {platformPresets.map((preset) => (
                <button
                  key={preset.platform}
                  type="button"
                  onClick={() => applyPreset(preset)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-light-border dark:border-white/10 bg-light-secondary dark:bg-[#161824] text-light-heading dark:text-slate-200 hover:border-cyan-400 hover:text-cyan-500 transition-colors flex items-center gap-1.5"
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: preset.color }}
                  />
                  {preset.platform}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-white mb-1">
              Platform Name *
            </label>
            <input
              type="text"
              required
              value={form.platform}
              onChange={(e) => setForm({ ...form, platform: e.target.value })}
              placeholder="e.g. LeetCode, GitHub, CodeChef"
              className="w-full px-3.5 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 text-sm text-light-heading dark:text-white focus:outline-none focus:border-[#FF2E63]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-white mb-1">
              Username / Handle
            </label>
            <input
              type="text"
              value={form.handle}
              onChange={(e) => setForm({ ...form, handle: e.target.value })}
              placeholder="e.g. lavan-kumar"
              className="w-full px-3.5 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 text-sm text-light-heading dark:text-white focus:outline-none focus:border-[#FF2E63]"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-white mb-1">
              Profile URL *
            </label>
            <input
              type="url"
              required
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
              placeholder="https://leetcode.com/u/your-username"
              className="w-full px-3.5 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 text-sm text-light-heading dark:text-white focus:outline-none focus:border-[#FF2E63]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-white mb-1">
              Tagline
            </label>
            <input
              type="text"
              value={form.tagline}
              onChange={(e) => setForm({ ...form, tagline: e.target.value })}
              placeholder="e.g. Data Structures & Algorithmic Challenges"
              className="w-full px-3.5 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 text-sm text-light-heading dark:text-white focus:outline-none focus:border-[#FF2E63]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-white mb-1">
              Focus Tags (comma-separated)
            </label>
            <input
              type="text"
              value={form.focus}
              onChange={(e) => setForm({ ...form, focus: e.target.value })}
              placeholder="Arrays, Strings, Trees, DP"
              className="w-full px-3.5 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 text-sm text-light-heading dark:text-white focus:outline-none focus:border-[#FF2E63]"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-1">
              <label className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-white mb-1">
                Icon
              </label>
              <select
                value={form.icon}
                onChange={(e) => setForm({ ...form, icon: e.target.value })}
                className="w-full px-2.5 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 text-sm text-light-heading dark:text-white focus:outline-none focus:border-[#FF2E63]"
              >
                {Object.keys(iconMap).map((ic) => (
                  <option key={ic} value={ic}>
                    {ic}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-1">
              <label className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-white mb-1">
                Color
              </label>
              <input
                type="color"
                value={form.color}
                onChange={(e) => setForm({ ...form, color: e.target.value })}
                className="w-full h-[42px] p-1 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 cursor-pointer"
              />
            </div>

            <div className="col-span-1">
              <label className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-white mb-1">
                Order
              </label>
              <input
                type="number"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: e.target.value })}
                className="w-full px-2.5 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 text-sm text-light-heading dark:text-white focus:outline-none focus:border-[#FF2E63]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-white mb-1">
              Short Description
            </label>
            <input
              type="text"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Brief note about what you practice on this platform..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 text-sm text-light-heading dark:text-white focus:outline-none focus:border-[#FF2E63]"
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
            {editingId ? 'Save Changes' : 'Add Coding Profile'}
          </button>
        </div>
      </form>

      {/* Existing Profiles List */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-light-body dark:text-dark-body">
          Coding Profiles ({items.length})
        </h3>
        {items.length === 0 ? (
          <p className="text-sm text-light-body dark:text-dark-body p-6 rounded-2xl border border-dashed border-light-border dark:border-dark-border text-center">
            No coding profiles in MongoDB yet. Use a preset above or click &quot;Seed Default Data&quot;.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item) => {
              const IconComp = iconMap[item.icon] || Code2;
              return (
                <div
                  key={item._id}
                  className={`p-4 rounded-2xl bg-light-bg dark:bg-dark-card border flex items-start justify-between gap-3 transition-all ${
                    item.hidden
                      ? 'border-dashed border-amber-500/40 opacity-65'
                      : 'border-light-border dark:border-dark-border'
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm"
                      style={{ backgroundColor: item.color || '#FF2E63' }}
                    >
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-light-heading dark:text-white truncate">
                          {item.platform}
                        </h4>
                        {item.hidden && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-500 border border-amber-500/30 shrink-0">
                            Hidden
                          </span>
                        )}
                      </div>
                      {item.handle && (
                        <p className="text-xs font-mono text-light-body dark:text-dark-body truncate">
                          @{item.handle.replace(/^@/, '')}
                        </p>
                      )}
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-cyan-600 dark:text-cyan-400 hover:underline mt-0.5 truncate max-w-full"
                      >
                        <ExternalLink className="w-3 h-3 shrink-0" />
                        <span className="truncate">{item.url}</span>
                      </a>
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
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
