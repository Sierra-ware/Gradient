import { useEffect, useMemo, useState } from 'react';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import type { Photo } from '../types';

export default function Home() {
  const { user } = useAuth();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [search, setSearch] = useState('');
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  function load() {
    api.get<Photo[]>('/photos').then((res) => setPhotos(res.data));
  }

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(
    () => photos.filter((p) => p.title.toLowerCase().includes(search.toLowerCase())),
    [photos, search]
  );

  async function onUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return setError('Выберите изображение.');
    setBusy(true);
    setError(null);
    try {
      const form = new FormData();
      form.append('title', title);
      form.append('image', file);
      await api.post('/photos', form, { headers: { 'Content-Type': 'multipart/form-data' } });
      setTitle('');
      setFile(null);
      load();
    } catch (err: any) {
      const errors = err?.response?.data?.errors;
      setError(errors ? Object.values(errors).flat().join(' ') : 'Не удалось загрузить фото.');
    } finally {
      setBusy(false);
    }
  }

  async function onDelete(id: number) {
    if (!confirm('Удалить это фото?')) return;
    await api.delete(`/photos/${id}`);
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  }

  const canDelete = (photo: Photo) => user && (user.role === 'admin' || user.id === photo.user.id);

  return (
    <>
      <Header search={search} onSearch={setSearch} />

      <section className="container">
        {user ? (
          <form className="upload-form" onSubmit={onUpload}>
            <input
              type="text"
              placeholder="Название фото"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} required />
            <button className="btn btn-dark" disabled={busy}>{busy ? 'Загружаем...' : 'Загрузить'}</button>
            {error && <p className="error-text">{error}</p>}
          </form>
        ) : (
          <p style={{ color: 'var(--color-muted)', margin: '16px 0' }}>Войдите, чтобы загружать фото.</p>
        )}

        <h2>Поиск по фото</h2>
        <div className="grid">
          {filtered.map((p) => (
            <div key={p.id} className="category-card">
              <img src={p.image_url} alt={p.title} loading="lazy" />
              <div className="label">{p.title}</div>
              <div className="photo-meta">
                <div className="author">{p.user.name} ({p.user.role})</div>
                {canDelete(p) && (
                  <button className="btn btn-ghost" style={{ marginTop: 8 }} onClick={() => onDelete(p.id)}>
                    Удалить
                  </button>
                )}
              </div>
            </div>
          ))}
          {filtered.length === 0 && <p style={{ color: 'var(--color-muted)' }}>Пока нет фото.</p>}
        </div>
      </section>
    </>
  );
}
