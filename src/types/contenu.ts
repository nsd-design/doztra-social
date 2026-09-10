export type Statut = 'Brouillon' | 'Validé' | 'Publié';

export type ReseauSocial = 'LinkedIn' | 'Instagram' | 'Facebook' | 'TikTok' | 'YouTube';

export interface Contenu {
  id: string;
  sujet: string;
  publicCible?: string;
  reseauSocial: ReseauSocial;
  datePublicationPrevue?: string;
  statut: Statut;
  dateCreation: string;
  dateModification: string;
}
