import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import type { Contenu, ReseauSocial } from '../../types/contenu';
import { RESEAUX_SOCIAUX } from '../../data/reseauxSociaux';
import { Button } from '../ui/Button';
import { TextInput } from '../ui/TextInput';
import { SelectInput } from '../ui/SelectInput';
import { DateInput } from '../ui/DateInput';

export interface ContentFormModalProps {
  isOpen: boolean;
  mode: 'create' | 'edit';
  initialContenu?: Contenu;
  onClose: () => void;
}

const DEFAULT_RESEAU: ReseauSocial = 'LinkedIn';

export function ContentFormModal({ isOpen, mode, initialContenu, onClose }: ContentFormModalProps) {
  const [sujet, setSujet] = useState(() => initialContenu?.sujet ?? '');
  const [reseauSocial, setReseauSocial] = useState<string>(() => initialContenu?.reseauSocial ?? DEFAULT_RESEAU);
  const [datePublicationPrevue, setDatePublicationPrevue] = useState(
    () => initialContenu?.datePublicationPrevue ?? '',
  );
  const [publicCible, setPublicCible] = useState(() => initialContenu?.publicCible ?? '');

  if (!isOpen) return null;

  const title = mode === 'create' ? 'Nouveau contenu' : 'Modifier le contenu';
  const submitLabel = mode === 'create' ? 'Créer le contenu' : 'Enregistrer les modifications';

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/45 p-6"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="flex w-full max-w-[480px] flex-col gap-[18px] rounded-2xl bg-surface p-8 shadow-modal"
        role="dialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold leading-[26px] text-ink">{title}</div>
          <FontAwesomeIcon
            icon={faCircleXmark}
            role="button"
            tabIndex={0}
            onClick={onClose}
            className="cursor-pointer text-xl text-ink-secondary"
          />
        </div>

        <TextInput id="sujet" label="Sujet" required value={sujet} onChange={setSujet} placeholder="Sujet du contenu…" />

        <SelectInput
          id="reseauSocial"
          label="Réseau social"
          value={reseauSocial}
          onChange={setReseauSocial}
          options={RESEAUX_SOCIAUX.map((reseau) => ({ value: reseau, label: reseau }))}
        />

        <DateInput
          id="datePublicationPrevue"
          label="Date de publication prévue"
          value={datePublicationPrevue}
          onChange={setDatePublicationPrevue}
        />

        <TextInput
          id="publicCible"
          label="Public cible"
          value={publicCible}
          onChange={setPublicCible}
          placeholder="Ex. Décideurs marketing B2B"
        />

        <div className="mt-2 flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>
            Annuler
          </Button>
          <Button variant="primary" onClick={onClose}>
            {submitLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
