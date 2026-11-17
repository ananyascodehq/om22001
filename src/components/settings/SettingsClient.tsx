"use client";

import React, { useState } from "react";
import { formatBytes } from "@/lib/documents";
import {
  Settings,
  BookOpen,
  Database,
  HardDrive,
  CheckCircle,
  Save,
  RefreshCw,
  FolderArchive,
  Layers,
  Sparkles,
} from "lucide-react";

interface UnitData {
  id: string;
  unitNumber: number;
  coNumber: string;
  title: string;
  description?: string | null;
  topics: string; // JSON string
}

interface SubjectData {
  id: string;
  code: string;
  name: string;
  regulation: string;
  departments: string;
  units: UnitData[];
}

interface StorageStats {
  totalDocuments: number;
  categoryCounts: { category: string; count: number; sizeBytes: number }[];
  physicalBytes: number;
}

interface SettingsClientProps {
  initialSubject: SubjectData;
  initialStats: StorageStats;
}

export function SettingsClient({ initialSubject, initialStats }: SettingsClientProps) {
  const [subject, setSubject] = useState<SubjectData>(initialSubject);
  const [stats] = useState<StorageStats>(initialStats);
  const [activeTab, setActiveTab] = useState<"syllabus" | "subject" | "storage">("syllabus");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Parse topics safely
  const parseTopics = (topicsStr: string): string[] => {
    try {
      const parsed = JSON.parse(topicsStr);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return topicsStr.split("\n").filter(Boolean);
    }
  };

  const handleSubjectChange = (field: keyof SubjectData, value: string) => {
    setSubject((prev) => ({ ...prev, [field]: value }));
  };

  const handleUnitTitleChange = (unitId: string, newTitle: string) => {
    setSubject((prev) => ({
      ...prev,
      units: prev.units.map((u) => (u.id === unitId ? { ...u, title: newTitle } : u)),
    }));
  };

  const handleUnitCoChange = (unitId: string, newCo: string) => {
    setSubject((prev) => ({
      ...prev,
      units: prev.units.map((u) => (u.id === unitId ? { ...u, coNumber: newCo } : u)),
    }));
  };

  const handleTopicAdd = (unitId: string, newTopic: string) => {
    if (!newTopic.trim()) return;
    setSubject((prev) => ({
      ...prev,
      units: prev.units.map((u) => {
        if (u.id !== unitId) return u;
        const current = parseTopics(u.topics);
        return { ...u, topics: JSON.stringify([...current, newTopic.trim()]) };
      }),
    }));
  };

  const handleTopicRemove = (unitId: string, topicIndex: number) => {
    setSubject((prev) => ({
      ...prev,
      units: prev.units.map((u) => {
        if (u.id !== unitId) return u;
        const current = parseTopics(u.topics);
        const filtered = current.filter((_, idx) => idx !== topicIndex);
        return { ...u, topics: JSON.stringify(filtered) };
      }),
    }));
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    setErrorMessage("");

    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subjectId: subject.id,
          subjectData: {
            code: subject.code,
            name: subject.name,
            regulation: subject.regulation,
            departments: subject.departments,
          },
          units: subject.units,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to save settings");
      }

      const updated = await res.json();
      if (updated.subject) {
        setSubject(updated.subject);
      }
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error && err.message ? err.message : "Failed to save changes");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400 mb-1">
            <Settings className="w-4 h-4" />
            <span>Repository Administration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Portal Settings & Syllabus Structure
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Manage course information, edit unit names and topics, and review repository storage metrics.
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-primary-600 hover:bg-primary-700 text-white shadow-md shadow-primary-500/20 disabled:opacity-50 transition-all cursor-pointer self-start sm:self-auto"
        >
          {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {isSaving ? "Saving Changes..." : "Save All Changes"}
        </button>
      </div>

      {/* Notifications */}
      {saveSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 flex items-center gap-2 text-sm font-medium animate-fadeIn">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <span>All changes and syllabus updates successfully saved to the database!</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 text-sm font-medium">
          {errorMessage}
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab("syllabus")}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all ${
            activeTab === "syllabus"
              ? "border-primary-500 text-primary-600 dark:text-primary-400"
              : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Units & Syllabus Structure</span>
        </button>

        <button
          onClick={() => setActiveTab("subject")}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all ${
            activeTab === "subject"
              ? "border-primary-500 text-primary-600 dark:text-primary-400"
              : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Subject Details</span>
        </button>

        <button
          onClick={() => setActiveTab("storage")}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all ${
            activeTab === "storage"
              ? "border-primary-500 text-primary-600 dark:text-primary-400"
              : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Storage & Status</span>
        </button>
      </div>

      {/* Tab: Units & Syllabus Structure */}
      {activeTab === "syllabus" && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800 text-sky-900 dark:text-sky-200 text-sm flex items-start gap-3">
            <Sparkles className="w-5 h-5 flex-shrink-0 text-sky-500 mt-0.5" />
            <div>
              <p className="font-semibold">Curriculum Customization</p>
              <p className="text-xs text-sky-800/80 dark:text-sky-300/80 mt-0.5">
                The smart document classifier uses these unit titles and topic keywords to accurately categorize uploaded files and question items.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {subject.units.map((unit) => {
              const topics = parseTopics(unit.topics);
              return (
                <div
                  key={unit.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-primary-100 text-primary-800 dark:bg-primary-950/60 dark:text-primary-300">
                        Unit {unit.unitNumber}
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono">
                        {unit.coNumber}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <label className="text-xs font-medium text-slate-500">CO:</label>
                      <input
                        type="text"
                        value={unit.coNumber}
                        onChange={(e) => handleUnitCoChange(unit.id, e.target.value)}
                        className="w-20 px-2 py-1 text-xs rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Unit Name / Title
                    </label>
                    <input
                      type="text"
                      value={unit.title}
                      onChange={(e) => handleUnitTitleChange(unit.id, e.target.value)}
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-primary-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
                      Syllabus Topics ({topics.length})
                    </label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {topics.map((topic, tIdx) => (
                        <span
                          key={tIdx}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                        >
                          <span>{topic}</span>
                          <button
                            type="button"
                            onClick={() => handleTopicRemove(unit.id, tIdx)}
                            className="text-slate-400 hover:text-red-500 transition-colors"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Add new topic and press Add..."
                        id={`new-topic-${unit.id}`}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleTopicAdd(unit.id, (e.target as HTMLInputElement).value);
                            (e.target as HTMLInputElement).value = "";
                          }
                        }}
                        className="flex-1 max-w-md px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const el = document.getElementById(`new-topic-${unit.id}`) as HTMLInputElement;
                          if (el) {
                            handleTopicAdd(unit.id, el.value);
                            el.value = "";
                          }
                        }}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 transition-colors"
                      >
                        Add Topic
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab: Subject Details */}
      {activeTab === "subject" && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Subject Information & Metadata
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Subject Code
              </label>
              <input
                type="text"
                value={subject.code}
                onChange={(e) => handleSubjectChange("code", e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Regulation
              </label>
              <input
                type="text"
                value={subject.regulation}
                onChange={(e) => handleSubjectChange("regulation", e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Subject Name
              </label>
              <input
                type="text"
                value={subject.name}
                onChange={(e) => handleSubjectChange("name", e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white font-medium"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Eligible Departments / Branches
              </label>
              <input
                type="text"
                value={subject.departments}
                onChange={(e) => handleSubjectChange("departments", e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab: Storage & Status */}
      {activeTab === "storage" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 rounded-xl bg-primary-100 text-primary-700 dark:bg-primary-950/60 dark:text-primary-300">
                  <FolderArchive className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold uppercase text-slate-500">Total Documents</span>
              </div>
              <p className="text-3xl font-extrabold text-slate-900 dark:text-white">
                {stats.totalDocuments}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                  <HardDrive className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold uppercase text-slate-500">Storage Used</span>
              </div>
              <p className="text-3xl font-extrabold text-slate-900 dark:text-white">
                {formatBytes(stats.physicalBytes)}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 rounded-xl bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                  <Database className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold uppercase text-slate-500">Database Engine</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-base font-bold text-slate-900 dark:text-white">SQLite (dev.db)</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Category File Breakdown
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {stats.categoryCounts.map((cat) => (
                <div
                  key={cat.category}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700"
                >
                  <p className="text-xs font-bold text-slate-500 uppercase">{cat.category}</p>
                  <p className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                    {cat.count} files
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">{formatBytes(cat.sizeBytes)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

