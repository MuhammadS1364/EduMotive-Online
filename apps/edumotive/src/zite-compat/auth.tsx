import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@project/components/ui/dialog';
import { Button } from '@project/components/ui/button';
import { Input } from '@project/components/ui/input';
import { Label } from '@project/components/ui/label';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

const STORAGE_KEY = 'edumotive_auth_user';
const listeners = new Set<() => void>();
const modalListeners = new Set<(open: boolean) => void>();

function readStoredUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

function writeStoredUser(user: AuthUser | null) {
  try {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore storage failures
  }
  for (const fn of listeners) fn();
}

export function getAuthHeaders(): Record<string, string> {
  const u = typeof window !== 'undefined' ? readStoredUser() : null;
  if (!u) return {};
  return {
    'x-auth-user': JSON.stringify(u),
  };
}

export function loginWithRedirect() {
  for (const fn of modalListeners) fn(true);
}

export function logout() {
  writeStoredUser(null);
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(() => readStoredUser());
  useEffect(() => {
    const sync = () => setUser(readStoredUser());
    listeners.add(sync);
    return () => {
      listeners.delete(sync);
    };
  }, []);
  return { user, isLoading: false };
}

export function AuthModal() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    modalListeners.add(setOpen);
    return () => {
      modalListeners.delete(setOpen);
    };
  }, []);

  const signInAs = (u: AuthUser) => {
    writeStoredUser(u);
    setOpen(false);
    setName('');
    setEmail('');
  };

  const submitCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    const id = 'user_' + email.trim().toLowerCase().replace(/[^a-z0-9]/g, '_');
    signInAs({ id, email: email.trim(), name: name.trim() });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="glass-strong max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Sign in to EduMotive</DialogTitle>
          <DialogDescription>
            Sign in as a student or author to write articles, track subscriptions, and manage your profile.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Button
              type="button"
              variant="default"
              onClick={() =>
                signInAs({
                  id: 'user_student_demo',
                  email: 'amina@edumotive.in',
                  name: 'Amina Student',
                })
              }
            >
              Demo Student
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                signInAs({
                  id: 'user_author_demo',
                  email: 'shafee@edumotive.in',
                  name: 'Muhammad Shafee',
                })
              }
            >
              Demo Author
            </Button>
          </div>
          <div className="relative text-center text-xs uppercase tracking-wider text-muted-foreground">
            <span className="bg-popover px-2">or sign in with your details</span>
          </div>
          <form onSubmit={submitCustom} className="space-y-3">
            <div>
              <Label htmlFor="auth-name">Full name</Label>
              <Input
                id="auth-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <Label htmlFor="auth-email">Email</Label>
              <Input
                id="auth-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@campus.edu"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={!name.trim() || !email.trim()}>
              Continue
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
