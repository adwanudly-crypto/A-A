import { useState } from 'react';
import { ArrowLeft, Copy, Laugh, RotateCw, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const JOKE_API = 'https://v2.jokeapi.dev/joke/Any?type=single,twopart&safe-mode';

export default function JokeGenerator() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  async function getJoke() {
    setLoading(true);
    setError('');
    setCopied(false);
    try {
      const response = await fetch(JOKE_API, { headers: { Accept: 'application/json' } });
      if (!response.ok) throw new Error('The joke service is unavailable right now.');
      const data = await response.json();
      if (data.error) throw new Error('We could not find a joke this time. Please try again.');
      setJoke({
        category: data.category || 'Surprise',
        text: data.type === 'twopart' ? `${data.setup}\n\n${data.delivery}` : data.joke,
      });
    } catch (requestError) {
      setError(requestError.message || 'Could not load a joke. Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  async function copyJoke() {
    if (!joke) return;
    try {
      await navigator.clipboard.writeText(joke.text);
      setCopied(true);
    } catch {
      setError('Copy is not available in this browser. You can select the joke text instead.');
    }
  }

  return (
    <main className="joke-page">
      <div className="joke-shell">
        <Link to="/" className="joke-back"><ArrowLeft size={16} /> Back to A-A Learning</Link>
        <section className="joke-card" aria-labelledby="joke-title">
          <div className="joke-icon"><Laugh size={31} /></div>
          <p className="joke-kicker"><Sparkles size={14} /> A LITTLE FUN BREAK</p>
          <h1 id="joke-title">Random Joke Generator</h1>
          <p className="joke-description">Need a giggle? Get a kid-friendly joke picked just for you.</p>

          <div className={`joke-result ${joke ? 'has-joke' : ''}`} aria-live="polite" aria-busy={loading}>
            {loading ? <p className="joke-placeholder">Finding a good one…</p> : joke ? <>
              <span className="joke-category">{joke.category}</span>
              <p className="joke-text">{joke.text}</p>
            </> : <p className="joke-placeholder">Your next giggle is one click away.</p>}
          </div>

          {error && <p className="joke-error" role="alert">{error}</p>}
          <div className="joke-actions">
            <button type="button" className="button primary" onClick={getJoke} disabled={loading}>
              <RotateCw size={17} className={loading ? 'joke-spin' : ''} />
              {loading ? 'Finding a joke…' : joke ? 'Tell me another' : 'Get a joke'}
            </button>
            {joke && <button type="button" className="joke-copy" onClick={copyJoke}>
              <Copy size={16} /> {copied ? 'Copied!' : 'Copy joke'}
            </button>}
          </div>
          <p className="joke-footnote">Jokes are fetched live from JokeAPI in safe mode. No API key needed.</p>
        </section>
      </div>
    </main>
  );
}
