import { useEffect, useState } from 'react';
import type { Contenu, ContenuInput, Statut } from '../types/contenu';
import { MOCK_CONTENUS } from '../data/mockContenus';

const STORAGE_KEY = 'doztra-social:contenus:v1';

function loadInitialContenus(): Contenu[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return MOCK_CONTENUS;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return MOCK_CONTENUS;
    return parsed as Contenu[];
  } catch {
    return MOCK_CONTENUS;
  }
}

export interface UseContenusResult {
  contenus: Contenu[];
  upsertContenu: (input: ContenuInput, id?: string) => void;
  removeContenu: (id: string) => void;
  setStatut: (id: string, statut: Statut) => void;
}

export function useContenus(): UseContenusResult {
  const [contenus, setContenus] = useState<Contenu[]>(loadInitialContenus);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(contenus));
    } catch {
      // Quota dépassé ou localStorage indisponible : l'état en mémoire reste
      // la source de vérité pour la session en cours.
    }
  }, [contenus]);

  function upsertContenu(input: ContenuInput, id?: string) {
    if (id === undefined) {
      if (!input.sujet.trim()) return;
      const now = new Date().toISOString();
      const nouveau: Contenu = {
        id: crypto.randomUUID(),
        sujet: input.sujet.trim(),
        publicCible: input.publicCible?.trim() || undefined,
        reseauSocial: input.reseauSocial,
        datePublicationPrevue: input.datePublicationPrevue || undefined,
        statut: 'Brouillon',
        dateCreation: now,
        dateModification: now,
      };
      setContenus((current) => [...current, nouveau]);
      return;
    }

    setContenus((current) =>
      current.map((contenu) =>
        contenu.id !== id
          ? contenu
          : {
              ...contenu,
              sujet: input.sujet.trim(),
              publicCible: input.publicCible?.trim() || undefined,
              reseauSocial: input.reseauSocial,
              datePublicationPrevue: input.datePublicationPrevue || undefined,
              dateModification: new Date().toISOString(),
            },
      ),
    );
  }

  function removeContenu(id: string) {
    setContenus((current) => current.filter((contenu) => contenu.id !== id));
  }

  function setStatut(id: string, statut: Statut) {
    setContenus((current) =>
      current.map((contenu) =>
        contenu.id !== id ? contenu : { ...contenu, statut, dateModification: new Date().toISOString() },
      ),
    );
  }

  return { contenus, upsertContenu, removeContenu, setStatut };
}
