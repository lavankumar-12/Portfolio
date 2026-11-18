import React from 'react';
import { Mail, Trash2, CheckCircle2, Clock } from 'lucide-react';
import { api } from '../../services/api';

export const MessagesManager = ({ items, onRefresh, notify }) => {
  const handleMarkRead = async (id) => {
    try {
      await api.markMessageRead(id);
      await onRefresh();
    } catch (err) {
      notify(err.message, 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await api.deleteMessage(id);
      notify('Message deleted.', 'success');
      await onRefresh();
    } catch (err) {
      notify(err.message, 'error');
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-light-heading dark:text-dark-heading flex items-center gap-2">
        <Mail className="w-5 h-5 text-light-accent dark:text-dark-accent" />
        Contact Messages ({items.length})
      </h2>

      {items.length === 0 ? (
        <p className="text-sm text-light-body dark:text-dark-body p-8 rounded-2xl border border-dashed border-light-border dark:border-dark-border text-center">
          No messages received yet. Submissions from the Contact form will appear here.
        </p>
      ) : (
        <div className="space-y-3">
          {items.map((msg) => (
            <div
              key={msg._id}
              className={`p-5 rounded-2xl border transition-all ${
                msg.read
                  ? 'bg-light-bg dark:bg-dark-card border-light-border dark:border-dark-border'
                  : 'bg-[#FF2E63]/5 dark:bg-[#FF2E63]/10 border-[#FF2E63]/40'
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                <div>
                  <h4 className="font-bold text-sm text-light-heading dark:text-dark-heading">
                    {msg.subject}
                  </h4>
                  <p className="text-xs text-light-body dark:text-dark-body">
                    From <span className="font-semibold">{msg.name}</span> ({msg.email})
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-light-body dark:text-dark-body flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                  {!msg.read && (
                    <button
                      onClick={() => handleMarkRead(msg._id)}
                      className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-1 hover:bg-emerald-500/20"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Mark Read
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(msg._id)}
                    className="p-1.5 rounded-lg border border-rose-500/30 text-rose-500 hover:bg-rose-500/10"
                    title="Delete message"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-light-body dark:text-dark-body leading-relaxed whitespace-pre-wrap">
                {msg.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
