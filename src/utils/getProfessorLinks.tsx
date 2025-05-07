import { CommonLinkTypes, LinksIcons } from '../types/enums';
import { ProfessorHr } from '../types/HRProfessor.d';

function getLinkTypeByUrl(url: string): CommonLinkTypes | null {
  const linkType = Object.values(CommonLinkTypes).find(type => url.toLowerCase().includes(type.toLowerCase()));

  return linkType ? CommonLinkTypes[linkType.toUpperCase() as keyof typeof CommonLinkTypes] : null;
}

export function getProfessorLinks(professor: ProfessorHr): { href: string; iconUrl: string; alt: string }[] {
  const links = [];
  if (professor?.email) {
    links.push({
      href: `mailto:${professor.email}`,
      iconUrl: LinksIcons.EMAIL,
      alt: 'e-mail',
    });
  }

  if (professor?.website) {
    links.push({
      iconUrl: LinksIcons.WEBSITE,
      href: professor.website,
      alt: 'Site pessoal',
    });
  }

  if (professor?.lattes) {
    links.push({
      iconUrl: LinksIcons.LATTES,
      href: professor.lattes,
      alt: 'Currículo Lattes',
    });
  }

  professor.links.forEach(link => {
    const linkType = getLinkTypeByUrl(link);

    if (linkType) {
      links.push({
        href: link,
        iconUrl: LinksIcons[linkType],
        alt: linkType,
      });
    }
  });

  return links;
}
