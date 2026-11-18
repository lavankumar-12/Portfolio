import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Github, ExternalLink, Loader2, X, Eye, EyeOff } from 'lucide-react';
import { api } from '../../services/api';
import { ImageUploadField } from './ImageUploadField';

const emptyForm = {
  title: '',
  subtitle: '',
  category: 'Full Stack Development',
  shortDescription: '',
  fullDescription: '',
  technologies: '',
  keyFeatures: '',
  architecture: '',
  image: '',
  githubUrl: '',
  liveDemoUrl: '',
};

export const ProjectsManager = ({ items, onRefresh, notify }) => {
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleEdit = (project) => {
    setEditingId(project._id);
    setForm({
      title: project.title || '',
      subtitle: project.subtitle || '',
      category: project.category || 'Full Stack Development',
      shortDescription: project.shortDescription || '',
      fullDescription: project.fullDescription || '',
      technologies: (project.technologies || []).join(', '),
      keyFeatures: (project.keyFeatures || []).join('\n'),
      architecture: project.architecture || '',
      image: project.image || '',
      githubUrl: project.githubUrl || '',
      liveDemoUrl: project.liveDemoUrl || '',
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
        await api.updateProject(editingId, form);
        notify('Project updated successfully!', 'success');
      } else {
        await api.createProject(form);
        notify('Project uploaded to MongoDB Atlas!', 'success');
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
    if (!window.confirm('Delete this project permanently?')) return;
    try {
      await api.deleteProject(id);
      notify('Project deleted.', 'success');
      if (editingId === id) resetForm();
      await onRefresh();
    } catch (err) {
      notify(err.message, 'error');
    }
  };

  const handleToggleVisibility = async (proj) => {
    try {
      const updated = await api.toggleProjectVisibility(proj._id);
      notify(
        updated.hidden ? `"${proj.title}" hidden from live website.` : `"${proj.title}" is now visible on live website.`,
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
        className="p-6 rounded-2xl bg-light-bg dark:bg-dark-card border border-light-border dark:border-dark-border shadow-sm space-y-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-light-heading dark:text-dark-heading flex items-center gap-2">
            <Plus className="w-5 h-5 text-light-accent dark:text-dark-accent" />
            {editingId ? 'Edit Project' : 'Upload New Project'}
          </h2>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="text-xs font-semibold text-light-body hover:text-light-heading dark:text-dark-body flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" /> Cancel Edit
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-dark-heading mb-1">
              Project Title *
            </label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Expense Tracker"
              className="w-full px-3.5 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 text-sm text-light-heading dark:text-dark-heading focus:outline-none focus:border-light-accent"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-dark-heading mb-1">
              Category
            </label>
            <input
              type="text"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              placeholder="e.g. MERN Stack, Full Stack Development, Python Tooling"
              className="w-full px-3.5 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 text-sm text-light-heading dark:text-dark-heading focus:outline-none focus:border-light-accent"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-dark-heading mb-1">
              Subtitle
            </label>
            <input
              type="text"
              value={form.subtitle}
              onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
              placeholder="e.g. MERN Stack Personal Finance App"
              className="w-full px-3.5 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 text-sm text-light-heading dark:text-dark-heading focus:outline-none focus:border-light-accent"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-dark-heading mb-1">
              Technologies (comma-separated) *
            </label>
            <input
              type="text"
              required
              value={form.technologies}
              onChange={(e) => setForm({ ...form, technologies: e.target.value })}
              placeholder="React, Node, Express, MongoDB"
              className="w-full px-3.5 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 text-sm text-light-heading dark:text-dark-heading focus:outline-none focus:border-light-accent"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-dark-heading mb-1">
              GitHub Repository URL
            </label>
            <input
              type="url"
              value={form.githubUrl}
              onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
              placeholder="https://github.com/lavan-kumar/repo"
              className="w-full px-3.5 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 text-sm text-light-heading dark:text-dark-heading focus:outline-none focus:border-light-accent"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-dark-heading mb-1">
              Live Demo URL <span className="normal-case font-normal text-light-body dark:text-dark-body">(optional)</span>
            </label>
            <input
              type="url"
              value={form.liveDemoUrl}
              onChange={(e) => setForm({ ...form, liveDemoUrl: e.target.value })}
              placeholder="Leave empty to hide Live Demo button"
              className="w-full px-3.5 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 text-sm text-light-heading dark:text-dark-heading focus:outline-none focus:border-light-accent"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-dark-heading mb-1">
            Short Description (shown on card) *
          </label>
          <textarea
            rows={2}
            required
            value={form.shortDescription}
            onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
            placeholder="Concise 1-2 sentence overview of the project..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 text-sm text-light-heading dark:text-dark-heading focus:outline-none focus:border-light-accent"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-dark-heading mb-1">
              Full Description (shown in View Details modal)
            </label>
            <textarea
              rows={3}
              value={form.fullDescription}
              onChange={(e) => setForm({ ...form, fullDescription: e.target.value })}
              placeholder="Detailed description of architecture and goals..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 text-sm text-light-heading dark:text-dark-heading focus:outline-none focus:border-light-accent"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-light-heading dark:text-dark-heading mb-1">
              Key Features (one per line)
            </label>
            <textarea
              rows={3}
              value={form.keyFeatures}
              onChange={(e) => setForm({ ...form, keyFeatures: e.target.value })}
              placeholder={"JWT authentication\nReal-time updates\nResponsive dashboard"}
              className="w-full px-3.5 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary/60 text-sm text-light-heading dark:text-dark-heading focus:outline-none focus:border-light-accent"
            />
          </div>
        </div>

        <ImageUploadField
          label="Project Screenshot / Cover Image"
          value={form.image}
          onChange={(url) => setForm({ ...form, image: url })}
        />

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FF2E63] to-[#FF5E2B] text-white text-sm font-bold shadow-[0_0_16px_rgba(255,46,99,0.35)] hover:shadow-[0_0_24px_rgba(255,46,99,0.55)] disabled:opacity-60 flex items-center gap-2"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            {editingId ? 'Save Changes' : 'Upload Project'}
          </button>
        </div>
      </form>

      {/* Existing Projects List */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-light-body dark:text-dark-body">
          Uploaded Projects ({items.length})
        </h3>
        {items.length === 0 ? (
          <p className="text-sm text-light-body dark:text-dark-body p-6 rounded-2xl border border-dashed border-light-border dark:border-dark-border text-center">
            No projects in MongoDB yet. Use the form above or click "Seed Default Data".
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((proj) => (
              <div
                key={proj._id}
                className={`p-4 rounded-2xl bg-light-bg dark:bg-dark-card border flex flex-col justify-between gap-3 transition-all ${
                  proj.hidden
                    ? 'border-dashed border-amber-500/40 opacity-65'
                    : 'border-light-border dark:border-dark-border'
                }`}
              >
                <div className="flex gap-3">
                  {proj.image && (
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-20 h-16 rounded-lg object-cover border border-light-border dark:border-dark-border shrink-0"
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-light-accent dark:text-dark-accent">
                        {proj.category}
                      </span>
                      {proj.hidden && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-500 border border-amber-500/30">
                          Hidden
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-light-heading dark:text-dark-heading truncate">
                      {proj.title}
                    </h4>
                    <p className="text-xs text-light-body dark:text-dark-body line-clamp-2">
                      {proj.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-light-border dark:border-dark-border">
                  <div className="flex items-center gap-2 text-xs text-light-body dark:text-dark-body">
                    {proj.githubUrl && (
                      <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="hover:text-light-accent">
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {proj.liveDemoUrl && (
                      <a href={proj.liveDemoUrl} target="_blank" rel="noreferrer" className="hover:text-light-accent">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    <span>{(proj.technologies || []).length} techs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleToggleVisibility(proj)}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        proj.hidden
                          ? 'border-amber-500/40 bg-amber-500/15 text-amber-500 hover:bg-amber-500/25'
                          : 'border-light-border dark:border-dark-border text-cyan-600 dark:text-cyan-400 hover:border-cyan-400'
                      }`}
                      title={proj.hidden ? 'Show on website' : 'Hide from website'}
                    >
                      {proj.hidden ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleEdit(proj)}
                      className="p-1.5 rounded-lg border border-light-border dark:border-dark-border hover:border-light-accent text-light-heading dark:text-dark-heading"
                      title="Edit"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(proj._id)}
                      className="p-1.5 rounded-lg border border-rose-500/30 text-rose-500 hover:bg-rose-500/10"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
