import { CommonLinkTypes, LinksIcons } from '../types/enums';
import { ProfessorHr } from '../types/HRProfessor.d';

function getLinkTypeByUrl(url: string): CommonLinkTypes | null {
  const linkType = Object.values(CommonLinkTypes).find(type => url.toLowerCase().includes(type.toLowerCase()));

  return linkType ? CommonLinkTypes[linkType.toUpperCase() as keyof typeof CommonLinkTypes] : null;
}

function createCommonLink(href: string, icon: JSX.Element) {
  return { href, icon };
}

export function getProfessorLinks(professor: ProfessorHr): { href: string; icon: JSX.Element }[] {
  const links = [];
  if (professor?.email) {
    links.push(
      createCommonLink(
        `mailto:${professor.email}`,
        <img src={LinksIcons.EMAIL} width={24} height={24} alt='Link para o e-mail' />,
      ),
    );
  }

  if (professor?.website) {
    links.push(
      createCommonLink(
        professor.website,
        <img src={LinksIcons.WEBSITE} width={24} height={24} alt='Link para o site pessoal' />,
      ),
    );
  }

  if (professor?.lattes) {
    links.push(
      createCommonLink(
        professor.lattes,
        <img src={LinksIcons.LATTES} width={24} height={24} alt='Link para o currículo lattes' />,
      ),
    );
  }

  professor.links.forEach(link => {
    const linkType = getLinkTypeByUrl(link);

    if (linkType) {
      links.push(
        createCommonLink(link, <img src={LinksIcons[linkType]} width={24} height={24} alt={`Link para ${linkType}`} />),
      );
    }
  });

  return links;
}
